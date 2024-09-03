import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserContext from './context.js/UserContext';
import React from 'react';

export const initialState = { token: null, id: null, role: null };
export const USER_ACTION = {
  signIn: 'signIn',
  singOut: 'signOut'
}

const reducer = (state, action) => {
  switch (action.type) {
    case USER_ACTION.signIn: return { ...state, token: action.token, role: action.role, id: action.id }
    case USER_ACTION.signOut: return {
      ...state,
      token: null,
      role: null,
      id: null
    }
    default:
      return null
  }
}

function App() {
  const [user, dispatch] = React.useReducer(reducer, initialState);
  const authContext = React.useMemo(() => ({
    signIn: async (token, role, id) => {

      await dispatch({ type: USER_ACTION.signIn, token: token, role: role, id: id });
    },
    signOut: async () => {
      await dispatch({ type: USER_ACTION.signOut })
    },
    user
  }), [user]);
  return (
    <UserContext.Provider value={authContext}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/register' exact element={<Register />} />
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
