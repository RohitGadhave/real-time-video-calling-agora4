const express = require('express');
require('dotenv').config();
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require("cors");

console.log(process.env.PORT)
const port = process.env.PORT || 3000;

const app = express();

const AppId = process.env.APP_ID || "a3d7ab91d0f74db68117947fbc9feb3b";
const AppCertificate = process.env.APP_CERTIFICATE || "20a79020e688477dad2e6e5bf94b4aa7";
const AppChannelName = process.env.CHANNEL_NAME || "202025";

app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/token', (req, res) => {
    const { uid } = req.query;
    const modalObj = generateToken(AppId, AppCertificate, AppChannelName, uid)
    res.json({
        "id": uid,
        "channel": AppChannelName,
        "token": modalObj,
        "appId": AppId
    });
});

// generate token by passing 4 parameters // 

const generateToken = (appId, appCertificate, channel, uid) => {

    // Rtc Examples

    const role = RtcRole.PUBLISHER;
    RtcRole.SUBSCRIBER;
    const expirationTimeInSeconds = 28800;

    const currentTimestamp = Math.floor(Date.now() / 1000);

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

    // Build token with uid
    let intUid = +uid || 202020;

    console.log("intUid : ", intUid);
    const Uid = 202020;

    const remoteUserToken = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channel, intUid, role, privilegeExpiredTs);

    const userToken = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channel, Uid, role, privilegeExpiredTs);

    // console.log("Token With Integer Number Uid: " + preparedToken);

    // // Build token with user account
    // const preparedToken = RtcTokenBuilder.buildTokenWithAccount(appId, appCertificate, channel, "", role, privilegeExpiredTs);
    // console.log("userToken : ", userToken);
    // console.log("remoteUserToken : ", remoteUserToken);

    return {
        "remoteUserToken": remoteUserToken,
        "userToken": userToken,
    };
}
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})