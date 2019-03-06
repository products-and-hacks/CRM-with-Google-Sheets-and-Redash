var ss = SpreadsheetApp.openByUrl('[YOUR CONTROL SPREADSHEET URL');

function onOpen() {
  var menuEntries = [ {name: "Generate new spreadsheets", functionName: "generateSpreadsheet"},
                      {name: "Alert Client (soon)", functionName: "alert"} //NOT IMPLEMENTED
                    ];
  ss.addMenu("Manager", menuEntries);
}
