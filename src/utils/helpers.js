'use strict';
const express = require('express');
const app = express();
const httpContext = require('express-http-context');

module.exports = { 
    app,
    httpContext
};