const formater = require('../formatter');
const Excel = require('exceljs/modern.nodejs');

const data = require('../DataRetriver');

var headerKeys = ['vendorName','vendorNumber','dept','quarter','year','claimType'];


data.then((results)=>{

    results.forEach((result)=>{

        result=formater.sanitizeResult(result);
        var workbook = new Excel.Workbook();
        var worksheet = workbook.addWorksheet(result._id);
        var records =   formater.convertHeadToAoA(result,headerKeys);
          
        worksheet.mergeCells('C1', 'H2');
        worksheet.getCell('C1').value ='Refrence Number:'+ result._id ;
        worksheet.getCell('C1').font ={size:20};
        worksheet.getCell('C1').alignment = { vertical: 'middle', horizontal: 'center' };
        
        worksheet.getRow(3).values=[] ;
        
        
        records.forEach((record)=>{
            var row = worksheet.addRow(record);
            row.eachCell((cell,colno)=>{
                if(colno === 1)
                {
                    cell.font ={bold:true};
                }
                else{
                    cell.font ={bold:false };
                }
                cell.alignment = { vertical: 'middle', horizontal: 'center' };
            })
            
        });

        var bodyRecords = formater.convertBodyToAoA(result,headerKeys);
        worksheet.getRow(12).values=bodyRecords[0] ;
        var headerColumns=[] ; 
        bodyRecords[0].forEach((value,index)=>{
            headerColumns.push({ key:value ,width:20,style:{font:{bold:true}}});
        });


        worksheet.columns = headerColumns ;
        bodyRecords =bodyRecords.splice(1);
        bodyRecords.forEach((bodyRecord)=>{
            let row = worksheet.addRow(bodyRecord);
            row.eachCell((cell,colno)=>{
                cell.font={bold:false};
            });
        })
        
        workbook.xlsx.writeFile('./output/'+result._id+'.xlsx').then(function() {
                console.log("done writting ");
        });




    });



});