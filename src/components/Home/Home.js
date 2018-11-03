import React, { Component } from 'react';
import './Home.css';
import { getUserData, getUserBills } from './../../redux/reducer';
import { withRouter } from "react-router";
import { connect } from "react-redux";


class Home extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }

    componentDidMount = () => {
        if(!this.props.user.user_id){
            console.log('Not authorized. Redirecting to Login page.')
            this.props.history.push('/login');
        } else {
            this.props.getUserBills(this.props.user.user_id);
        }
    }
    
    

    render(){
        console.log('Home for user: ', this.props.user)
        return (
            <div className="Home">
                <div className='home-welcome'>
                    Welcome {this.props.user.given_name} {this.props.user.family_name}
                </div>
                <div className='home-current-month'>
                    Due this month: ${0}
                </div>
                <div className='home-next-month'>
                    Due next month: ${1500.00}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log(state.reducer.userBills)
    return {
        user: state.reducer.user,
        userBills: state.reducer.userBills
    }
  }
  
export default withRouter(connect(mapStateToProps, { getUserData, getUserBills })(Home));