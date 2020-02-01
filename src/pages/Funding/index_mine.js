import React, { useState, useEffect } from 'react'

function Funding(props) {

    function handleCheckBox(e) {

    }

    return (
        <div className="layout" style={{width:700, marginTop:30}}>
            <form>
                <h3>펀딩</h3>
                <div style={{ display: 'flex' }}>
                    <div className="form-group" style={{width:350}}>
                        <label>펀드 이름</label>
                        <input type="name" className="form-control" placeholder="펀드명을 입력해주세요"  />
                    </div>
                    <div className="form-group" style={{marginLeft: 30, width: 150}}>
                        <label>신탁사</label>
                        <select class="form-control"  >

                    </select>     
                    </div>
                </div>
                <div style={{display: 'flex'}}>
                    <div className="form-group" style={{width:300}}>
                        <label>펀드 매니저</label>
                        <input type="email" className="form-control" placeholder="계정 이메일을 입력해주세요"  />
                        
                    </div>
                        <div className="form-group" style={{width:180, marginLeft:30}}>    
                        <label>운용 금액</label>
                        <input className="form-control" />

                    </div>
                    <div style={{marginTop: 40, marginLeft: 10}}>
                        원
                    </div>
                </div>
                <div style={{display:'flex'}}>
                    <div style={{marginBottom: 15, width: 250}} >
                        <label>펀드 종류</label>

                    </div>
                    <div style={{marginBottom: 15, width: 250, marginLeft: 30}} >
                        <label>모닝스타 타입</label>
                        <select class="form-control"  >
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
                        <input type="text" className="form-control"  />
                    </div>
                    <div className="form-group" style={{width: 250, marginLeft: 30}}>
                        <label>마감일</label>
                        <input type="text" className="form-control"  />
                    </div>
                </div>


                <div className="form-group" >
                    <label>펀드 설명</label>
                    <input type="text" poi className="form-control" style={{width: 530, height: 200}}  />
                </div>

                <p className="forgot-password text-right">
                    <a href="#"> 약관 확인</a>
                </p>
                <p className="forgot-password text-right">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" checked={true} />
                    <label className="custom-control-label" htmlFor="customCheck1">약관 동의</label>
                </p>
                <button type="submit" className="btn btn-primary btn-block" >펀드 등록하기</button>
            </form>
        </div>
    );
}

export default Funding;