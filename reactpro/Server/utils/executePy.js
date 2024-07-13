const { exec } = require("child_process"); //read about child process
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require('uuid');

const executePy = (filepath) => {
    return new Promise((resolve, reject) => {
        
         const command= `python "${filepath}" `;
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
    executePy,
};