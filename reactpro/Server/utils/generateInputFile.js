const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');  // Updated import to v4 with correct name

const dirInputs = path.join(__dirname, 'inputs');

if (!fs.existsSync(dirInputs)) {
    fs.mkdirSync(dirInputs, { recursive: true });
}

const generateInputFile = async (input) => {
    const jobID = uuidv4();  // Changed to uuidv4 to match the v4 function
    const input_filename = `${jobID}.txt`;
    const input_filePath = path.join(dirInputs, input_filename);
    const inputString = Array.isArray(input) ? input.join('\n') : input;
    await fs.promises.writeFile(input_filePath, inputString);
    return input_filePath;
};

module.exports = {
    generateInputFile,
};
