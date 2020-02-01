const express = require('express');
const path = require('path');
const request = require('request');
const url = require('url');
const app = express();


/*
    Authorization Code Callback Listener
*/
app.get('/AuthCallback', function(req,res){
    //아래주소에서 접속해서 받음
    //https://sandbox-apigw.koscom.co.kr/auth/oauth/v2/authorize?response_type=code&state=authCode&client_id=l7xx2d23dc68d7364f2ba84f6a159870faae&scope=&redirect_uri=http://13.125.242.200:8551/AuthCallback
    console.log(req.query);

    res.redirect(302, url.format({
            pathname: "http://13.125.242.200:8551/authResult",
            query: {
                code : req.query.code,
                state : req.query.state,
                scope : req.query.scope
            }
        }));
});

/*
    Access Token 얻기
*/
app.get('/authResult', function (req, res) {
    console.log(req.query);

    var authCode = req.query.code;
    var clientId = 'l7xx2d23dc68d7364f2ba84f6a159870faae';
    var clientSecret = '6740431c44414a1b928fa78c86349f73';
    //console.log('authCode : ', req.query.code);

    option = {
        url : "https://sandbox-apigw.koscom.co.kr/auth/oauth/v2/token",
        method : "POST",
        headers : {
            "Content-Type" : "Application/x-www-form-urlencoded",
            "Authorization" : "Basic " + new Buffer(clientId + ':' + clientSecret).toString('base64'),
        },
        form : {
            code : authCode,
            grant_type : "authorization_code",
            redirect_uri : "http://13.125.242.200:8551/AuthCallback"
        }
    }

    request(option, function (error, response, body) {

        if(error){
            console.error('error : ', error);
            throw error;
        }
        else {
            var accessTokenObj = JSON.parse(body);
            console.log('accessTokenObj : ', accessTokenObj);
            res.send(accessTokenObj);
            //res.render('resultChild', {data : accessTokenObj});
        }
    });

});

/*
    Access Token을 사용하여 통장 잔고 얻기
*/
app.get('/balance', function(req, res){

    // 1. 잔고조회 API URL : https://sandbox-apigw.koscom.co.kr/v1/diamond/account/balance/search
    var url = req.body.url;
    // 2. 고객 CI
    var ci = req.body.ci; //"KGZDUgKx9ASZuzWb+dA0gFSPfaqASmw4Tc3XyMUJP049hK/HWD5M7joB83GAd/osmPyCyZrQ/36K2awX8lgVjg==";
    // 3. 고객 계좌번호
    var vtAccNo = req.body.vtAccNo; //"181292854886800001"
    // 4. 고객 Token
    var accessToken = req.body.accessToken; //"956d173d-555c-4416-8119-7a41481c2db4";
    
    //고객 계좌잔고 정보 요청
    option = {
        url: url,
        body: '{"partner": {    "comId": "F9999",    "srvId": "999"  },  "commonHeader": {  "ci": "'+ ci +'",    "reqIdConsumer": "reqid-0001"  },  "devInfo": {    "ipAddr": "192168010001",    "macAddr": "1866DA0D99D6"  },  "accInfo": {	"vtAccNo": "'+ vtAccNo +'"  },  "balanceRequestBody": {	"queryType": {      "assetType": "ALL",      "count": 0,      "page": "null"    }  }}',
        headers: { 'Content-Type':'application/json', 'Authorization':'Bearer ' + accessToken + '', 'Content-Type':'application/json'  },
        method: 'POST'
    }

    request(option, function (error, response, body) {
        //console.log('Reponse received', body);

        if(error){
            console.log(err);
            throw new Error(error);
        }
        console.log(JSON.parse(body));
        //res.send(body);
        res.send(body);
    });
});

/*
    HTTP REQ, RES 처리
*/
//static 파일 요청이면 아래에서 끝남
app.use(express.static(path.join(__dirname, '../build')));

//만약 그렇지않은 나머지의 경우는 index.html를 넘겨줌
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


app.listen(8551);