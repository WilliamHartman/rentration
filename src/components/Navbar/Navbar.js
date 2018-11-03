import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import "./Navbar.css";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import { withRouter } from "react-router";
import { MdMenu } from 'react-icons/md';
//import logo from '../../assets/weightprojection.png';
import { getUserData } from './../../redux/reducer';
import Button from '@material-ui/core/Button';
 

class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false
        }

        this.handleInput = this.handleInput.bind(this);
    }

    handleToggle = () => this.setState({ open: !this.state.open });

    handleClose = () => this.setState({ open: false });

    componentDidMount() {
        this.props.getUserData();
    }

    handleInput(e) {
        this.setState({ searchTerm: e.target.value });
    }

    drawerMenuItems = () => {
        if(this.props.user.user_id){
            return (
                <div className='navbar-mobile-menu'>
                    <MdMenu
                        size={60}
                        color='#ffffff'                         
                        onClick={this.handleToggle}
                    />
                    <Drawer
                        docked={false}
                        width={200}
                        open={this.state.open}
                        openSecondary={true}
                        onRequestChange={(open) => this.setState({open})}
                        containerClassName='drawer'
                        >
                        <Link to='/' className='link'><MenuItem onClick={this.handleClose} className='menu-item'>Home</MenuItem></Link>
                        <Link to='/account' className='link'><MenuItem onClick={this.handleClose} className='menu-item'>Account</MenuItem></Link>
                        <Link to='/about' className='link'><MenuItem onClick={this.handleClose} className='menu-item'>About</MenuItem></Link>
                        <a href={"http://localhost:8086/auth/logout"} className='link'><MenuItem onClick={this.handleClose} className='menu-item'>Logout</MenuItem></a>
                    </Drawer>
                </div>
            )
        } else {
            return (
                <div className='navbar-mobile-menu'>
                    <a href={'http://localhost:8086/auth'} className='navbar-login-a'>
                        <div className="navbar-login-button">
                            Login
                        </div>
                    </a>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="Navbar">
                <div className='navbar-left'>
                    <Link to='/' className='link' style={{textDecoration: 'none'}}>
                        <div className='navbar-logo'>
                            Rent Ration
                        </div>
                    </Link>
                </div>
                <div className='navbar-right'>
                    {this.drawerMenuItems()}
                    {/* <div className="desktop-menu">
                        <Link to='/' className='link'><div className='navbar-menu-home'>Home</div></Link>
                        <Link to='/about' className='link'><div className='navbar-menu-about'>About</div></Link>
                    </div> */}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.reducer.user
    }
  }
  
export default withRouter(connect(mapStateToProps, { getUserData })(Navbar));