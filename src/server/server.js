const express = require('express')
const path = require('path')
const app = express()
const port = 8551
var router = express.Router();
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const url = require('url');
const request = require('request');

const session = require('express-session');
const FileStore = require('session-file-store')(session)

var myToken = "";
const myFundStageNumberRouter = require('./nodeRouter/myFundStageNumber')

app.use(cookieParser());
app.use(bodyParser.json())
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 15 * 60 * 1000// 쿠키 유효기간 min
//   },
//   store : new FileStore()
// }));

/*
    DB Connection 처리
*/
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'db',
    multipleStatements: true
});

connection.connect(function (error) {
    if(error){
        console.error('error connection: ' + error.stack);
        return;
    }

    //console.log('connection: ', connection);
    console.log('[DB Connection Success] connected as id ' +   connection.threadId);
});

function isAuthenticated(req, res, next) {
    // do any checks you want to in here
  
    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (req.user.islogin)
        return next();
  
    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.json({status:"session_out"});
}

/*
    로그인 처리
*/
app.post("/login", async function(req,res,next){
    let body = req.body;
    if(!body) return;

    const userEmail = body.userEmail;
    const inputPassword = body.userPassword;
    const passwdSql = "select pwd,user_type from user where email = (?)";
    
    connection.query(passwdSql, [userEmail], function(err, results, field){
        if(results[0].pwd === inputPassword){
            console.log("비밀번호 일치", results[0].user_type);
            // 세션 설정
            //req.session.userEmail = body.userEmail;
            //req.session.islogin = true;
            res.json({status:'success', userType : results[0].user_type});
        }
        else{
            console.log("비밀번호 불일치");
            res.json({status:'fail'});
        }
    });        
});

/*
    회원가입시 사용자 정보 등록
*/
app.post('/userInsert', function(req, res){
    console.log("server post user insert");
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    var userName = req.body.userName;
    var userAccount = req.body.userAccount;
    var userType = req.body.userType;
    var userBalance = req.body.userBalance;
    var userCi = req.body.userCi;
    var userBank = req.body.userbank;
    var userToken = req.body.token;

    //console.log(userEmail, userPassword, userName, userAccount, userType, userBalance, userCi, userbank);

    var sql = "insert into user values (?,?,?,?,?,?,?,?,?)";

    connection.query(sql,[
        userEmail,
        userName,
        userBalance,
        userType,
        userPassword,
        userAccount,
        userCi,
        userBank,
        userToken
        ], function(err, result){
        if(err){
            console.dir(result)
            console.error(err);
            throw err;
        }
        else {
            res.json(1);
        }
    })
});

/*
    회원가입시 email 중복 확인
*/
app.post('/userCheck', function(req, res){
    var userEmail = req.body.userEmail;
    var sql = "select * from user where email = (?)";

    console.log('userEmail : ', userEmail);

    connection.query(sql,[userEmail], function(err, result){
        if(err){
            console.error(err);
            throw err;
        }
        else {
            console.log(result);
            res.json({
                data : result
            });
        }
    })
});

/*
    내 펀드 리스트 가져오기
*/
app.post('/myFund', function(req, res){
    var userEmail = req.body.userEmail;
    var userType = req.body.userType;

    console.log('userEmail : ', userType);

    if(userType === 0){
        var sql = "select * from funds where fund_id in (select fund_id from matched_funds where invest_email = (?))";
        connection.query(sql, [userEmail],
            function(err, result){
            if(err){
                console.error(err);
                throw err;
            }
            else {
                res.json({
                    fundList : result
                });
            }
        })
    }

    else{
        var sqlAdmin = "select * from funds where register_email = (?)"
        connection.query(sqlAdmin, [userEmail],
            function(err, result){
            if(err){
                console.error(err);
                throw err;
            }
            else {
                res.json({
                    fundList : result
                });
            }
        })
    }
})

/*
    내 펀드 stage number 가져오기
*/
app.post('/myFundStageNumber', function(req, res){
    var userEmail = req.body.userEmail;
    console.log('userEmail : ', userEmail);

    var sql = "select stage,count(*) as count from matched_funds, funds where matched_funds.fund_id = funds.fund_id and invest_email = (?) group by stage;";
    connection.query(sql, [userEmail],
        function(err, result){
        if(err){
            console.error(err);
            throw err;
        }
        else {
            console.log('result',result);
            res.json({
                data : result
            });
        }
    })
})

