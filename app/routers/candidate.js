const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('user');
const config = require('../../config/constants.json');
logger.level = config.logLevel;
const userService = require('../fabricGateway/users');
const electionService = require('../fabricGateway/election');
const helper = require('../fabricOps/helper')
const auth = require('./auth');


router.post('/create', async (req, res) => {
    try {
        const electionId = req.body.data.electionId;
        const electionName = req.body.data.name;
        const startDate = req.body.data.startDate;
        const endDate = req.body.data.endDate;
        const username = req.body.data.username;
        const org = req.body.data.org;

        // await helper.enrollAdmin(orgName);
        // console.log(orgName);
        // let user = await helper.registerAndEnrollUser(username, password, orgName);
        // if (!user) {
        //     let errMsg = `A user already exists with the username ${username}`;
        //     return res.status(409).send(errMsg);
        // }
        let test = await electionService.election(req.body.data);
        console.log('berhasil kah' + test)

        let response = {
            "status": "success"
        };
        return res.status(200).send(test);
    } catch (error) {
        if (error.toString().includes('already exists')) {
            return res.status(409).send(error.toString());
        } else {
            return res.status(400).send(error.toString());
        }
    
    }

});