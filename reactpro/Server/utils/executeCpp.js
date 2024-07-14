const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require('uuid');
const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, inputPath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const filename = `${jobId}.exe`;
    const outPath = path.join(outputPath, filename);

    return new Promise((resolve, reject) => {
        const command = `g++ "${filepath}" -o "${outPath}" && cd "${outputPath}" && .\\"${filename}"<"${inputPath}"`;
        const process = exec(command, (error, stdout, stderr) => {
            if (error) {
                reject({ error, stderr });
            } else if (stderr) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });

        // if (input) {
        //     process.stdin.write(input);
        //     process.stdin.end();
        // }
    });
};

module.exports = {
    executeCpp,
};