/*
    user info 가져오기
*/
app.post('/userInfo', function(req, res){
    var userEmail = req.body.userEmail;
    console.log('userEmail : ', userEmail);

    var sql = "select * from user where email = (?);";
    connection.query(sql, [userEmail],
        function(err, result){
        if(err){
            console.error(err);
            throw err;
        }
        else {
            console.log('result',result);
            res.json({
                data : result
            });
        }
    })
})

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
    var clientSecret = '9d080c8f90234aa78fe92b4739118a7c';
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
            
            myToken = accessTokenObj;
            console.log('myToken : ', myToken);

            res.send('Token 인증이 완료되었습니다. <br> 게속해서 Token 저장 버튼을 눌러주시기 바랍니다.');
        }
    });

});

/*
    Access Token을 사용하여 유효한 계좌인지 확인
*/
app.post('/balance', function(req, res){

    /*1. 잔고조회 API URL
        1.다이아몬드증권 : https://sandbox-apigw.koscom.co.kr/v1/diamond/account/balance/search
        2.사이버증권 : https://sandbox-apigw.koscom.co.kr/v1/cyber/account/balance/search
        3.스타증권 : https://sandbox-apigw.koscom.co.kr/v1/star/account/balance/search

    */
    //var url = req.body.url;

    // 계좌은행 : 3개의 값만 가져와야함 {diamond, cyber, star}
    var bank = req.body.bank;
    // 2. 고객 CI
    var ci = req.body.ci;
    // 3. 고객 계좌번호
    var vtAccNo = req.body.vtAccNo;
    // 4. 고객 Token
    var accessToken = req.body.accessToken;
    
    //고객 계좌잔고 정보 요청
    option = {
        url: 'https://sandbox-apigw.koscom.co.kr/v1/' + bank + '/account/balance/search',
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

        var cashBalance = '';
        try{
            cashBalance = JSON.parse(body).balanceList.balance.summary.cashBalance;
            console.log(JSON.parse(body));
            res.send('1');
        }catch(e){
            console.log(JSON.parse(body));
            res.send('0');
        }

    });
});


/*
    Access Token을 요청올 시 저장된 Token 주기 (myToken)
*/
app.post('/getAccessToken', function(req, res){
    //res.send(JSON.parse(body).access_token);
    res.send({myToken : myToken});

    //서버가 Open되있으면 계속해서 동일하게 저장된 Token을 가져오므로, 저장하면 입력Form을 초기화 시킴
    myToken = "";
});


/*
    Access Token을 사용하여 계좌 잔고 확인
*/
app.post('/realBalance', function(req, res){

    /*1. 잔고조회 API URL
        1.다이아몬드증권 : https://sandbox-apigw.koscom.co.kr/v1/diamond/account/balance/search
        2.사이버증권 : https://sandbox-apigw.koscom.co.kr/v1/cyber/account/balance/search
        3.스타증권 : https://sandbox-apigw.koscom.co.kr/v1/star/account/balance/search

    */
    //var url = req.body.url;

    // 계좌은행 : 3개의 값만 가져와야함 {diamond, cyber, star}
    var bank = req.body.bank;
    // 2. 고객 CI
    var ci = req.body.ci;
    // 3. 고객 계좌번호
    var vtAccNo = req.body.vtAccNo;
    // 4. 고객 Token
    var accessToken = req.body.accessToken;
    
    //고객 계좌잔고 정보 요청
    option = {
        url: 'https://sandbox-apigw.koscom.co.kr/v1/' + bank + '/account/balance/search',
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

        var cashBalance = '';
        try{
            cashBalance = JSON.parse(body).balanceList.balance.summary.cashBalance;
            console.log('cashBalance : ', cashBalance);
            res.send({cashBalance : cashBalance});
        }catch(e){
            console.log(e);
            res.send({cashBalance : cashBalance});
        }

    });
});


