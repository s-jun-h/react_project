‘In-PEF’ 플랫폼 서비스
===

1.서비스 개요
---
- 크라우드 펀딩 방식을 활용하여, 일반 소액투자자도 사모펀드(PEF)에 가입할 수 있도록 도와주는 플랫폼 서비스
- 일반투자자, 자산운용사(펀드매니저), 자산신탁사가 플랫폼 비즈니스의 주체.
- 자산신탁사가 사모펀드의 49인이하 구성원 중 1인자격을 갖춘 법인으로서, 사모펀드에 가입
- 가입을 위해, 펀드매니저가 모집 금액을 사전에 설정하고 일반 투자자들을 모집
- 사모펀드에 대한 공모형식의 소액투자가 가능해지므로, 일반투자자들의 포트폴리오 범위가 확대된다는 점에서, 투자자들의 니즈 충족 및 자본시장 활성화 기대
- 사업의 지속가능성 측면에서, 플랫폼 비즈니스의 세 주체가 모두 win-win할 수 있는 결과를 도출할 수 있으므로, 안정적인 플랫폼 운영이 기대

2.Tech
---
`-Front-End : React, jQuery` <br>
`-Back-End :Node.js, Express.js` <br>
`-Database : MariaDB` <br>
`-Server : AWS` <br>

3.My Technical Contribution (Hong)
---
<b>`Back-End`</b><br>
<b>1.OAuth 2.0 <br>
-Path : web_project/src/server/server.js <br>
-Method</b><br>
1)Authorization Code Callback Listener <br>
  app.get('/AuthCallback', function(req,res){});  <br>
2)Get Access Token  <br>
  app.get('/authResult', function (req, res){}); <br>
3)Get Account Balance (Using KOSCOM API)  <br>
  app.post('/balance', function(req, res){});  <br>
  app.post('/realBalance', function(req, res){});  <br>
 <br>
<b>2.User/Fund Info Registration <br>
-Path : web_project/src/server/server.js  <br>
-Method</b><br>
 1)Fund Info Registration/Deletion  <br>
  app.post('/fundInsert', function(req, res){}); <br>
  app.post('/fundDelete', function(req, res){});  <br>
 2)User Info Registration <br>
  app.post('/userInsert', function(req, res){}); <br>
  app.post('/userCheck', function(req, res){}); <br>

<br><b>`Front-End`</b><br>
<b>1.User Registartion Page <br>
-Path : web_project/src/pages/SignUp/index.js <br>
-Method</b><br>
1)Get Access Token <br>
  function handleGetToken() <br>
2)Save Access Token <br>
  function handleSaveToken() <br>
3)Check Valid Account <br>
  function handleSubmitBalance() <br>
