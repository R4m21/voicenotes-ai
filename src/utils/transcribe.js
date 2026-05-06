const { exec } = require("child_process");

const transcribeAudio = async (filePath) => {
  return new Promise((resolve, reject) => {
    exec(`./venv/bin/python3 transcribe.py "${filePath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        reject(error);
      }
      if (stderr) {
        console.warn(`stderr: ${stderr}`);
        reject(stderr);
      }
      resolve(stdout.trim());
    });
  });
};

module.exports = { transcribeAudio };
