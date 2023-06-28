const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('user');
const config = require('../../config/constants.json');
logger.level = config.logLevel;
const userService = require('../fabricGateway/users');
const candidateService = require('../fabricGateway/candidate');
const helper = require('../fabricOps/helper')
const auth = require('./auth');


router.post('/create', async (req, res) => {
    try {
        const candidateId = req.body.data.candidateId;
        const name = req.body.data.name;
        const studentId = req.body.data.studentId;
        const faculty = req.body.data.faculty;
        const major = req.body.data.major;
        const classOf = req.body.data.classOf;
        const description = req.body.data.Description;
        const jargon = req.body.data.jargon;
        const photo = req.body.data.photo;

        // await helper.enrollAdmin(orgName);
        // console.log(orgName);
        // let user = await helper.registerAndEnrollUser(username, password, orgName);
        // if (!user) {
        //     let errMsg = `A user already exists with the username ${username}`;
        //     return res.status(409).send(errMsg);
        // }
        let test = await candidateService.candidate(req.body.data);
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