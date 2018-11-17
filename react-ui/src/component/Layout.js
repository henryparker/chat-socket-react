import React, { Component } from 'react';
import io from 'socket.io-client';
import {USER_CONNECTED,LOGOUT} from '../Events';
import LoginForm from './LoginForm';
const socketUrl = "localhost:3231"
class Layout extends Component {
    constructor(props){
        super(props);
        this.state = {
            socket:null,
            user:null
        }
    }
    componentWillMount(){
        this.initSocket()
    }
    initSocket = ()=>{
        const socket = io(socketUrl)
        socket.on('connect', ()=>{
            console.log("Connected")
        })
        this.setState({socket})
    }

    setUser = (user)=>{
        const {socket} = this.state
        socket.emit(USER_CONNECTED,user);
        this.setState({user})
    }

    logout =()=>{
        const {socket} = this.state
        socket.emit(LOGOUT)
        this.setState({user:null})
    }
  render() {
      const socket = this.state.socket
    return (
      <div className="container">
          <LoginForm socket ={socket} setUser={this.setUser}/>
        <h1>Layout</h1>
        
      </div>
    );
  }
}

export default Layout;
