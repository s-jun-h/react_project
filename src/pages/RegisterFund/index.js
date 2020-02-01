import React, { useState, useEffect } from 'react'
import './style.css'

function RegisterFund(props) {
    
    var fundId; var companyId;
    var managerId;
    var stage;
    var totalAmount;
    var startDate; var endDate;
    var fundStyle; var morningstarType;

    const [agree, setAgree] = useState(false);

    function handleSubmitFundId(e) {
        fundId=(e.target.value);
        console.log(fundId)
    }

    function handleSubmitCompanyId(e) {
        companyId=(e.target.value)
        console.log(companyId)
    }

    function handleSubmitManagerId(e) {
        managerId=(e.target.value)
        console.log(managerId)
    }

    function handleSubmitTotalAmount(e) {
        totalAmount=(e.target.value)
        console.log(totalAmount)
    }

    function handleSubmitStartDate(e) {
        startDate=(e.target.value)
        console.log(startDate)
    }

    function handleSubmitEndDate(e) {
        endDate=(e.target.value)
        console.log(endDate)
    }

    function handleSubmitFundStyle(e){
        fundStyle=(e.target.value)
        console.log(fundStyle)
    }

    function handleSubmitMorningstarType(e){
        morningstarType=(e.target.value)
        console.log(morningstarType)
    }

    function handleSubmit(event) {

        console.log("submit")
        fetch("http://13.125.242.200:8551/fundInsert", {
            method: 'POST',
            body: JSON.stringify({
                'fundId':fundId,
                'companyId':companyId,
                'managerId':managerId,
                'stage':stage,
                'totalAmount':totalAmount,
                'startDate' :startDate,
                'endDate':endDate,
                'fundStyle':fundStyle,
                'morningstarType':morningstarType,
                'fundmanagerId' : "koscommanager@koscom.co.kr",
                'type':1,
            }),
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},         
        })
        .then(res => res.json())
        .then(resJson => {
            if(resJson.status === 'success'){
                window.alert('good')
                // window.location.href = "http://13.125.242.200:3000/fundInfo"
                window.location.href = "http://13.125.242.200:8551/fundInfo"
            }
            else{

            }
        })
      event.preventDefault();
    }
    
    return (
        <div className="layout" style={{width:700, marginTop:30}}>
            <form>
                <h3>펀드 등록</h3>
                <div style={{ display: 'flex' }}>
                    <div className="form-group" style={{width:350}}>
                        <label>펀드 이름</label>
                        <input type="name" className="form-control" placeholder="펀드명을 입력해주세요" onChange={handleSubmitFundId} />
                    </div>
                    <div className="form-group" style={{marginLeft: 30, width: 150}}>
                        <label>신탁사</label>
                        <input type="name" className="form-control" placeholder="신탁사" onChange={handleSubmitCompanyId} />
                    </div>
                </div>
                <div style={{display: 'flex'}}>
                    <div className="form-group" style={{width:300}}>
                        <label>펀드 매니저</label>
                        <input type="email" className="form-control" placeholder="계정 이메일을 입력해주세요" onChange={handleSubmitManagerId} />
                        
                    </div>
                        <div className="form-group" style={{width:180, marginLeft:30}}>    
                        <label>운용 금액</label>
                        <input className="form-control" onChange={handleSubmitTotalAmount}/>

                    </div>
                    <div style={{marginTop: 40, marginLeft: 10}}>
                        원
                    </div>
                </div>
                <div style={{display:'flex'}}>
                    <div style={{marginBottom: 15, width: 250}} >
                        <label>펀드 종류</label>
                        <select class="form-control" onChange={handleSubmitFundStyle} >
                            <option>대형가치펀드</option>
                            <option>대형혼합펀드</option>
                            <option>대형성장펀드</option>
                            <option>중형가치펀드</option>
                            <option>중형혼합펀드</option>
                            <option>중형성장펀드</option>
                            <option>소형가치펀드</option>
                            <option>소형혼합펀드</option>
                            <option>소형성장펀드</option>
                        </select>
                    </div>
                    <div style={{marginBottom: 15, width: 250, marginLeft: 30}} >
                        <label>모닝스타 타입</label>
                        <select class="form-control" onChange={handleSubmitMorningstarType} >
                            <option>국내 대형주 주식형</option>
                            <option>국내 중소형주 주식형</option>
                            <option>글로벌 주식형</option>
                            <option>라틴아메리카 주식형</option>
                            <option>러시아 주식형</option>
                            <option>미국 주식형</option>
                            <option>브라질 주식형</option>
                            <option>브릭스 주식형</option>
                            <option>아세안 주식형</option>
                        </select>
                    </div>
                </div>
                <div style={{display:'flex'}}>
                    <div className="form-group" style={{width: 250}}>
                        <label>시작일</label>
                        <input type="text" className="form-control" onChange={handleSubmitStartDate} />
                    </div>
                    <div className="form-group" style={{width: 250, marginLeft: 30}}>
                        <label>마감일</label>
                        <input type="text" className="form-control" onChange={handleSubmitEndDate} />
                    </div>
                </div>


                <div className="form-group" >
                    <label>펀드 설명</label>
                    <input type="text" poi className="form-control" style={{width: 530, height: 200}}/>
                </div>

                <p className="forgot-password text-right">
                    <a href="#"> 약관 확인</a>
                </p>
                <p className="forgot-password text-right">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" checked={agree} />
                    <label className="custom-control-label" htmlFor="customCheck1">약관 동의</label>
                </p>

                <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>펀드 등록하기</button>

            </form>
        </div>
    );
}

export default RegisterFund;