/*
    펀드 등록
*/
app.post('/fundInsert', function(req, res){
    console.log("server post fund insert");
    var fundId = req.body.fundId;
    var companyId = req.body.companyId;
    var managerId = req.body.managerId;
    var stage = req.body.stage;
    var totalAmount = req.body.totalAmount;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var fundStyle = req.body.fundStyle;
    var morningstarType = req.body.morningstarType;
    var fundmanagerId = req.body.fundmanagerId ;

    var sql = "insert into funds values (?,?,?,?,?,?,?,?,?,?,?,?)";
    connection.query(sql,[
        fundId,
        fundmanagerId,
        0,
        totalAmount,
        0, // 초기 등록이므로 current_amount는 0임
        0, // profit_rate
        companyId,
        startDate,
        endDate,
        fundStyle,
        morningstarType,
        managerId
        ], function(err, result){
        if(err){
            res.json({
                status : 'fail'
            });
            throw err;
        }
        else {
            res.json({
                status : 'success'
            });
        }
    })
});

/*
    펀드 취소
    type == 1 : matched_funds 삭제 => funds의 current_amount 감소
    type == 2 : funds의 state 변경
*/
app.post('/fundDelete', function(req, res){
    console.log("server post fund delete");

    var fundId = req.body.fundId;
    var userId = req.body.userId;
    var type = req.body.type;
    var sql1, sql2 = "";

    //matched_funds 삭제 => funds의 current_amount 감소
    if(type === '1'){
        var curAmt = '', myAmt = '', updateAmt = '';

        sql1 = "update funds set current_amount = current_amount - (select invest_amount from matched_funds where fund_id = ? and invest_email = ?) where fund_id = ?;";
        sql2 = "delete from matched_funds where fund_id = ? and invest_email = ?;";
        connection.query(sql1 + sql2, [fundId, userId, fundId, fundId, userId], function(err, result){
            if(err){
                console.dir(result)
                console.error(err);
                throw err;
            }
            else {
                console.log("funds 테이블의 current_amount 업데이트 완료");
                console.log("matched_funds 삭제 완료");
                res.json(1);
            }
        })

    //funds의 state 변경 [펀드 취소]
    }else if(type === '2'){
        
        sql1 = "update funds set stage = '3' where fund_id = ?;";
        connection.query(sql1, [fundId], function(err, result){
            if(err){
                console.dir(result)
                console.error(err);
                throw err;
            }
            else {
                console.log("funds 테이블의 STAGE = 3 업데이트 완료");
                res.json(1);
            }
        })
    }
});



/*
    initialFunds => data : ~~ -> json send
*/
app.post('/initialFunds', function(req, res){
    console.log('initialFunds');

    //var sql = "select * from funds, user where funds.stage = '0' and funds.register_email = user.email order by (current_amount/total_amount) desc;";
    var sql = "select * from funds where funds.stage = '0' order by (current_amount/total_amount) desc;";
    connection.query(sql,
        function(err, result){
        if(err){
            console.error(err);
            throw err;
        }
        else {
            console.log('result',result);
            res.json({
                data : result
            });
        }
    })
})

/*
    Investor Funding
*/
app.post('/InvestFunding', function(req, res){
    var userEmail = req.body.userEmail;
    var userPriceAmount = req.body.fundingAmount;
    var fundId = req.body.fundId;

    const sql = "insert into matched_funds values(?, ?, ?);"+ 
                "update funds set current_amount = current_amount + ? where fund_id = ?;"+
                "update funds set stage = IF(current_amount > total_amount = true, 1, stage) where fund_id = ?;";
    connection.query(sql, [fundId, userEmail, userPriceAmount, userPriceAmount, fundId, fundId],
        function(err, result){
        if(err){
            console.error(err);
            res.json({
                status : false
            });
            throw err;
        }
        else {
            console.log('result',result);
            res.json({
                status : true
            });
        }
    })
})

/*
    HTTP REQ, RES 처리
*/
//static 파일 요청이면 아래에서 끝남
app.use(express.static(path.join(__dirname, '../../build')));

//만약 그렇지않은 나머지의 경우는 index.html를 넘겨줌
app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
