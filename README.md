# CRM with Google Sheets and Redash

Part of our #lowcode hacks, this project uses Google Sheets + Google Apps Script + Azure SQL Server + Redash for doing a doing a Customer Relationship Management (CRM) or Supply Management.

## What we used
  - [Google Sheets](https://www.google.com/sheets/about/) - to control spreadhseets' creation and control access to those.
  - [Google Apps Script](https://developers.google.com/apps-script/) - to create the spreadsheet for all clients, send data to database and block alter data after sent.
  - [Azure SQL Server](https://azure.microsoft.com/en-us/services/sql-database/) - to store all the data in a centralize database to query.
  - [Redash](https://redash.io/) - to query and build dashboards from all spreadsheets data.
  
## How it works

### Files
  - [menu.gs](https://github.com/products-and-hacks/CRM-with-Google-Sheets-and-Redash/blob/master/menu.gs) - Create a menu at the "control spreadsheet" and soon alert functionality. 
  - [generateSheets.gs](https://github.com/products-and-hacks/CRM-with-Google-Sheets-and-Redash/blob/master/generateSpreadsheets.gs) - To create a spreadsheet for each client/supplier and add editors - who can access - each spreadsheet.

### Create Spreadsheets

### Send data to Database

### Use Redash

