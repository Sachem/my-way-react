import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useState } from 'react';


import AuthPage from './pages/AuthPage';
import HabitsPage from './pages/HabitsPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
/* Tailwind styles */
import './theme/tailwind.css';
import GoogleCallback from './components/auth/GoogleCallback';
setupIonicReact();

export default function App() {
  // sessionStorage.setItem('loggedIn', 'false');

console.log('sessionStorage.loggedIn', sessionStorage.getItem('loggedIn'));
console.log('sessionStorage.accessToken', sessionStorage.getItem('accessToken'));
  const [name, setName] = useState('')
  const [accessToken, setAccessToken] = useState(
      sessionStorage.getItem('accessToken') || ''
  );
  const [loggedIn, setLoggedIn] = useState(
      sessionStorage.getItem('loggedIn') || false
  );
  console.log('loggedIn', loggedIn);

  const login = (result) => {

      setLoggedIn(true);
//      setName('test_name');
      sessionStorage.setItem('loggedIn', 'true');

      // axios.defaults.headers.common['Authorization'] = result.authentication.accessToken;
      setAccessToken(result.authentication.accessToken);
      console.log('result.authentication.accessToken', result.authentication.accessToken);
      sessionStorage.setItem('accessToken', accessToken);


  };
  const logout = () => {
      setLoggedIn(false);
      sessionStorage.setItem('loggedIn', 'false');
  };

  return (

  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/habits">
          <HabitsPage accessToken={accessToken} />
        </Route>
        <Route path="/auth">
          { 
            loggedIn == true
            ? 
            <Redirect to="/habits"/> 
            : 
            <AuthPage loggedIn={loggedIn} login={login} /> 
          } 
        </Route>
        <Route exact path="/">
          { 
            loggedIn == true 
            ? 
            <Redirect to="/habits"/> 
            : 
            <Redirect to="/auth" /> 
          } 
        </Route>
        <Route path="/google">
          <GoogleCallback />
        </Route>  
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  );
}
