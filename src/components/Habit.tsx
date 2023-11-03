import './Habit.css';

import { 
    IonAlert,
    IonButton, IonCheckbox, IonCol, IonIcon, IonItem, IonLabel, IonRow 
} from '@ionic/react';

import { addCircleOutline, createOutline, trashOutline , checkmark, close} from 'ionicons/icons';


function HabitProgressMultipleDayView({habit, day, index, onMarkCompleted, onChangeProgress}){

    if (habit.measurable == 1){
        return (
            <>
            <IonButton 
                fill="clear"
                size='small'
                id={"update-progress-habit-"+habit.id+"-day-"+index}
            >
                {day.progress}
            </IonButton>
            <IonAlert
                trigger={"update-progress-habit-"+habit.id+"-day-"+index}
                header="Update progress"
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                    },
                    {
                        text: 'OK',
                        role: 'confirm',
                        handler: (alertData) => {
                            onChangeProgress(alertData.progress);
                        },
                    }
                ]}
                inputs={[
                {
                    name: 'progress',
                    type: 'number',
                    placeholder: 'Progress',
                    min: 0,
                    value: habit.progress[index].progress
                },
                ]}
            ></IonAlert>
            </>
        );
    } else {
        if (day.done == 1) {
            return (
                <IonIcon 
                    onClick={() => onMarkCompleted()}
                    icon={checkmark}
                ></IonIcon>
            );
        } else {
            return (
                <IonIcon 
                    onClick={() => onMarkCompleted()}
                    icon={close}
                ></IonIcon>
            );
        }
    }
}

export default function Habit({ habit, appView, onDelete, onMarkCompleted, onChangeProgress, onEditStart }) {

if (appView == 'home') {
    return (
        <IonItem>
            <IonCheckbox 
                disabled={habit.measurable} 
                checked={habit.progress[0].done}
                onClick={() => onMarkCompleted(0)}
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
                                handler: (alertData) => {
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
                onClick={() => onEditStart(habit)}
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
} else {
    return (
        <IonRow>
            
            <IonCol size="2" key="name">
                {habit.name}
                {
                    habit.measurable == 1 &&
                    <>
                        <br />
                        <span>Goal: {habit.goal}</span>
                    </>
                }
            </IonCol>

            {
                habit.progress.map((day, index) => (
                    <IonCol key={index}>
                        <HabitProgressMultipleDayView 
                            habit={habit} 
                            day={day} 
                            index={index} 
                            onMarkCompleted={() => onMarkCompleted(index)} 
                            onChangeProgress={(progress) => onChangeProgress(index, progress)} 
                        />
                    </IonCol>
                ))
                
            }
        </IonRow>

    );    
}
}
