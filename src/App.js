import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import ProductItem from './components/Products/ProductItem/ProductItem';
import { Link } from 'react-router-dom';
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/Header/Header";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import ProductsPage from "./pages/Product/Products";
import ProductPage from "./pages/Product/Product";
import EditProductPage from "./pages/Product/EditProduct";
import AuthPage from "./pages/Auth/Auth";
import ConfirmAccountPage from "./pages/Auth/ConfirmAccount";

import Header2 from './components2/Header2/Header2';
import Main from './components2/Main/Main';

import {
  Stitch,
  UserPasswordAuthProviderClient,
  UserPasswordCredential
} from "mongodb-stitch-browser-sdk";


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
    this.client = Stitch.initializeDefaultAppClient("processstudio-lwtbf");
    console.log('constructor !!!')
    //this.client.callFunction('Greet', ['Max']);
  }
  
  authHandler = (event, authData) => {
    event.preventDefault();
    if (authData.email.trim() === "" || authData.password.trim() === "") {
      return;
    }
    let request;

    const emailPassClient = this.client.auth.getProviderClient(
      UserPasswordAuthProviderClient.factory
    );

    if (this.state.authMode === "login") {
      const credential = new UserPasswordCredential(
        authData.email,
        authData.password
      );
      request = this.client.auth.loginWithCredential(credential);
    } else {
      request = emailPassClient.registerWithEmail(
        authData.email,
        authData.password
      );
    }

    request
      .then(result => {
        console.log(result);
        if (result){
          this.setState({isAuth : true});
        }
      })
      .catch(err => {
        console.log(err);
        this.errorHandler("An error occurred.");
        console.log(err);
        this.setState({ isAuth: false });
      });    
  };

  authModeChangedHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "login" ? "signup" : "login"
      };
    });
  };


  // logoutHandler = () => {
  //   this.setState({ isAuth: false });
  // };

  // productDeleteHandler = productId => {
  //   alert('productDeleteHandler')
  // };

  // inputChangeHandler = (event, input) => {
  //   this.setState({ [input]: event.target.value });
  // };

  errorHandler = message => {
    this.setState({
      error: message
    });
  };

  render() {
    let routes = (
      <Switch>
        <Redirect from="/" to="/products" exact />
        <Redirect from="/auth" to="/products" exact />
        <Redirect from="/signup" to="/products" exact />
        <Route
          path="/product/:mode"
          render={props => (
            <EditProductPage {...props} onError={this.errorHandler} />
          )}
        />
        <Route
          path="/products/:id/:mode"
          render={props => (
            <EditProductPage {...props} onError={this.errorHandler} />
          )}
        />
        <Route
          path="/products/:id"
          render={props => (
            <ProductPage {...props} onError={this.errorHandler} />
          )}
        />
        <Route
          path="/products"
          render={props => (
            <ProductsPage {...props} onError={this.errorHandler} />
          )}
        />
      </Switch>
    );

    if (!this.state.isAuth) {
      routes = (
        <Switch>
          <Redirect from="/" to="/auth" exact />
          <Redirect from="/products" to="/auth" />
          <Redirect from="/product" to="/auth" />
          <Route path="/confirm-account" component={ConfirmAccountPage} />
          <Route
            path="/auth"
            render={() => (
              <AuthPage
                mode={this.state.authMode}
                onAuth={this.authHandler}
                onAuthModeChange={this.authModeChangedHandler}
              />
            )}
          />
        </Switch>
      );
    }

    return (
      <div className="App">
        <Modal
          open={!!this.state.error}
          title="An Error Occurred"
          onClose={() => this.errorHandler(null)}
        >
          <p>{this.state.error}</p>
        </Modal>
        <Backdrop show={!!this.state.error} />
        <Header
          authenticated={this.state.isAuth}
          onLogout={this.logoutHandler}
        />
        {routes}
      </div>
    );
  }

render2() {  
  return (
    <div className="App">

    <div>
      <Header2 />
      <Main />
    </div>
    
      <header className="App-header">

        <Backdrop show={!!this.state.error} />
        {/* <Button type="button">Okay1</Button> */}

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

        {/* <Input
            label="E-Mail"
            config={{ type: 'email' }}
            onChange={event => this.inputChangeHandler(event, 'email')}
          /> */}
       
       
{/* 
 <ProductItem
              key="_id"
              id="_id"
              title="name"
              text="description"
              price="price"
              imageUrl="image"
              onDelete={this.productDeleteHandler}
           
      /> */}
     

    </div>
  );
}
}
export default App;
