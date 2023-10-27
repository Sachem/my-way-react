import './Habit.css';

import { 
    IonAlert,
    IonButton, IonIcon, IonItem, IonLabel 
} from '@ionic/react';

import { createOutline, trashOutline } from 'ionicons/icons';


export default function Habit({ habit, onDelete }) {

    console.log(habit);    

    function editHabit(habitId: number){
        console.log("Editing habit ID: " + habitId);
    }

    return (
        <IonItem>
            <IonLabel>{habit.name}</IonLabel>
            <IonButton 
                onClick={() => editHabit(habit.id)}
                fill="clear"
                slot='end'
                size='large'
            >
                <IonIcon icon={createOutline}></IonIcon>
            </IonButton>
            <IonButton 
                id={"alert-delete-habit-" + habit.id} 
                fill="clear"
                slot='end'
                size='large'
            >
                <IonIcon icon={trashOutline}></IonIcon>
            </IonButton>
            <IonAlert
                header="Are you sure you want to delete this habit?"
                trigger={"alert-delete-habit-" + habit.id} 
                buttons={[
                    {
                        text: 'No',
                        role: 'cancel',
                        handler: () => {
                            console.log('Alert canceled');
                        },
                    },
                    {
                        text: 'Yes',
                        role: 'confirm',
                        handler: () => {
                            onDelete(habit.id);
                        },
                    },
                ]}
                onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
            ></IonAlert>
        </IonItem>

    );
}

