import './Habit.css';

import { 
    IonAlert,
    IonButton, IonCheckbox, IonIcon, IonItem, IonLabel 
} from '@ionic/react';

import { addCircleOutline, createOutline, trashOutline } from 'ionicons/icons';


export default function Habit({ habit, onDelete, onMarkCompleted, onChangeProgress }) {

    function editHabit(habitId: number){
        console.log("Editing habit ID: " + habitId);
    }

    return (
        <IonItem>
            <IonCheckbox 
                disabled={habit.measurable} 
                checked={habit.progress[0].done}
                onClick={() => onMarkCompleted(habit.id, 0)}
            ></IonCheckbox>
            <IonLabel>{habit.name}</IonLabel>
            {
                habit.measurable == 1 && <>
                    
                    <IonButton 
                        fill="clear"
                        id={"update-progress-habit-"+habit.id}
                    >
                        <IonIcon icon={addCircleOutline}></IonIcon>
                    </IonButton>
                    <IonAlert
                        trigger={"update-progress-habit-"+habit.id}
                        header="What is your progress today?"
                        buttons={[
                            {
                                text: 'Cancel',
                                role: 'cancel',
                            },
                            {
                                text: 'OK',
                                role: 'confirm',
                                handler: (alertData) => { //takes the data 
                                    onChangeProgress(0, alertData.progress);
                                },
                            }
                        ]}
                        inputs={[
                        {
                            name: 'progress',
                            type: 'number',
                            placeholder: 'Progress',
                            min: 0,
                            value: habit.progress[0].progress
                        },
                        ]}
                    ></IonAlert>
                    <IonLabel>
                        Progress: { habit.progress[0].progress } / { habit.goal } 
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

