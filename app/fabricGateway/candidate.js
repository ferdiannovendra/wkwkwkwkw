const query = require('../fabricOps/query');
const helper = require('../fabricOps/helper');
const invoke = require('../fabricOps/invoke');
const bcrypt = require('bcryptjs');
const config = require('../../config/constants');
const util = require('../utils/util');
const moment = require('moment');
const log4js = require('log4js');
const logger = log4js.getLogger('users');
require('dotenv').config()
const jwt = require('jsonwebtoken');


const candidate = async (req_body) => {
    try {
        let candidateId = req.body.data.candidateId;
        let name = req.body.data.name;
        let studentId = req.body.data.studentId;
        let faculty = req.body.data.faculty;
        let major = req.body.data.major;
        let classOf = req.body.data.classOf;
        let description = req.body.data.Description;
        let jargon = req.body.data.jargon;
        let photo = req.body.data.photo;
        
        
        console.log("Mau nya masuk createelection : "+ req_body);
        let resp = await invoke.invokeTransaction(config.channelName, config.chaincodeName, "AddCandidate", req_body, req_body.username, req_body.org);
        return resp;
    } catch (error) {
        throw error;
    }
}

const getAllElection = async (req_body) => {
    try {
        let username = req_body.username;
        let org = req_body.org;
        let payload = [];
        console.log("req_body : "+req_body.username);
        let resp = await query.queryChaincode(config.channelName, config.chaincodeName, payload, "GetAllElections", username, org);
        console.log("RESP :  "+ JSON.stringify(resp));

        return resp;
    }catch (error) {
        throw error;
    }

}
const getCandidateInElection = async (req_body) => {
    try {
        let username = req_body.username;
        let org = req_body.org;
        let payload = [];
        console.log("req_body : "+req_body.username);
        let resp = await query.queryChaincode(config.channelName, config.chaincodeName, payload, "GetAllElections", username, org);
        console.log("RESP :  "+ JSON.stringify(resp));

        return resp;
    }catch (error) {
        throw error;
    }

}

module.exports = {
    candidate,
    getAllElection
}