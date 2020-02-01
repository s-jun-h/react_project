import React, {Fragment, useState, Component} from 'react'
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import './MyNavbar.css';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { NavLink } from 'react-router-dom';
import RootRouter from '../routers/RootRouter'

import { connect } from 'react-redux';
import { logIn, logOut, regEmail } from '../store/loginState';


class MyNavbar extends Component{

    constructor(props){
        super(props);
        this.state = {
        }
    }

    handleLogOut = () => {
        this.props.logOut();
        this.props.regEmail("");
    }

    render() {
        // console.log(this.props.logedIn)
        // return(
        //     <div>
		// 		<Link href="/" style={{fontSize : '22px'}}>samohamo&nbsp;&nbsp;&nbsp;&nbsp;</Link>
        //         <Link href="fundInfo" style={{marginLeft : '1100px'}} >내 펀드 관리&nbsp;&nbsp;&nbsp;&nbsp;</Link>
		// 		<Link onClick={this.handleLogOut} style={{marginLeft : '40px'}}>log out</Link>
		// 	</div>
        // )

        return(
            <Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/" style={{fontSize : "24px"}}>&nbsp;&nbsp;In-PEF</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"/>
                <Nav>
                    {
                        <diuv>
                            <div style ={{display:'flex', marginRight : "12px"}}>
                                <Nav.Link href="fundInfo">나의 펀드목록</Nav.Link>
                                <Nav.Link onClick={this.handleLogOut}>Log Out</Nav.Link>
                            </div>
                            
                        </diuv>
                    }
                {/* <button type="submit" style={{width:100, height:30}} onClick={handleSubmit}>로그인뷰</button> */}
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            <RootRouter/>
            </Fragment>
            )
    }
}

const mapStateToProps = state => ({  //2
    logedIn : state.loginState.logedIn,
    upperUserEmail : state.loginState.userEmail,
});

const mapDispatchToProps = dispatch => {
    return {
      logIn : () => dispatch(logIn()),
      regEmail : email => dispatch(regEmail(email)),
      logOut : () => dispatch(logOut())
    }
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(MyNavbar);