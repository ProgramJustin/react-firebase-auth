// higher order component
import React from 'react';
import { connect } from 'react-redux';

import { firebase } from '../firebase';

// This component  takes a component in as an argument, in this case App component will be passed in as an argument, check out App.js
const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    // when the component mounts
    componentDidMount() {
      const { onSetAuthUser } = this.props;

      // call firebase method that changes the state of the user when the user becomes authenticated or not
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? onSetAuthUser(authUser)
          : onSetAuthUser(null);
      });
    }

    // renders wrapped component, in this case it is App.js component withAuthentication(App)
    render() {
      return (
        <Component />
      );
    }
  }
  // method that takes in dispatch method, it sends an object through the reducer to the state and sets the state of the authUser
  const mapDispatchToProps = (dispatch) => ({
    onSetAuthUser: (authUser) => dispatch({ type: 'AUTH_USER_SET', authUser }),
  });

  // returns connect() method that communicates actions to the state with authentication
  return connect(null, mapDispatchToProps)(WithAuthentication);
}


export default withAuthentication;
