import 'react-calendar/dist/Calendar.css';
import './HabitCalendar.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
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



export default function HabitCalendar({ isOpen, habit, accessToken, onClose }) {
    
    const [value, onChange] = useState<Value>(new Date());
    const [datesToAddClassTo, setDatesToAddClassTo] = useState([]);

    useEffect(() => {
        if (habit != null) {
            getDatesToAddToClassArray(habit.progress);
        }  
    }, [habit]);

    function getDatesToAddToClassArray(progress) {
    
        let result = [];
    
        progress.forEach((day) => {
            if (day.done == 0){
                return;
            }
    
            const date = day.date.split("-");
    
            result.push(new Date(date[0], date[1], date[2]))
        });
    
        setDatesToAddClassTo(result);
    }

    

    function tileClassName({ date, view }) {
        // Add class to tiles in month view only
        if (view === 'month') {
            // Check if a date React-Calendar wants to check is on the list of dates to add class to
            if (datesToAddClassTo.find(dDate => isSameDay(dDate, date))) {
                return 'dayDoneCalendarClass';
            }
        }
    }

    function loadProgress(startDate) {
        const offset = startDate.getTimezoneOffset();
        startDate = new Date(startDate.getTime() - (offset*60*1000));
        startDate = startDate.toISOString().split('T')[0];

        console.log('load progress for month starting at: ' + startDate)

        axios.get('/api/habit/load-progress/' + habit.id, {
            headers: {
              'Authorization': 'Bearer ' + accessToken
            },
            params: {
                startDate: startDate,
            }
        })
        .then(response => {
            console.log('progress data returned: ', response.data);

            getDatesToAddToClassArray(response.data);
        })
        .catch(error => {
            console.error(error);
        });
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
                    onActiveStartDateChange={({ action, activeStartDate, value, view }) => loadProgress(activeStartDate)}
                />
            </IonContent>
        </IonModal>

    );
}

