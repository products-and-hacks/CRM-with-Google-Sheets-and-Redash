function checkNewData() {
  
  // Check everyday for new data
  
  var sheetOfSheets = ss.getSheetByName("[CLIENTS SHEET]");
  var lastRow = sheetOfSheets.getLastRow();
  var emailStatus = "";

  //Get all the Clients' Spreadsheets to look
  
  for(var a = 2; a <= lastRow; a++){ 
    if(ss.getSheetByName("[CLIENTS SHEET]").getRange(a, 4).getValue()) {  //Check if spreasheet was  created
      var clientSpreadsheet = SpreadsheetApp.openByUrl(ss.getSheetByName("[CLIENTS SHEET]").getRange(a, 4).getValue());
      var name = clientSpreadsheet.getName();
      var group-client-batch = name.split("-"); //This is to query by a group or batch
      
      //call for logic to store in database
      //emailStatus = forClients(clientSpreadsheet,group-client-batch, emailStatus);      
    }
  }
  var end = new Date();
  GmailApp.sendEmail('[YOUR EMAIL]', 'Status from New Data for Clients - '+ end, "Hi, this is the sumary for today: \n\n" 
                     + emailStatus + "Regards, Éfrem.");
}
