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

const authenticateUser = async (userName, password, org) => {
    try {
        let payload = [userName];
        let functionName = "";
        console.log("org nya ni : "+org);
        if (org === "voter"){
            functionName = "GetVoterDetails";
        } else if (org === "committee"){
            functionName = "GetCommitteeDetails";
        } else {
            throw new Error ("Invalid org:" + org);
        }

        let resp = await query.queryChaincode(config.channelName, config.chaincodeName, payload, functionName, userName, org);
        let chainData;
        console.log("RESP :  "+ JSON.stringify(resp));
        console.log("RESP objectBytes :  "+ JSON.stringify(resp.objectBytes));
        console.log("status hehehe : "+ helper.ledgerOpsStatus.success);
        if (resp && resp.status == helper.ledgerOpsStatus.success) {
            chainData = resp.objectBytes ? JSON.parse(resp.objectBytes) : null;
            console.log("INI CHAINDATA : " + chainData);
        } else {
            throw new Error(JSON.parse(resp.description));
        }
        if (!bcrypt.compareSync(password, chainData.password)) {
            throw new Error('Invalid password.');
        }
        try {

            let token = generateJwtToken(userName, org);
            console.log("test token masuk :"+token);
            logger.debug('test token masuk: ', token );
            const ret = JSON.stringify({username:userName, org:org, jwt:token, name:chainData.name});
            console.log("HASILNYA INI : "+ ret)
            return ret;
        } catch(e) {
            console.log("error nya ini : " + e);
        }
        return null;

    } catch (err) {
        throw err;
    }
}

const register = async (req_body) => {
    try {
        let username = req_body.userID;
        let password = req_body.password;
        let orgName = req_body.org;
        let email = req_body.email;
        console.log (username)
        console.log(password)
        console.log(orgName)

        let functionName;
        if (orgName === "voter"){
            functionName = "CreateVoter";
        } else if (orgName === "committee"){
            functionName = "CreateCommittee";
        } else {
            throw new Error ("Invalid org:" + orgName);
        }
        req_body.password = util.hashPassword(password);
        req_body.timeStamp = moment.utc().format(config.dateFormat);
        await invoke.invokeTransaction(config.channelName, config.chaincodeName, functionName, req_body, username, orgName);
        return;
    } catch (error) {
        throw error;
    }
}

const generateJwtToken = (userName, org) => {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + parseInt(config.jwt_expiretime),
        username: userName,
        orgname: org
    }, process.env.JWT_SECRET);
}

const respObj = (userName, token) => {
    return ({
        accessToken: token,
        username: userName,
    });
}

module.exports = {
    authenticateUser,
    register,
    generateJwtToken,
    respObj
}
