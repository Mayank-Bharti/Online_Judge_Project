const { exec } = require("child_process");

const executePy = (filepath, input = "") => {
    return new Promise((resolve, reject) => {
        const command = `python "${filepath}"`;
        const process = exec(command, (error, stdout, stderr) => {
            if (error) {
                reject({ error, stderr });
            } else if (stderr) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });

        if (input) {
            process.stdin.write(input);
            process.stdin.end();
        }
    });
};

module.exports = {
    executePy,
};
