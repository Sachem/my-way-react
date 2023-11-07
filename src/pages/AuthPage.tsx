import { IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { home, listOutline } from 'ionicons/icons';
import { useState } from 'react';

import './AuthPage.css';

export default function AuthPage() {


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Auth Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Auth</IonTitle>
          </IonToolbar>
        </IonHeader>
        <p>
            here will be a login / register form...
        </p>
      </IonContent>
     
    </IonPage>
  );
};


