const data = require('./DataRetriver');


const xlsx = require('xlsx');


var workBook = xlsx.utils.book_new() ;

var jsonObjects= [] ; 
var start = new Date();

data.on('data',(doc)=>{

    jsonObjects.push(doc._doc);
   
});

data.on('end',()=>{
    var endOfProcess = new Date() - start ; 
    console.info(' time for processing : %dms', endOfProcess)
    var wrtieStart = new Date(); 
    var worksheet = xlsx.utils.sheet_add_json(worksheet,jsonObjects);
    xlsx.utils.book_append_sheet(workBook,worksheet,'client Data');
    xlsx.writeFile(workBook,'data.xlsb');
    console.log('completed writing !!');
    var endOfWrite = new Date() - wrtieStart ; 
    console.info('time for writing  %dms', endOfWrite)
    console.log('total time %dms',new Date() - start);
    
});

