import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Habits from '../components/Habits';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Last Week</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Last Week</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Habits name="Last Week" />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
