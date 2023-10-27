import './Habit.css';

import { 
    IonAlert,
    IonButton, IonCheckbox, IonIcon, IonItem, IonLabel 
} from '@ionic/react';

import { addCircleOutline, createOutline, trashOutline } from 'ionicons/icons';


export default function Habit({ habit, onDelete, onMarkCompleted }) {

    console.log(habit);    

    function editHabit(habitId: number){
        console.log("Editing habit ID: " + habitId);
    }

    return (
        <IonItem>
            <IonCheckbox 
                disabled={habit.measurable} 
                checked={habit.progress['2023-10-27'].done}
                onClick={() => onMarkCompleted(habit.id)}
            ></IonCheckbox>
            <IonLabel>{habit.name}</IonLabel>
            {
                habit.measurable == 1 && <>
                    
                    <IonButton 
                        fill="clear"
                    >
                        <IonIcon icon={addCircleOutline}></IonIcon>
                    </IonButton>
                    <IonLabel>
                        Progress: { habit.progress['2023-10-27'].count } / { habit.goal } 
                    </IonLabel>
                </>
            }
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

