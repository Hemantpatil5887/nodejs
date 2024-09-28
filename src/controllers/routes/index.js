const { app, httpContext } = require('./../../utils');

app.use(httpContext.middleware);

app.get('/healthCheck', (request, response) => {
    response.status(200).send('OK');
});

module.exports = app;