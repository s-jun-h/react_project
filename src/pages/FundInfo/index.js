import React, { useState, useEffect, Component } from 'react';
import { connect } from 'react-redux';
import { logIn, regEmail } from '../../store/loginState';

const userTypeName = ['투자자', '신탁사', '펀드매니저']

class FundInfo extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      userType : "",
      name : "",
      fundWaitList : [],
      fundstagenumber : [0,0,0,0], // 인덱스0 => 상태0의 숫자 그대로 매칭
      loading : true
    }
  }

  handlefundCancle= (event) =>{
    console.log("submit")
    var returnValue=window.confirm('펀드를 취소하시겠습니까?')
    if(returnValue){
    fetch("http://13.125.242.200:8551/fundDelete", {
            method: 'POST',
            body: JSON.stringify({
                'userId':this.props.upperUserEmail,
                'type':this.props.upperUserType,
            }),
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},         
        })
        .then(res => res.json())
        .then(resJson => {
            if(resJson.status === 'success'){
              alert("펀드가 취소되었습니다.")
            }
            else{ // fail
            }
        })
        .then(resJson => console.log(resJson.status));
      event.preventDefault();
    }
  }

  getInitialData = async () => {
    console.log('uppserUserType', this.props.upperUserType)
    fetch("http://13.125.242.200:8551/myFund", {
      method: 'POST',
      body: JSON.stringify({
        'userEmail': this.props.upperUserEmail,
        'userType' : this.props.upperUserType,
    }),
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    })
    .then(res => (res.json()))
    .then(resJ => {
      //console.log('resJ.fundList', resJ.fundList, typeof(resJ.fundList))
      resJ.fundList.map(ele => {
        //console.log('ele', typeof(ele), ele);
        this.setState({fundWaitList : this.state.fundWaitList.concat(ele)});
      })
    })
    .then(() => this.setState({loading : false}))
    .then(tmp => console.log('state check', this.state.fundWaitList, typeof(this.state.fundWaitList)))
  }

  getInitialData_number = async () => {
    console.log('number stage')
    fetch("http://13.125.242.200:8551/myFundStageNumber", {
      method: 'POST',
      body: JSON.stringify({
        'userEmail': this.props.upperUserEmail,
    }),
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(resJ => {
      console.log(resJ)
      const tmp = []
      resJ.data.map(x => {
        tmp.push(x.count)
      })
      this.setState({fundstagenumber : tmp})
    })
  }

  getInitialPersonalInfo = async () => {
    fetch("http://13.125.242.200:8551/userInfo", {
      method: 'POST',
      body: JSON.stringify({
        'userEmail': this.props.upperUserEmail,
    }),
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(resJ => {
      console.log(resJ)
      this.setState({name : resJ.data[0].name, userType : userTypeName[resJ.data[0].user_type]})
    })
  }

  componentDidMount(){
    this.getInitialPersonalInfo();
    this.getInitialData();
    this.getInitialData_number();
  }

  render(){
    if(this.state.loading === true) return (<div/>)
    return(
      <div>
      <div style={{display: 'flex'}}>
        <h4 style={{ textAlign: 'center', margin:'auto', marginTop: 20 }}>
          {
            this.props.upperUserType === 0
            ?
            <div>{this.state.userType} {this.state.name}님이 투자한 펀드 목록입니다.</div>
            :
            // <div>{this.state.userType} {this.state.name}님이 투자한 펀드 목록입니다.<a href="http://13.125.242.200:3000/registerFund"><button type="button" class="btn btn-dark"  style={{height: 40,width: 130, marginLeft: 20}}>새 펀드 등록</button></a></div>
            <div>{this.state.userType} {this.state.name}님이 투자한 펀드 목록입니다.<a href="http://13.125.242.200:8551/registerFund"><button type="button" class="btn btn-dark"  style={{height: 40,width: 130, marginLeft: 20}}>새 펀드 등록</button></a></div>
          }
        </h4>
      </div>
      <div style={{ margin: 'auto', marginTop: 30, width: 700 }}>
        
        <div class="list-group" >
          <div style={{display:'flex', height: 50}}>
          <button type="button" class="list-group-item list-group-item-action active" >
            모집중인 펀드&nbsp;
            <span class="badge badge-primary badge-pill" style={{ textAlign: 'right', backgroundColor: 'white', color: 'black' }}>{this.state.fundstagenumber[0]}</span>
          </button>
          </div>
          <div style={{ overflowY: 'scroll', height: 200 }}>
            {
              this.state.fundWaitList.filter(fund => fund.stage === '0').map(fund => {
                return(
                  <a class="list-group-item list-group-item-action flex-column align-items-start" style={{height:106}}>
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{fund.fund_id}</h5>
                      <small class="text-muted" style={{position:'relative'}}>등록자 : {fund.register_email}</small>
                    </div>
                    <p class="mb-1">현재 펀딩된 금액 : {fund.current_amount}</p>
                    <small class="text-muted">총 모집금액 : {fund.total_amount}</small>
                    {/* <button class="btn btn-dark" style={{position:'relative', fontSize:12 ,width:60, height:30, bottom: 10, left:350}}>관리</button> */}
                    <button class="btn btn-dark" onClick={this.handlefundCancle} style={{position:'relative', fontSize:12 ,height:30,bottom: 10, left:425}}>펀드취소</button>
                  </a>
                );
              })
            }
          </div>
        </div>

        <div class="list-group">
          <button type="button" class="list-group-item list-group-item-action active">
            운용중인 펀드&nbsp;<span class="badge badge-primary badge-pill" style={{ textAlign: 'right', backgroundColor: 'white', color: 'black' }}>{this.state.fundstagenumber[1]}</span>
          </button>
          <div style={{ overflowY: 'scroll', height: 200 }}>
          {
              this.state.fundWaitList.filter(fund => fund.stage === '1').map(fund => {
                return(
                  <a class="list-group-item list-group-item-action flex-column align-items-start"  style={{height:106}}>
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{fund.fund_id}</h5>
                      <small class="text-muted">등록자 : {fund.register_email}</small>
                    </div>
                    <p class="mb-1">현재 펀딩된 금액 : {fund.current_amount}</p>
                    <small class="text-muted">총 모집금액 : {fund.total_amount}</small>
                    {/* <button class="btn btn-dark" onClick={this.handlefundCancle} style={{position:'relative', fontSize:12 ,height:30,bottom: 10, left:425}}>펀드취소</button> */}
                  </a>
                );
              })
            }
          </div>
        </div>

        <div class="list-group">
          <button type="button" class="list-group-item list-group-item-action active">
            운용마감된 펀드&nbsp;<span class="badge badge-primary badge-pill" style={{ textAlign: 'right', backgroundColor: 'white', color: 'black' }}>{this.state.fundstagenumber[2]}</span>
          </button>
          {
              this.state.fundWaitList.filter(fund => fund.stage === '2').map(fund => {
                return(
                  <a class="list-group-item list-group-item-action flex-column align-items-start"  style={{height:106}}>
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{fund.fund_id}</h5>
                      <small class="text-muted">등록자 : {fund.register_email}</small>
                    </div>
                    <p class="mb-1">현재 펀딩된 금액 : {fund.current_amount}</p>
                    <small class="text-muted">총 모집금액 : {fund.total_amount}</small>
                    {/* <button class="btn btn-dark" onClick={this.handlefundCancle} style={{position:'relative', fontSize:12 ,height:30,bottom: 10, left:425}}>펀드취소</button> */}
                  </a>
                );
              })
            }
        </div>

        <div class="list-group">
          <button type="button" class="list-group-item list-group-item-action active">
            취소된 펀드&nbsp;<span class="badge badge-primary badge-pill" style={{ textAlign: 'right', backgroundColor: 'white', color: 'black' }}>{this.state.fundstagenumber[3]}</span>
          </button>
          <div style={{ overflowY: 'scroll', height: 200 }}>
          {
              this.state.fundWaitList.filter(fund => fund.stage === '3').map(fund => {
                return(
                  <a class="list-group-item list-group-item-action flex-column align-items-start"  style={{height:106}}>
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{fund.fund_id}</h5>
                      <small class="text-muted">등록자 : {fund.register_email}</small>
                    </div>
                    <p class="mb-1">현재 펀딩된 금액 : {fund.current_amount}</p>
                    <small class="text-muted">총 모집금액 : {fund.total_amount}</small>
                    {/* <button class="btn btn-dark" onClick={this.handlefundCancle} style={{position:'relative', fontSize:12 ,height:30,bottom: 10, left:425}}>펀드취소</button> */}
                  </a>
                );
              })
            }
          </div>
        </div>

      </div>

    </div>
    )
  }
}

const mapStateToProps = state => ({  //2
  logedIn : state.loginState.logedIn,
  upperUserEmail : state.loginState.userEmail,
  upperUserType : state.loginState.userType
});

const mapDispatchToProps = dispatch => {
  return {
    logIn : () => dispatch(logIn()),
    regEmail : email => dispatch(regEmail(email)),
  }
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(FundInfo);