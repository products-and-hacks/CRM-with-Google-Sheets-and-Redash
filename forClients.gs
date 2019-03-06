//Logic to block rows 

function forClients (clientsSpreadsheet,group-client-batch, emailStatus){
  var clients = startupSpreadsheet.getSheetByName("[CLIENTS SHEET]");
  var clientsLastRow = clients.getLastRow();
  var clientsLastColumn = clients.getLastColumn();
  var countRowsInserted = 0;
  var start = new Date();
  var allValues = "";
  
  //connect to DB
  var conn = Jdbc.getConnection('jdbc:sqlserver://[YOUR SERVER].database.windows.net:1433',
                                   {user: '[USER]@[SERVER]', password: '[YOUR PASSWORD]', databaseName: '[DATABASE NAME]'});
  var stmt = conn.createStatement();
  stmt.setMaxRows(10000);
 
  //Check data to load
  for (var b = 2; b <= clientsLastRow; b++){  
    if(!clients.getRange(b, 1).getValue()){  //Check if has an id created
      var dataToLoad = clients.getRange(b, 3, 1, clientsLastColumn-2); 
      var values = dataToLoad.getValues();
      for (var c = 0; c < clientsLastColumn-2; c++){  //Check if for ' and " and blank values substitute for "-"
        if(!values[0][c]){
          values[0][c] = "-";
        }
        values[0][c] = values[0][c].toString().replace(/['"]+/g, '');
      }
      
      // insert data on table clients from DB
      var sqlInsert = "INSERT INTO clients ([SPECIFIC COLUMNS],deadline_date,deadline_day,deadline_month,deadline_year," //for group by deadline date, for example
      + "deadline_week,checkpoint_date,checkpoint_day,checkpoint_month,checkpoint_year," //checkpoint date is for our control
      + "checkpoint_week) ";
      var sqlInsertValues = "VALUES ('";
      var sqlInsertCloseValues = "')";
      var sqlQuery = sqlInsert + sqlInsertValues
      + [COLUMN 1] + "',"  // for example of the structure
      ...
      + "'" + [COLUMN N] + "',"; // end it before dates
      
      //check if deadline is empty
      if(values[0][5] == "-"){
        sqlQuery = sqlQuery + "NULL" + "," //deadline date
        + "NULL" + ","  //deadline day
        + "NULL" + ","  //deadline month
        + "NULL" + ","  //deadline year
        + "NULL" + ",";  //week
      }else{
        sqlQuery = sqlQuery + "'" + Utilities.formatDate(new Date(values[0][[DEADLINE COLUMN]]), Session.getScriptTimeZone(), "yyyy-MM-dd") + "'," //deadline date
        + "'" + Utilities.formatDate(new Date(values[0][[DEADLINE COLUMN]]), Session.getScriptTimeZone(), "dd") + "',"  //deadline day
        + "'" + Utilities.formatDate(new Date(values[0][[DEADLINE COLUMN]]), Session.getScriptTimeZone(), "MM") + "',"  //deadline month
        + "'" + Utilities.formatDate(new Date(values[0][[DEADLINE COLUMN]]), Session.getScriptTimeZone(), "yyyy") + "',"  //deadline year
        + "'" + new Date(values[0][[DEADLINE COLUMN]]).getWeek() + "',";  //week
      }
           
      sqlQuery = sqlQuery + "'" + start.getFullYear() + "-" 
      + (parseInt(start.getUTCMonth(),10) + 1) + "-" + start.getUTCDate() + "',"  //date
      + "'" + start.getUTCDate()	 + "',"  //day
      + "'" + (parseInt(start.getUTCMonth(),10) + 1) + "',"  //month
      + "'" + start.getFullYear() + "',"  //year
      + "'" + start.getWeek()  //week
      + sqlInsertCloseValues;
      var rs = stmt.executeQuery(sqlQuery);
      clients.getRange(b, 1, 1, 1).setValue("checked");
      clients.getRange(b, 2, 1, 1).setValue(start);
      dataToLoad.protect().setDescription("client - Can't alter for row " + b);
      countRowsInserted++;
      rs.close();
    }
  }
  
  //close connection
  stmt.close();
  conn.close();
      
  
  //Finished time and complete emailsStatus
  var end = new Date();
  emailStatus = emailStatus + "From " + startupSpreadsheet.getName() + "\n"  
  + 'Time elapsed to load data: ' + (end.getTime() - start.getTime())/1000 + " seconds" + "\n"
  + "At this time we inserted - " + countRowsInserted + "\n\n";

  return emailStatus;
}
