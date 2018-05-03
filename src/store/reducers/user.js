const INITIAL_STATE = {
  users: {},
};

// method takes two args, state and action: it passes an object with with key value pairs of state and action
const applySetUsers = (state, action) => ({
  ...state,
  users: action.users
});

// this reducer calls the method above
function userReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'USERS_SET' : {
      return applySetUsers(state, action);
    }
    default : return state;
  }
}

export default userReducer;
