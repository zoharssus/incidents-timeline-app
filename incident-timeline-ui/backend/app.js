const config = require('./config/config');
const express = require('express');
const http = require('http');

const incidentsRouter = require('./routes/incidents.routes');

const BASE_ROOT = 'http://localhost:5000';

const app = express();

app.set('port', (config.port));
app.use(BASE_ROOT + '/incidents', incidentsRouter);

const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log('App is running and live on port:', app.get('port'));
});

module.exports = app;
