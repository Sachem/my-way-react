import 'react-calendar/dist/Calendar.css';
import './HabitCalendar.css';

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { differenceInCalendarDays } from 'date-fns';

import { 
    IonContent, IonModal, IonHeader, IonButton, IonToolbar, IonButtons, IonTitle
} from '@ionic/react';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function isSameDay(a, b) {
    return differenceInCalendarDays(a, b) === 0;
}

function getDatesToAddToClassArray(habit) {
    console.log("calendar habit.progress:", habit.progress);

    let result = [];

    habit.progress.forEach((day) => {
        if (day.done == 0){
            return;
        }

        const date = day.date.split("-");

        result.push(new Date(date[0], date[1], date[2]))
    });

    return result;
}

export default function HabitCalendar({ isOpen, onClose, habit }) {
    
    const [value, onChange] = useState<Value>(new Date());

    if (habit == null)
    {
        return;
    }

    const datesToAddClassTo = getDatesToAddToClassArray(habit);

    function tileClassName({ date, view }) {
        // Add class to tiles in month view only
        if (view === 'month') {
            // Check if a date React-Calendar wants to check is on the list of dates to add class to
            if (datesToAddClassTo.find(dDate => isSameDay(dDate, date))) {
                return 'dayDoneCalendarClass';
            }
        }
    }

    

    return (
        <IonModal 
            isOpen={isOpen} 
        >
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Calendar for {habit ? habit.name : ''}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => onClose()}>Close</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <Calendar
                    onChange={onChange}
                    tileClassName={tileClassName}
                />
            </IonContent>
        </IonModal>

    );
}

