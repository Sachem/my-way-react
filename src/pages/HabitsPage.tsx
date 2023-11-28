import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { ellipsisVerticalCircleOutline, home, listOutline, logOutOutline } from 'ionicons/icons';
import { useState } from 'react';

import "@codetrix-studio/capacitor-google-auth";
import { Plugins } from '@capacitor/core';

import Habits from '../components/Habits';
import './HabitsPage.css';

export default function HabitsPage(props) {

  const [appView, setAppView] = useState('home');
console.log('HabitsPage.props.accessToken', props.accessToken);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{appView == 'home' ? 'Today' : 'Recent days'}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => props.logout()}>              
              <IonIcon icon={logOutOutline}></IonIcon>
            </IonButton>
            <IonButton onClick={() => console.log('opening menu...')}>              
              <IonIcon icon={ellipsisVerticalCircleOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Today</IonTitle>
            <IonButtons slot="end">
              <IonButton>Logout</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <Habits appView={appView} accessToken={props.accessToken} />
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonSegment value={appView}>
            <IonSegmentButton value="home" onClick={() => setAppView('home')}>
              <IonIcon icon={home}></IonIcon>
            </IonSegmentButton>
            <IonSegmentButton value="multiple-days" onClick={() => setAppView('multiple-days')}>
              <IonIcon icon={listOutline}></IonIcon>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};


