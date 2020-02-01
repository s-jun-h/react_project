import React, { Component } from 'react'

import MyCard from '../../templates/MyCard/index'
import Banner from '../../templates/Banner/index'

const Item = [
  {
    nameOfTrust: "SHINHAN",
    nameOfFund: "사모펀드1호",
    nameOfFM: "이준형",
    target: "30억원",
    current: "20억원"
  },
  {
    nameOfTrust: "HANA",
    nameOfFund: "사모펀드2호",
    nameOfFM: "홍성준",
    target: "30억원",
    current: "20억원"
  },
  {
    nameOfTrust: "WOORI",
    nameOfFund: "사모펀드3호",
    nameOfFM: "김도연",
    target: "30억원",
    current: "20억원"
  },
  {
    nameOfTrust: "KB",
    nameOfFund: "사모펀드4호",
    nameOfFM: "안대영",
    target: "30억원",
    current: "20억원"
  },
  {
    nameOfTrust: "KB",
    nameOfFund: "사모펀드4호",
    nameOfFM: "안대영",
    target: "30억원",
    current: "20억원"
  },{
    nameOfTrust: "KB",
    nameOfFund: "사모펀드4호",
    nameOfFM: "안대영",
    target: "30억원",
    current: "20억원"
  },{
    nameOfTrust: "KB",
    nameOfFund: "사모펀드4호",
    nameOfFM: "안대영",
    target: "30억원",
    current: "20억원"
  },
]

class Main extends Component{

  constructor(props){
    super(props);
    this.state = {
      fundList : [],
      loading : true,
    }
  }

  getInitialData = async () => {
    fetch("http://13.125.242.200:8551/initialFunds", {
      method: 'POST',
    //   body: JSON.stringify({
    //     'userEmail': this.props.upperUserEmail,
    // }),
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    })
    .then(res => (res.json()))
    .then(resJ => {
      //console.log('resJ.fundList', resJ.fundList, typeof(resJ.fundList))
      resJ.data.map(ele => {
        //console.log('ele', typeof(ele), ele);
        this.setState({fundList : this.state.fundList.concat(ele)});
      })
    })
    .then(() => this.setState({loading : false}))
    .then(tmp => console.log('state check', this.state.fundList, typeof(this.state.fundList)))
  }

  componentDidMount(){
    this.getInitialData();
  }

  render(){
    if(this.state.loading === true) return(<div></div>);
    return(
        <div>
          <div>
          <Banner/>
            <div style={{marginLeft: 200, overflowY: 'scroll', height: 800}}>
            {this.state.fundList.map(I => {
              return (
                  <div style={{margin: '20px'}}>
                    {<MyCard style={{alignItems:'center',margin: '10px'}} 
                    companyId={I.company_id} 
                    fundId={I.fund_id} 
                    managerId={I.fundmanager_id} 
                    totalAmount={I.total_amount} 
                    currentAmount={I.current_amount}
                    startDate={I.start_date} 
                    endDate={I.end_date} 
                    fundStyle={I.fund_style} 
                    morningstaType={I.moringstar_type} 

                    />}
                  </div>
              )
              })}
            </div>
          </div>
      </div>
    )
  }
}

export default Main