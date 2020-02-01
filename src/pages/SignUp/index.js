import React, { useState, useEffect } from 'react'
import './style.css'

function SignUp(props) {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password_, setPassword_] = useState();
    const [accountNumber, setAccountNumber] = useState();
    const [CI, setCI] = useState();
    const [bank, setBank] = useState(0);
    const [agree, setAgree] = useState(false);

    function validateForm() {
        //   return email.length > 0 && password.length > 0;
    }

    function handleSubmitName(e) {
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmitEmail(e) {
        setEmail(e.target.value);
        console.log(email)
    }

    function handleSubmitPwd(e) {
        setPassword(e.target.value)
        console.log(password)
    }

    function handleSubmitPwd_(e) {
        setPassword_(e.target.value)
        console.log(password_)
    }

    function handleSubmitAccountNumber(e) {
        setAccountNumber(e.target.value)
        console.log(accountNumber)
    }

    function handleSubmitCI(e) {
        setCI(e.target.value)
        console.log(CI)
    }

    function handleSelectBank(e){
        setBank(e.target.value)
        console.log(bank)
    }

    /*
        Access Token 얻기
    */
    function handleGetToken(){
        var openURL = "https://sandbox-apigw.koscom.co.kr/auth/oauth/v2/authorize?response_type=code&state=authCode&client_id=l7xx2d23dc68d7364f2ba84f6a159870faae&scope=&redirect_uri=http://13.125.242.200:8551/AuthCallback";
        var option = "width=500, height=650"
        var windowName = "Access Token Popup";
        
        window.open(openURL, windowName, option);
    }

    /*
        Access Token 입력폼에 저장
    */
   function handleSaveToken(){
        fetch("http://13.125.242.200:8551/getAccessToken",{
            method: 'POST',
            body: JSON.stringify({
            }),
            headers: {},         
          }).then(res => res.json())
            .then(json => {
                var inputTmpToken;
                inputTmpToken = json.myToken.access_token;
                
                console.log('얻은 myToken : ', inputTmpToken);
                
                if(typeof inputTmpToken === 'undefined'){
                    document.getElementById("inputToken").value = '';
                    alert('Token 인증 버튼을 먼저 눌러주시기 바랍니다.');
                }else{
                    document.getElementById("inputToken").value = inputTmpToken;
                    alert('Access Token이 입력 양식에 저장 완료되었습니다.');
                }

                
            });
   }

    /*
        계좌 있는지 확인 (계좌 잔고 화인)
        -필요 데이터 : bank, account, token, ci
    */
    function handleSubmitBalance(){
        var tmpBank = document.getElementById("selectBank").value;
        var tmpCi = document.getElementById("inputCi").value;
        var tmpAcc = document.getElementById("inputAccount").value;
        var tmpToken = document.getElementById("inputToken").value;
        var result = 0;

        if(tmpAcc === ''){
            alert('Account number를 입력해주시기 바랍니다.');
            return;
        }

        if(tmpCi === ''){
            alert('CI를 입력해주시기 바랍니다.');
            return;
        }

        if(tmpToken === ''){
            alert('Token을 입력해주시기 바랍니다.');
            return;
        }

        if(tmpBank === '다이아몬드 증권'){
            tmpBank = 'diamond';
        }else if(tmpBank === '사이버 증권'){
            tmpBank = 'cyber';
        }else if(tmpBank === '스타 증권'){
            tmpBank = 'star';
        }else{
            tmpBank = '';
        }

        fetch("http://13.125.242.200:8551/balance",{
            method: 'POST',
            body: JSON.stringify({
                "bank": tmpBank,
                "ci": tmpCi,
                "vtAccNo": tmpAcc,
                "accessToken": tmpToken
            }),
            headers: {'Content-Type': 'application/json'},         
            }).then(res => res.json())
            .then(json => {
                result = json;
                if(!result){
                    document.getElementById("bankStatus").value = "미확인";
                    alert('계좌 확인이 불가합니다. 입력 내용을 확인해주시기 바랍니다.');
                }else{
                    document.getElementById("bankStatus").value = "확인 완료";
                    alert('계좌 확인이 완료되었습니다.');
                }
            });
    }
    

    function handleCheckBox(e) {
        // setAgree(!agree)

        if (password != password_) {
            alert('패스워드를 확인하세요')
        }

        const body_ = {
            'userEmail': email,
            'userName': name,
            'userbalance': 0,
            'userType': 0,
            'userPassword': password,
            'userAccount': '01020',
            'userCi': 30012,
        }

        const obj = JSON.stringify({
            method: 'POST',
            body: body_,
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        })

        const URL = 'http://13.125.242.200:8551/userInsert';

        fetch("http://13.125.242.200:8551/userInsert",{
            method: 'POST',
            body: JSON.stringify({
                'userEmail': email,
                'userName': name,
                'userbalance': 0,
                'userType': 0,
                'userPassword': password,
                'userAccount': '01020',
                'userCi': 30012,
                'userBank': bank,
            }),
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},         
            }).then(res => res.json())
          .then(resJson => console.log(resJson.status));

    }

    return (
        <div className="layout" style={{marginTop:30}}>
            <form>
                <h3>Sign Up</h3>
                <div style={{ display: 'flex' }}>
                    <div className="form-group">
                        <label>Your name</label>
                        <input type="name" className="form-control" placeholder="Enter name" onChange={handleSubmitName} />
                    </div>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={handleSubmitEmail} />             
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={handleSubmitPwd} />
                </div>

                <div className="form-group">
                    <label>Confirm password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={handleSubmitPwd_} />
                </div>

                <div style={{marginBottom: 15}} >
                    <label>증권사</label>
                    <select id = "selectBank" class="form-control" onChange={handleSelectBank} >
                        <option>다이아몬드 증권</option>
                        <option>사이버 증권</option>
                        <option>스타 증권</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Account number</label>
                    <input id = "inputAccount" className="form-control" placeholder="Enter account number" onChange={handleSubmitAccountNumber} />
                </div>

                <div className="form-group">
                    <label>Account Status</label>
                    <input id = "bankStatus" className="form-control" defaultValue="미확인" readOnly="readOnly" onChange={''} />
                </div>

                <div className="form-group">
                    <label>CI</label>
                    <input id = "inputCi" className="form-control" placeholder="Enter CI number" onChange={handleSubmitCI} />
                </div>

                <div className="form-group">
                    <label>Access Token</label>
                    <input id = "inputToken" className="form-control" placeholder="아래 'Token 얻기' 버튼을 눌러 얻으십시오." readOnly="readOnly" onChange={''} />
                </div>

                <p className="forgot-password text-right">
                    <a href="#"> 약관 확인</a>
                </p>
                <p className="forgot-password text-right">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" checked={agree}/>
                    <label className="custom-control-label" htmlFor="customCheck1">약관 동의</label>
                </p>

                <button className="btn btn-primary btn-block" type="button" style={{backgroundColor: "darkorange", borderColor : "darkorange"}} onClick={handleGetToken}>Token 인증</button>
                <button className="btn btn-primary btn-block" type="button" style={{backgroundColor: "darkorange", borderColor : "darkorange"}} onClick={handleSaveToken}>Token 저장</button>
                <button className="btn btn-primary btn-block" type="button" style={{backgroundColor: "green", borderColor : "green"}} onClick={handleSubmitBalance}>계좌 확인</button>
                <button type="submit" className="btn btn-primary btn-block" onClick={handleCheckBox}>Submit</button>

            </form>
        </div>
    );
}

export default SignUp;