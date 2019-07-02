module.exports = function convertToAoA(data)
{   
    var element =[] ; 
    var keys = Object.keys(data).splice(1);
    element.push(keys);
    var tempArray =[] ;
    for(i=0;i<data[keys[0]].length;i++)
    {
        for ( let key of keys) {
        tempArray.push(data[key][i]?(data[key][i]!==''?data[key][i]:'Not Known '):'Not Known '); 

        }
        
        element.push(tempArray);
        tempArray = [] ;
    }


    //console.log('-----------------------------------------------------------------------');
    //console.log(element);
    //console.log('-----------------------------------------------------------------------');
    return element ;
};