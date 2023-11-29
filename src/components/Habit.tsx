import './Habit.css';

import { 
    IonAlert,
    IonButton, IonButtons, IonCheckbox, IonCol, IonContent, IonIcon, IonItem, IonLabel, IonPopover, IonRow, IonSelect, IonSelectOption, useIonAlert 
} from '@ionic/react';

import { addCircleOutline, createOutline, trashOutline , checkmark, close, calendarOutline, ellipsisVerticalCircleOutline} from 'ionicons/icons';
import { useState } from 'react';


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

export default function Habit({ habit, appView, onDelete, onMarkCompleted, onChangeProgress, onEditStart, onCalendarOpen }) {

const [presentAlert] = useIonAlert();
const [popoverOpened, setPopoverOpened] = useState(false);


const deleteHabitAlertParams = {
    header: 'Are you sure you want to delete this habit?',
    buttons: [
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
    ]
};

if (appView == 'home') {
    return (
        <IonItem>
            <IonCheckbox 
                disabled={habit.measurable} 
                checked={habit.progress[0].done}
                onClick={() => onMarkCompleted(0)}
            ></IonCheckbox>
            <IonLabel>
                {habit.name}
                {
                habit.measurable == 1 && <> 
                    <br />
                    <IonLabel id={"update-progress-habit-"+habit.id} className="smallGrey">
                        Progress: <b>{ habit.progress[0].progress } / { habit.goal }</b> { habit.unit }
                    </IonLabel>
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
                </>
                }
            </IonLabel>
            <IonButtons slot="end">
                <IonButton 
                    onClick={() => onCalendarOpen(habit)}
                    fill="clear"
                    size='large'
                    className='ion-hide-sm-down'
                >
                    <IonIcon icon={calendarOutline}></IonIcon>
                </IonButton>
                <IonButton 
                    onClick={() => onEditStart(habit)}
                    fill="clear"
                    size='large'
                    className='ion-hide-sm-down'
                >
                    <IonIcon icon={createOutline}></IonIcon>
                </IonButton>
                <IonButton 
                    onClick={() => presentAlert(deleteHabitAlertParams)}
                    fill="clear"
                    size='large'
                    className='ion-hide-sm-down'
                >
                    <IonIcon icon={trashOutline}></IonIcon>
                </IonButton>
                <IonButton 
                    id={"open-menu-habit-" + habit.id}
                    onClick={() => setPopoverOpened(true)}
                    className='ion-hide-md-up'
                >
                    <IonIcon icon={ellipsisVerticalCircleOutline}></IonIcon>
                </IonButton>
                <IonPopover trigger={"open-menu-habit-" + habit.id} isOpen={popoverOpened}>
                    <IonContent class="ion-padding">
                        <IonItem onClick={() => {onCalendarOpen(habit);setPopoverOpened(false)}}>
                            <IonIcon icon={calendarOutline}></IonIcon>&nbsp;Calendar
                        </IonItem>
                        <IonItem onClick={() => {onEditStart(habit);setPopoverOpened(false)}}>
                            <IonIcon icon={createOutline}></IonIcon>&nbsp;Edit
                        </IonItem> 
                        <IonItem 
                            onClick={() => {presentAlert(deleteHabitAlertParams);setPopoverOpened(false)}}
                        >
                            <IonIcon icon={trashOutline}></IonIcon>&nbsp;Delete
                        </IonItem>
                    </IonContent>
                </IonPopover>
            </IonButtons>
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
