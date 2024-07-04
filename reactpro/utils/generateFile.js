const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const dirCodes = path.join(__dirname, 'codes');

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true }); //home work: what recursive:true will do??
}

const generateFile = (language,code) => {
    const jobID = uuid();
    // console.log(jobID);
     const filename = `${jobID}.${language}`;
     const filePath = path.join(dirCodes, filename);
    fs.writeFileSync(filePath, code);
     return filePath;
};

module.exports = {
    generateFile,
};