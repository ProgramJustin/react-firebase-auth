import React, { Component } from 'react';
import {
   Link,
   withRouter,
 } from 'react-router-dom';

import * as routes from '../constants/routes';
import { auth, db } from '../firebase';

// functional component
const SignUpPage = ({ history }) =>
  <div>
    <h1>Sign Up Page</h1>
    <SignUpForm history={history} />
  </div>

  // default state
  const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

  // dynamic key value pair for changing the state when user inputs credentials
  const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

  class SignUpForm extends Component {
    constructor(props) {
      super(props);
      this.state = { ...INITIAL_STATE };
    }


    onSubmit = (event) => {
      // You will only need one password property, because both password strings should be the same after the validation anyway.
      const {
        username,
        email,
        passwordOne,
      } = this.state;

      // history is passed in by props
      const {
        history,
      } = this.props;

      // create authenticated user
      auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
      // create user in database, and then redirect user to home page
      db.doCreateUser(authUser.uid, username, email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
    })
    .catch(error => {
      this.setState(byPropKey('error', error));
    });

      event.preventDefault()
    }

    render() {
      // deconstruct object
      const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;
      // validation
      const isInvalid =
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        username === '';

      return (
        <form onSubmit={this.onSubmit}>
          <input
            value={username}
            onChange={event => this.setState(byPropKey('username', event.target.value))}
            type="text"
            placeholer="Full Name"
            />
          <input
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholer="Email Address"
            />
          <input
            value={passwordOne}
            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
            type="password"
            placeholer="Password"
            />
          <input
            value={passwordTwo}
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type="password"
            placeholer="Confirm Password"
            />
          <button disabled={isInvalid} type="submit">
            Sign Up
          </button>

          { error && <p>{error.message}</p> }

        </form>
      );
    }
  }

  // page for signing up if you don't have an account
  const SignUpLink = () =>
    <p>
      Dont't have an account?

      {' '}
      <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>

// Any component which goes in the withRouter() higher order component gets access to all the properties of the router.
export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink
}
