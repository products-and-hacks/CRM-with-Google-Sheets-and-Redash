function generateSpreadsheet() {
  var sourceFile = DriveApp.getFileById('[ID FOR SPREADSHEET TEMPLATE]');
  var sheetOfSheets = ss.getSheetByName("[SHEET WITH CLIENTS]' spreadsheets");
  var sheetOfEditors = ss.getSheetByName("SHEET WITH ACCESS");
  var lastRowOfSheets = sheetOfSheets.getLastRow();
  var lastRowOfEditors = sheetOfEditors.getLastRow();
  
  //Create Files
  for(var a = 2; a < lastRowOfSheets; a++){ 
    if(!sheetOfSheets.getRange(a, 4).getValue()) {  //Check if need to create an spreasheet
      var destinationFile = sourceFile.makeCopy(sheetOfSheets.getRange(a, 1).getValue() + "-" 
      + sheetOfSheets.getRange(a, 2).getValue() + "-"
      + sheetOfSheets.getRange(a, 3).getValue());  
      sheetOfSheets.getRange(a, 4).setValue(destinationFile.getUrl());
    }
  }
  
  // Add editors
  for(var b = 2; b <= lastRowOfEditors; b++){
    for (var c = 2; c < lastRowOfSheets; c++){  
      if (SpreadsheetApp.openByUrl(sheetOfSheets.getRange(c,4).getValue()).getName() == sheetOfEditors.getRange(b, 4).getValue() 
      + "-" + sheetOfEditors.getRange(b, 5).getValue() + "-" 
      + sheetOfEditors.getRange(b, 6).getValue()){
        var fileToAddEditors = DriveApp.getFileById(SpreadsheetApp.openByUrl(sheetOfSheets.getRange(c,4).getValue()).getId());
        fileToAddEditors.addEditor(sheetOfEditors.getRange(b, 3).getValue());
      }
    }
  }
}
