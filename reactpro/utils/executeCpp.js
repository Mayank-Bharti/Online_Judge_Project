const { exec } = require("child_process"); //read about child process
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require('uuid');
const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const filename=`${jobId}.exe`;
    const outPath = path.join(outputPath, filename);

    return new Promise((resolve, reject) => {
        
         const command= `g++ "${filepath}" -o "${outPath}" && cd "${outputPath}" && .\\${filename}`;
        //  console.log("Executing command:", command); // Debugging line
         exec(command, (error, stdout, stderr) => {
             if (error) {
                //  console.error("Error executing command:", error);
                 reject({ error, stderr });
             } else if (stderr) {
                //  console.error("Standard error:", stderr);
                 reject(stderr);
             } else {
                 resolve(stdout);
             }
            }
        );
    });
};

module.exports = {
    executeCpp,
};