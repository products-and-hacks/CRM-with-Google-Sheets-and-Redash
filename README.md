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
  - [checkNewData.gs](https://github.com/products-and-hacks/CRM-with-Google-Sheets-and-Redash/blob/master/checkNewData.gs) - check if any new data is inserted and call the logical function to send to database.
  - [forClients.gs](https://github.com/products-and-hacks/CRM-with-Google-Sheets-and-Redash/blob/master/forClients.gs) - check with a specific logic for new data and send to database at Azure SQL Server.

### Create Spreadsheets
You can create Spreadsheets from the menu. You will need a sheet with all Clients and another one to editors - who has access to what spreadsheet. This will create a spreadsheet for every client who hasn't a spreadsheet created already. 

### Send data to Database
This is triggered in a time based (we used once a day, that was fine for us). It checks all spreadsheets created for any new data and send a email everyday with how many rows was inserted for each client. 

### Alerts
SOON.

### Use Redash
We used Redash for query and present dashboards for our KPIs. 

Have fun and any doubts, [@efremfilho](https://twitter.com/efremfilho)!
