const fs = require('fs');
const csv = require('csv-parser')
const path = require('path');

function loadData(fileUploaded) {
    console.log('in load');
    let dataArr = [];
    let filePath='';
    if(fileUploaded)
        filePath = path.join(__dirname, '..','backend', 'public','Sample Sheet.csv');
    else{
        filePath = path.join(__dirname, '..','backend', 'public','dummy.csv');
    }
    // console.log("path:", filePath)
    return new Promise((resolve, reject) => {
        if (checkFileExists()) {
            try{
                fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', row => dataArr.push(row))
                .on('end', data => {
                    //   console.log('data:', dataArr);
                    //  return dataArr;
                    resolve(dataArr);
                });
            }catch(err){ console.log("errer")}
        }

    })



}
function checkFileExists(filePath) {
    let flag = true;
    try {
        fs.existsSync(filePath, fs.F_OK);
    } catch (e) {
        flag = false;
    }
    return flag;
}

module.exports = { loadData };