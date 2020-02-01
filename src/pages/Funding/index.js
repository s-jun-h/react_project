import React, { useState, useEffect, Component } from 'react'

class Funding extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fundId:'',
            companyId:'',
            managerId:'',
            totalAmount:'',
            currentAmount:'',
            startDate:'',
            endDate:'',
            fundStyle:'',
            morningstaType:'',
            balance : 0,
        }
    }

    handlePriceChange = (e) => {
        this.setState({balance : e.target.value})
    }


    handleSubmit = (event) => {

        console.log("금액",this.state.balance)
        var returnValue = window.confirm('펀딩 하시겠습니까?')
        if (returnValue) {
            fetch("http://13.125.242.200:8551/InvestFunding", {
                method: 'POST',
                body: JSON.stringify({
                    'fundingAmount': this.state.balance,
                    'fundId' : this.props.fundId,
                    'userEmail': "ingyu@gmail.com"
                }),
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(resJson => {
                    if (resJson.status === 'success') {
                        alert("펀딩 되었습니다.")
                    }
                    else { // fail
                    }
                })
            event.preventDefault();
        }
    }


    render() {
        return (
            <div className="layout" style={{ width: 700, marginTop: 30 }}>
                <form>
                    <h3>펀딩</h3>
                    <div style={{ display: 'flex', marginTop: 20 }}>
                        <div className="form-group" style={{ width: 250 }}>
                            <label style={{ marginLeft: 20 }}>펀드 이름</label>
                            <li>
                                <div class="btn btn-outline-secondary" style={{ width: 250 }}>
                                    {this.props.fundId}
                                    {/* {1231225} */}
                        </div>
                            </li>
                        </div>
                        <div className="form-group" style={{ marginLeft: 30, width: 250 }}>
                            <label style={{ marginLeft: 20 }}>신탁사</label>
                            <li>
                                <div class="btn btn-outline-secondary" style={{ width: 250 }}>
                                    {/* {1231225} */}
                                    {this.props.companyId}
                        </div>
                            </li>
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div className="form-group" style={{ width: 250 }}>
                            <label style={{ marginLeft: 20 }}>펀드 매니저</label>
                            <li>
                                <div class="btn btn-outline-secondary" style={{ width: 250 }}>
                                    {/* {1231225} */}
                                    {this.props.managerId}
                        </div>
                            </li>

                        </div>
                        <div className="form-group" style={{ width: 250, marginLeft: 30 }}>
                            <label style={{ marginLeft: 20 }}>펀드 종류</label>
                            <li>
                                <div class="btn btn-outline-secondary" style={{ width: 250 }}>
                                    {/* {1231225} */}
                                    {this.props.fundStyle}
                        </div>
                            </li>

                        </div>
                    </div>

                    <div style={{ display: 'flex' }}>
                        <div className="form-group" style={{ width: 250 }}>
                            <label style={{ marginLeft: 20 }}>시작일</label>
                            <li>
                                <div class="btn btn-outline-secondary" style={{ width: 250 }}>
                                    {/* {1231225} */}
                                    {this.props.startDate}
                        </div>
                            </li>
                        </div>
                        <div className="form-group" style={{ width: 250, marginLeft: 30 }}>
                            <label style={{ marginLeft: 20 }}>마감일</label>
                            <li>
                                <div class="btn btn-outline-secondary" style={{ width: 250 }}>
                                    {/* {1231225} */}
                                    {this.props.endDate}
                        </div>
                            </li>
                        </div>
                    </div>

                    <div style={{ display: 'flex' }}>
                        <div style={{ marginBottom: 15, width: 250 }} >
                            <label style={{ marginLeft: 20 }}>운용 금액</label>
                            <li>
                                <div class="btn btn-outline-secondary" style={{ width: 250 }}>
                                    {/* {1231225} */}
                                    {this.props.totalAmount}
                                </div>
                            </li>
                        </div> 

                    <div style={{ marginTop: 40, marginLeft: 5 }}>
                    </div>
                        <div className="form-group" style={{ width: 250, marginLeft: 25 }}>
                            <label style={{ marginLeft: 20 }}>현재 금액</label>
                            <li>
                                <div class="btn btn-outline-secondary" style={{ width: 250 }}>
                                    {/* {1231225} */}
                                    {this.props.currentAmount}
                                </div>
                            </li>
                        </div>
                    <div style={{ marginTop: 40, marginLeft: 75 }}>
                    </div>
                    </div>
                    <div>
                        <label style={{ position: 'relative', right: 500, color: 'red', fontWeight: 'bold' }}>잔고</label>
                        <div className="form-group" style={{ display: 'flex', width: 250}}>
                        <div class="btn btn-outline-secondary" style={{ width: 250 }}>
                                    {23650319627}
                                    {/* {this.props.balance} */}
                                </div>
                        </div>
                    </div>
                    <div>
                        <label style={{ position: 'relative', right: 500, color: 'red', fontWeight: 'bold' }}>투자 금액</label>
                        <div className="form-group" style={{ display: 'flex', width: 250}}>
                            <input placeholder="금액 입력" style={{ borderColor: "red" }} style={{ width: 400 }} className="form-control" onChange={this.handlePriceChange} />
                            <div style={{ marginTop: 5 }}>
                                원
                            </div>
                        </div>
                    </div>


                    <p className="forgot-password text-right">
                        <a href="#"> 약관 확인</a>
                    </p>
                    <p className="forgot-password text-right">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" checked={true} />
                        <label className="custom-control-label" htmlFor="customCheck1">약관 동의</label>
                    </p>
                    <button type="submit" onClick={this.handleSubmit} className="btn btn-primary btn-block" >펀딩 하기</button>
                </form>
            </div>
        );
    }
}

export default Funding;