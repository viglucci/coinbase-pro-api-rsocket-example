const process = require('process');
const closeWithGrace = require('close-with-grace');
const { start, stop } = require('./src/server');

start()
    .then(() => {
        console.log("server started...");
        closeWithGrace(() => {
            stop();
            setTimeout(() => {
                process.exit(0);
            }, 1000);
        }); 
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });