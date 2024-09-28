'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const serverName = 'NodeJS';
const PORT = "8080";
const app = express();

// Normal express config defaults
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('../controllers/routes/index'));

// finally, let's start our server...
const server = app.listen(PORT, () => {
    console.log('Listening on port ', server.address().port);
    console.log('server startup log', `server ${serverName} restarted`);
});

server.keepAliveTimeout = "";
server.headersTimeout = "";

// error handling
process
    .on('unhandledRejection', (error, promise) => {
        console.error("unhandledRejection error", error);
        console.error('Unhandled rejection', new Error('unhandled rejection at ', promise, `reason: ${error.message}`));
        app.stop = (() => {
            console.error('server closed', new Error("Http server closed"));
            server.close();
            setTimeout(() => {
                console.error('process exiting', new Error("exiting process"));
                process.exit(1);
            }, PROCESS_EXIT_TIME);
        });
        app.stop();
    })
    .on('uncaughtException', (error) => {
        console.error('uncaught exception', new Error(`Uncaught Exception: ${error.message}`));
    });


process.on('beforeExit', (code) => {
    // Can make asynchronous calls
    setTimeout(() => {
        console.error('process exit', new Error(`Process will exit with code: ${code}`));
        process.exit(code);
    }, 1000);
});

module.export = server;