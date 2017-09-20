import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(){
    super()
    this.state = {
      loginAuth: {
        success: true,
        text: 'Login',
        class: 'login-button'
      },
      dataAuth: {
        authorized: true,
        text: 'Button',
        class: 'button'
      },
      data: [],
      username: '',
      password: '',
      token: ''
    }
  }

  

  handleChange(value, prop){
    var obj = {}
    obj[prop] = value
    this.setState(obj)
  }
  login(){
    var login = {
      username: this.state.username,
      password: this.state.password
    }
    axios.post('/api/login', login).then(res => {
      this.setState({


        // Here, if the login is successful, we save our token for later use
        token: res.data,


        loginAuth: {
          success: false,
          text: 'Welcome, User',
          class: 'login-button'
        }

      })
    }).catch(err => {
      if(this.state.loginAuth.success){
        this.setState({
          loginAuth: {
            success: false,
            text: 'Login Failed',
            class: 'login-button button-disabled'
          },
          username: '',
          password: ''
        
        }, () => {
          setTimeout(()=>{
            this.setState({
              loginAuth: {
                success: true,
                text: 'Login',
                class: 'login-button'
              }
            })
          }, 1000)
        })
      }


      
    })
  }

  getData(){
    // Here, the GET request is passing our token as a query to the server
    axios.get(`/api/getdata?token=${this.state.token}`).then((res)=>{
      this.setState({
        data: res.data
      })
    }).catch((err)=>{
      if(this.state.dataAuth.authorized){
        this.setState({
          
          dataAuth: {
            authorized: false,
            text: 'Not Authorized, try logging in',
            class: 'button button-disabled'
    
          }
        }, () => {
          setTimeout(()=>{
            this.setState({
              dataAuth: {
                authorized: true,
                text: 'Button',
                class: 'button'
              }
            })
          }, 2000)
        })
      }
    })
    
  }

  render() {
    const data = this.state.data.map(function(elem, i){
      return <p key={i}>{elem}</p>
    })
    
    return (
      <div >
        <div className='header'>
          <h1>Amazing Data Inc.</h1>

        </div>
        <div className="login">
          <input value={this.state.username} placeholder="Username" onChange={e=> this.handleChange(e.target.value, 'username')}/>
          <input value={this.state.password} placeholder="Password" onChange={e=> this.handleChange(e.target.value, 'password')}/>
          <div className={this.state.loginAuth.class} onClick={() => this.login()}>{this.state.loginAuth.text}</div>
        </div>
        <div className="content">
          <h2>Press the button to get some data</h2>
          <div className={this.state.dataAuth.class} onClick={() => this.getData()}><h3>{this.state.dataAuth.text}</h3></div>
          <div className="data-container">{data}</div>
        </div>
      </div>
    );
  }
}

export default App;
