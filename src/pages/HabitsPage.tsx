import { IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { home, listOutline } from 'ionicons/icons';
import { useState } from 'react';

import Habits from '../components/Habits';
import './HabitsPage.css';

export default function HabitsPage() {

  const [appView, setAppView] = useState('home');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{appView == 'home' ? 'Today' : 'Recent days'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Today</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Habits appView={appView} />
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


