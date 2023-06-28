'use strict';
const log4js = require('log4js');
const logger = log4js.getLogger('Hospital-sample');
const bodyParser = require('body-parser');
const http = require('http')
const express = require('express')
const app = express();
const fileupload = require("express-fileupload");
const cors = require('cors');
const config = require('./config/constants')
const auth = require('./app/routers/auth');
const host = process.env.HOST || config.host;
const port = process.env.PORT || config.port;

const helper = require('./app/fabricOps/helper');
const user = require('./app/routers/user');
const election = require('./app/routers/election');
// const candidate = require('./app/routers/candidate');


// const admin = require('./app/routers/adm')
app.options('*', cors());
app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());

app.use(auth.authenticate);

app.use("/admin", user);
app.use("/admin/election", election)
// app.use("/admin/candidate", candidate)



// Error handling
app.use((req, res) => res.status(404).send("Router not found"))

var server = http.createServer(app).listen(port, async () => {

    console.log(`Server started on ${port}`)
});
logger.info('****************** SERVER STARTED ************************');
logger.info('***************  http://%s:%s  ******************', host, port);
server.timeout = 240000;

