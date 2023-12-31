import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';

import "@codetrix-studio/capacitor-google-auth";

import './AuthPage.css';
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';
import { Redirect, Route } from 'react-router-dom';


import Login from '../components/auth/Login';
import Registration from '../components/auth/Registration';
import GoogleSignIn from '../components/auth/GoogleSignIn';
import GoogleCallback from '../components/auth/GoogleCallback';

export default function AuthPage(props) {

  const signIn = async function () {
    const result = await GoogleAuth.signIn();

    // set TOKEN in local storage
    // set authenticated state

    if (result) {
      props.login(result);
    }
  };


    useEffect(() => {
        GoogleAuth.initialize({
            clientId: '115573134563-ivq857r42h71gnqr8cbcujohi46n58ip.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
            grantOfflineAccess: true,
          });
    }, []);

  return (
    <IonPage>
        <IonHeader>
            <IonToolbar color="primary">
                <IonTitle><b>My Way</b></IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <Route exact path='/auth'>
                <GoogleSignIn />
                <Login login={props.login} />
            </Route>
            <Route path='/auth/registration'>
              <Registration login={props.login} />
            </Route>
            <Route path="/auth/google-callback">
              <GoogleCallback googleLogin={props.googleLogin} />
            </Route>     
            {/* 
            TODO: THIS IS THE ONE WORKING WITH CAPACITOR PLUGIN, 
            TODO: WORK ON IT NEXT
            <IonButton className="login-button" onClick={() => signIn()} expand="block" fill="solid" color="danger">
                Login with Google
            </IonButton> */}
        </IonContent>
    </IonPage>
  );
}