import React from 'react';
import ReactDOM from 'react-dom';
import { Home, Dashboard, SignIn, SignUp, Profile, Season, PlayerTeam } from './components'; 
import reportWebVitals from './reportWebVitals';
import './styles.css'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { FirebaseAppProvider, AuthCheck } from 'reactfire'; 
import 'firebase/auth'; 
import { firebaseConfig } from './firebaseConfig' 



ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Provider store = { store }>
    <Router>
      <Switch>

        <Route exact path='/'>
          <Home title={'The Dugout'}/>
        </Route>

        <Route path='/dashboard'>
          <Dashboard ></Dashboard>
        </Route>

        <Route path='/season'>
          <Season ></Season>
        </Route>

        <Route path='/signin'>
          <SignIn></SignIn>
        </Route>

        <Route path='/profile'>
          <Profile></Profile>
        </Route>

        <Route path='/playerteam'>
          <PlayerTeam></PlayerTeam>
        </Route>

        <Route path='/signup'>
          <SignUp></SignUp>
        </Route>

      </Switch>
    </Router>
    </Provider>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();