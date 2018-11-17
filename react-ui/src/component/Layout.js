import React, { Component } from 'react';
import io from 'socket.io-client';

const socketUrl = "localhost:3231"
class Layout extends Component {
    constructor(props){
        super(props);
        this.state = {
            socket:null,
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
  render() {
    return (
      <div>
        <h1>Layout</h1>
        
      </div>
    );
  }
}

export default Layout;
