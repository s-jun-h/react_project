import React ,{useState} from 'react'
import styles from './styles.css'
import Popup from "reactjs-popup";
import Funding from '../../pages/Funding'

function MyCard(props) {

    var fundId=props.fundId;
    var companyId=props.companyId;
    var managerId=props.managerId;
    var totalAmount=props.totalAmount;
    var currentAmount=props.currentAmount;
    var startDate=props.startDate;
    var endDate=props.endDate;
    var fundStyle=props.fundStyle;
    var morningstaType=props.morningstaType;
    
    // setFundId("신한")

    return (
        <div class="card text" style={{width: 700, height: 200, float: 'left', margin :'10px'}}>
            <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs">
                  <h5 class="card-title">[{companyId}] {fundId}</h5>
                </ul>
            </div>
            <div style={{display: 'flex'}}>
            <div class="card-body" style={{display: 'flex'}}>

                    <div>
                        <p class={styles.cardList} >Fund Manager <br/>{managerId}</p>
                        <p class={styles.cardList} > 펀드 스타일 {fundStyle}</p>
                        {/* <p class={styles.cardList} > 모닝스타 타입 {morningstaType}</p> */}
                    </div>

                    <div style={{ marginLeft: 100 }}>
                        <p class={styles.cardList} > 시작 일자 {startDate}</p>
                        <p class={styles.cardList} > 마감 일자 {endDate}</p>
                    </div>
                    <div style={{ marginLeft: 100 }}>
                        <p class={styles.cardList} style={{ color: 'red' }} > 목표 금액 {totalAmount}</p>
                        <p class={styles.cardList} > 현재 금액 {currentAmount}</p>
                    </div>
            </div>
            <div  class="card-body" style={{textAlign: 'right'}} >
                <Popup trigger={<button> 펀딩하기</button>} position="left center">
                    <div ><Funding fundId={fundId} companyId={companyId} managerId={managerId} totalAmount={totalAmount} currentAmount={currentAmount} startDate={startDate} endDate={endDate} fundStyle={fundStyle} morningstaType={morningstaType}/></div>
                </Popup>
            </div>
            </div>
        </div>
    )
}

export default MyCard