const Excel = require('exceljs/modern.nodejs');




var workBook = new Excel.Workbook();
var worksheet = workBook.addWorksheet("demo worksheet!!");


worksheet.getRow(3).values=['HI','how'];
worksheet.addRow(['second','line']);





  workBook.xlsx.writeFile("ExcelJSoutput.xlsx")
  .then(function() {
    console.log("done writting ");
  });
