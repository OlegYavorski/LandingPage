import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import Backdrop from "./components/Backdrop/Backdrop";
import Button from './components/Button/Button';
import Modal from "./components/Modal/Modal";
import Input from './components/Input/Input';

class App extends Component {
  
   state = {
    // isAuth: true,
    isAuth: false,
    authMode: "login",
    error : null 
    //error: 'Test for error'
  };

  constructor() {
    super();
    // this.client = Stitch.initializeDefaultAppClient("processstudio-lwtbf");
    console.log('constructor !!!')
    // this.client.callFunction('Greet', ['Max']);
  }

  
  inputChangeHandler = (event, input) => {
    this.setState({ [input]: event.target.value });
  };

  errorHandler = message => {
    this.setState({
      error: message
    });
  };

render() {  
  return (
    <div className="App">
      <header className="App-header">

        <Backdrop show={!!this.state.error} />
        <Button type="button">Okay1</Button>

        <img src={logo} className="App-logo" alt="logo" />
        <a className="App-link" href = "E:\GitHub\LandingPage">E:\GitHub\LandingPage\</a>
        <a className="App-link" href="E:\landingpage">E:\landingpage</a>
        <a className="App-link" href="E:\MyMongoDB">E:\MyMongoDB</a>
        <a className="App-link" href="E:\MongoUdemyMax/18\stitch-01-starting-code">E:\MongoUdemyMax/18\stitch-01-starting-code</a>
        
      </header>
      <Modal
          open={!!this.state.error}
          title="An Error Occurred"
          onClose={() => this.errorHandler(null)}
        >
          <p>{this.state.error}</p>
        </Modal>

        <Input
            label="E-Mail"
            config={{ type: 'email' }}
            onChange={event => this.inputChangeHandler(event, 'email')}
          />

    </div>
  );
}
}
export default App;
