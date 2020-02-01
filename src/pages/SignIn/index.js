import React, {useState, Component}from 'react'
import Popup from 'react-popup'
// import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './style.css'
// import 'bootstrap/dist/js/bootstrap.min.css'

import { connect } from 'react-redux';
import { logIn, regEmail, setUserType } from '../../store/loginState';
import { Link } from 'react-router-dom';

class SignIn extends Component
{
    constructor(props){
        super(props);
        this.state = {
            userEmail : "",
            password : "",
        }
    }

    handleSubmit = (e) => {
        if(this.state.userEmail === "" || this.state.password === "") return;
        fetch("http://13.125.242.200:8551/login", {
            method: 'POST',
            body: JSON.stringify({
                'userEmail':this.state.userEmail,
                'userPassword':this.state.password
            }),
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},         
        })
        .then(res => res.json())
        .then(resJson => {
            if(resJson.status === 'success'){
                // user type receive too ?
                this.props.logIn();
                this.props.regEmail(this.state.userEmail);
                this.props.setUserType(resJson.userType)

                // go to main page
                console.log('login', this.props.logedIn)
                console.log('email', this.props.upperUserEmail)
                console.log('usertype', this.props.upperUserType)
                //window.location='/'   
            }
            else{ // fail
                //<Popup>login fail!</Popup>
            }
        })
        e.preventDefault();
    }

    handleEmailEdit = (e) => {
        this.setState({userEmail : e.target.value})
    }

    handlePasswdEdit = (e) => {
        this.setState({password : e.target.value})
    }
  
    // handleSubmitEmail(e) {
    //     this.setState({userEmail : e.target.value})
    // }   

    // handleSubmitPwd(e) {
    //     this.setState({password : e.target.value})
    // }

    render(){
        return (
            <div className="layout">
            <form>
            <h3>Sign In</h3>
            
            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" onChange={this.handleEmailEdit} />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" onChange={this.handlePasswdEdit} />
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Sign In</button>
            <div style={{height:"7px"}}/>
            <Link to="/signup"><button type="submit" className="btn btn-primary btn-block">Sign Up</button></Link>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>
        </div>
        );
    }
}

const mapStateToProps = state => ({  //2
    logedIn : state.loginState.logedIn,
    upperUserEmail : state.loginState.userEmail,
    upperUserType : state.loginState.userType,
});

const mapDispatchToProps = dispatch => {
    return {
      logIn : () => dispatch(logIn()),
      regEmail : email => dispatch(regEmail(email)),
      setUserType : type => dispatch(setUserType(type)),

    }
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(SignIn);


// function SignIn(props) {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
  
//     function validateForm() {
//       return email.length > 0 && password.length > 0;
//     }
  
//     function handleSubmit(event) {
//         fetch("http://13.125.242.200:8551/login", {
//             method: 'POST',
//             body: JSON.stringify({
//                 'userEmail':email,
//                 'userPassword':password
//             }),
//             headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},         
//         })
//         .then(res => res.json())
//         .then(resJson => {
//             if(resJson.status === 'success'){
//                 // localStorage => login : true
//                 // => localStorage.email = email
//                 // go to main page
//             }
//             else{ // fail
//                 //<Popup>login fail!</Popup>
//             }
//         })
//         .then(resJson => console.log(resJson.status));
       
//       event.preventDefault();
//     }

//     function handleSubmitPwd(e) {
//         setPassword(e.target.value);
//         console.log(password)
//     }

//     function handleEmailEdit(e) {
//         setEmail(e.target.value);
//         console.log(email)
//     }

//     function handlePasswdEdit(e) {
//         setPassword(e.target.value);
//         console.log(password)
//     }
  
//     function handleSubmitEmail(e) {
//         setEmail(e.target.value);
//         console.log(email)
//     }    

//     return (
//         <div className="layout">
//         <form>
//         <h3>Sign In</h3>
        
//         <div className="form-group">
//             <label>Email address</label>
//             <input type="email" className="form-control" placeholder="Enter email" onChange={handleEmailEdit} />
//         </div>

//         <div className="form-group">
//             <label>Password</label>
//             <input type="password" className="form-control" placeholder="Enter password" onChange={handlePasswdEdit} />
//         </div>

//         <div className="form-group">
//             <div className="custom-control custom-checkbox">
//                 <input type="checkbox" className="custom-control-input" id="customCheck1" />
//                 <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
//             </div>
//         </div>

//         <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>Submit</button>
//         <p className="forgot-password text-right">
//             Forgot <a href="#">password?</a>
//         </p>
//     </form>
//     </div>
//     );
//   }

