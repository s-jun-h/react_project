const express = require('express');
const path = require('path');
var mysql = require('mysql');
const app = express();

/*
    DB Connection 처리
*/
var connection = mysql.createConnection({
    host: '13.125.242.200',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'db'
});

connection.connect(function (error) {
    if(error){
        console.error('error connection: ' + error.stack);
        return;
    }

    //console.log('connection: ', connection);
    console.log('[DB Connection Success] connected as id ' +   connection.threadId);
});


/*
    환율정보 DB Insert
*/
const request = require('request');
const certKey = 'OEIDkG6msYquVZXRoO4v24mfhCwNPzZ9';
const date = '2020-01-02';

const requestOption = {
    uri : 'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON',
    qs: { // query string (url 파라미터)
        authkey: certKey,
        searchdate: date,
        data: 'AP01',
    }
};

request(requestOption, function(error, response, body) {
    if(error){
        console.log('error ', error);
    }

    //console.log('body: ', body);
    //console.log('typeof body: ', typeof body); //string

    // JSON을 JavaSCript object로 parse.
    const bodyJSON = JSON.parse(body);
    //console.log('typeof body: ', typeof bodyJSON); //object
    console.log('bodyJSON: ', bodyJSON);
    console.log('bodyJSON 길이: ', Object.keys(bodyJSON).length);

    // body에 데이터가 안온 경우
    
    if(!Object.keys(bodyJSON).length){
        console.log('body 데이터가 비어있음');
        return;
    }

    var values = [];
    for (var row = 0; row < Object.keys(bodyJSON).length; row++){
        values.push([
            date,
            bodyJSON[row].result,
            bodyJSON[row].cur_unit,
            bodyJSON[row].ttb,
            bodyJSON[row].tts,
            bodyJSON[row].deal_bas_r,
            bodyJSON[row].bkpr,
            bodyJSON[row].yy_efee_r,
            bodyJSON[row].ten_dd_efee_r,
            bodyJSON[row].kftc_bkpr,
            bodyJSON[row].kftc_deal_bas_r,
            bodyJSON[row].cur_nm
        ]);

        //console.lop('check!');
    }

    //console.log('values: ', values);
    const query = 'INSERT INTO rate (rate_date, result, cur_unit, ttb, tts, deal_bas_r, bkpr, yy_efee_r, ten_dd_efee_r, kftc_bkpr, kftc_deal_bas_r, cur_nm)'
    + ' values ' + connection.escape(values);

    console.log('query :', query);
    
    connection.query(
        query,
        function(insertError, results, fields) {
            connection.end();
            if(insertError){
                console.log('insertError: ', insertError);
            }
            console.log('results: ', results);
            console.log('fields: ', fields);
        }
    );
});


/*
    HTTP REQ, RES 처리
*/
//static 파일 요청이면 아래에서 끝남
app.use(express.static(path.join(__dirname, '../build')));

//만약 그렇지않은 나머지의 경우는 index.html를 넘겨줌
app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

//8000번 포트 사용
app.listen(8000);