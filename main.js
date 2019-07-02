const data = require('./DataRetriver');
const formatter = require('./formatter');

const xlsx = require('xlsx');



var jsonObjects= [] ; 
var start = new Date();

data.then((results)=>{
        results.forEach((result)=>{
            console.log('inside for eacxh ');
            let workBook = xlsx.utils.book_new() ; 
            let workSheet = xlsx.utils.aoa_to_sheet(formatter(result)) ;
           
            xlsx.utils.book_append_sheet(workBook,workSheet,"RefNO-"+result._id);
            xlsx.writeFile(workBook,'./outputFiles/'+result._id+'.xlsx');
            



        });
        
        console.log('done writing !!');
       
});



