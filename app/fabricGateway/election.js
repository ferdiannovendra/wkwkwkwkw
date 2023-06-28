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


const election = async (req_body) => {
    try {
        let electionName = req_body.electionName;
        let startDate = req_body.startDate;
        let endDate = req_body.endDate;
        
        // console.log (username)
        // console.log(password)
        // console.log(orgName)

        // let functionName;
        // if (orgName === "voter"){
        //     functionName = "CreateVoter";
        // } else if (orgName === "committee"){
        //     functionName = "CreateCommittee";
        // } else {
        //     throw new Error ("Invalid org:" + orgName);
        // }
        // req_body.password = util.hashPassword(password);
        // req_body.timeStamp = moment.utc().format(config.dateFormat);
        console.log("Mau nya masuk createelection : "+ req_body);
        let resp = await invoke.invokeTransaction(config.channelName, config.chaincodeName, "CreateElection", req_body, req_body.username, req_body.org);
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
    election,
    getAllElection
}