import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Habits from '../components/Habits';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recently</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Recently</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Habits name="Recently" />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
