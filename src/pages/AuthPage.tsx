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

  return (
    <IonPage>
        <IonHeader>
            <IonToolbar color="primary">
                <IonTitle><b>My Way</b></IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <Route exact path='/auth'>
                <GoogleSignIn login={props.login} />
                <Login login={props.login} />
            </Route>
            <Route path='/auth/registration'>
              <Registration login={props.login} />
            </Route>
            <Route path="/auth/google-callback">
              <GoogleCallback googleLogin={props.googleLogin} />
            </Route>     
            
        </IonContent>
    </IonPage>
  );
}