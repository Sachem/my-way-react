import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { addCircleOutline, ellipsisVerticalCircleOutline, home, listOutline, logOutOutline } from 'ionicons/icons';
import { useState } from 'react';

import "@codetrix-studio/capacitor-google-auth";
import { Plugins } from '@capacitor/core';

import Habits from '../components/Habits';
import './HabitsPage.css';

export default function HabitsPage(props) {

  const [appView, setAppView] = useState('home');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><b className="themeBlue">My Way</b> - {appView == 'home' ? 'Today' : 'Recent days'}</IonTitle>
          <IonButtons slot="end">
            {/* <IonButton onClick={() => {console.log('TODO: add adding habit from here');}}>              
              <IonIcon icon={addCircleOutline}></IonIcon>
            </IonButton> */}
            <IonButton onClick={() => props.logout()}>              
              <IonIcon className="themeBlue" icon={logOutOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
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


