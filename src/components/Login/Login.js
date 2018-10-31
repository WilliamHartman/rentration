import React, { Component } from 'react';
import './Login.css';
import { getUserData } from './../../redux/reducer';
import { withRouter } from "react-router";
import { connect } from "react-redux";


class Login extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user.user_id){
            this.props.history.push('/');
        }
    }

    render (){
        return (
            <div className="Login">
                Login
                <a href={process.env.REACT_APP_LOGIN}>
                    <div className="Button_Login" ><p>L0GIN</p></div>
                </a>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.reducer.user
    }
  }
  
export default withRouter(connect(mapStateToProps, { getUserData })(Login));