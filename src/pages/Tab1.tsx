import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Habits from '../components/Habits';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Today</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Today</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Habits name="Today" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
