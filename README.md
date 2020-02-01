# ‘In-PEF’ 플랫폼 서비스

### 서비스 개요

1. 크라우드 펀딩 방식을 활용하여, 일반 소액투자자도 사모펀드(PEF)에 가입할 수 있도록 도와주는 플랫폼 서비스
2. 일반투자자, 자산운용사(펀드매니저), 자산신탁사가 플랫폼 비즈니스의 주체.
3. 자산신탁사가 사모펀드의 49인이하 구성원 중 1인자격을 갖춘 법인으로서, 사모펀드에 가입
4. 가입을 위해, 펀드매니저가 모집 금액을 사전에 설정하고 일반 투자자들을 모집
5. 사모펀드에 대한 공모형식의 소액투자가 가능해지므로, 일반투자자들의 포트폴리오 범위가 확대된다는 점에서, 투자자들의 니즈 충족 및 자본시장 활성화 기대
6. 사업의 지속가능성 측면에서, 플랫폼 비즈니스의 세 주체가 모두 win-win할 수 있는 결과를 도출할 수 있으므로, 안정적인 플랫폼 운영이 기대


### Tech
-Front-End : React, jQuery <br>
-Back-End :Node.js, Express.js <br>
-DataBase : MariaDB <br>
-Server : AWS <br>


### My Technical Contribution
<b>[Back-End]</b><br>
1.OAuth 2.0 <br>
-Path : web_project/src/server/server.js <br>
-Method <br>
1)Authorization Code Callback Listener <br>
  app.get('/AuthCallback', function(req,res){});  <br>
  <br>
2)Get Access Token  <br>
  app.get('/authResult', function (req, res){}); <br>
  <br>
3)Get Account Balance (Using KOSCOM API)  <br>
  app.post('/balance', function(req, res){});  <br>
  app.post('/realBalance', function(req, res){});  <br>
 <br>
2.User/Fund Info Registration <br>
-Path : web_project/src/server/server.js  <br>
-Method  <br>
 1)Fund Info Registration/Deletion  <br>
  app.post('/fundInsert', function(req, res){  <br>
  app.post('/fundDelete', function(req, res){  <br>
 <br>
 2)User Info Registration <br>
  app.post('/userInsert', function(req, res){}; <br>
  app.post('/userCheck', function(req, res){}; <br>
 <br>
<b>[Front-End]</b><br>
1.User Registartion Page <br>
-Path : web_project/src/pages/SignUp/index.js <br>
-Method <br>
1)Get Access Token <br>
  function handleGetToken() <br>
2)Save Access Token <br>
  function handleSaveToken() <br>
3)Check Valid Account <br>
  function handleSubmitBalance(){ <br>
4)Component <br>
  <button className="btn btn-primary btn-block" type="button" style={{backgroundColor: "darkorange", borderColor : "darkorange"}} onClick={handleGetToken}>Token 인증</button> <br>
  <button className="btn btn-primary btn-block" type="button" style={{backgroundColor: "darkorange", borderColor : "darkorange"}} onClick={handleSaveToken}>Token 저장</button> <br>
  <button className="btn btn-primary btn-block" type="button" style={{backgroundColor: "green", borderColor : "green"}} onClick={handleSubmitBalance}>계좌 확인</button> <br>
 <br>
  <div className="form-group"> <br>
  <label>Account number</label> <br>
  <input id = "inputAccount" className="form-control" placeholder="Enter account number" onChange={handleSubmitAccountNumber} /> <br>
  </div> <br>
 <br>
  <div className="form-group"> <br>
  <label>Account Status</label> <br>
  <input id = "bankStatus" className="form-control" defaultValue="미확인" readOnly="readOnly" onChange={''} /> <br>
  </div> <br>
 <br>
  <div className="form-group"> <br>
  <label>CI</label> <br>
  <input id = "inputCi" className="form-control" placeholder="Enter CI number" onChange={handleSubmitCI} /> <br>
  </div> <br>
 <br>
<div className="form-group"> <br>
<label>Access Token</label> <br>
<input id = "inputToken" className="form-control" placeholder="아래 'Token 얻기' 버튼을 눌러 얻으십시오." readOnly="readOnly" onChange={''} /> <br>
</div> <br>
