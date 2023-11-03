import './Habits.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AddEditHabit from '../components/AddEditHabit';
import Habit from '../components/Habit';


import { IonContent, IonList, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';


interface Habit {
    id: number;
    name: string;
    category_id: number;
    measurable: number;
    goal: number;
    progress: any;
}

interface ProgressDate {
    date: string;
    dayOfWeek: string;
    dayInMonth: number;
}
 

export default function Habits({ appView }) {

    const [habits, setHabits] = useState<Habit[]>([]);
    const [dates, setDates] = useState<ProgressDate[]>([]);
    const [habitCategories, setHabitCategories] = useState([]);
    const [addEditHabitModalOpened, setAddEditHabitModalOpened] = useState(false);
    const [editedHabit, setEditedHabit] = useState<null | Habit>(null);

    const token = '6|ITI2rMrjW04dgvoRT0SvKeIorEOIvt4np9vuHoUU08c30be0'; // TODO: remove hardcoded, when auth done

    console.log("appView: " + appView);

    let config = { // TODO: move to some shared config 
        headers: {
          'Authorization': 'Bearer ' + token
        }
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/habits', config) // TODO: read API endpoint from some shared config
        .then(response => {
            setHabits(response.data.data);
            setDates(response.data.meta.dates);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/habit/categories', config)
        .then(response => {
            setHabitCategories(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);


    const onAddEditHabitSubmit = data => {

        console.log("add/edit habit");
        
        if (editedHabit == null) {
            // create new habit
            axios.post('http://127.0.0.1:8000/api/habits', data, config)
                .then(response => {
                    console.log("POSTed");
                    console.log(response.data);
                    
                    setHabits([
                        ...habits,
                        response.data
                    ]);

                    setEditedHabit(null);
                    setAddEditHabitModalOpened(false);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            // update existing
            axios.put('http://127.0.0.1:8000/api/habits/' + editedHabit.id, data, config)
                .then(response => {
                    console.log("PUT, habit ID: " + editedHabit.id);
                    console.log(response.data);
                    
                    let respHabit = response.data;
                    const nextHabits = habits.map((h, i) => {
                        if (h.id === respHabit.id) {
                            return respHabit;
                        } 
            
                        return h;
                    });
            
                    setHabits(nextHabits);

                    setEditedHabit(null);
                    setAddEditHabitModalOpened(false);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    
    }

    function startEditHabit(habit: Habit){
        setAddEditHabitModalOpened(true);
        setEditedHabit(habit);
    }

    function deleteHabit(habitId: number){
        console.log("deleting habit ID: " + habitId);

        axios.delete('http://127.0.0.1:8000/api/habits/' + habitId, config)
            .then(response => {
                console.log("DELETED");
                console.log(response.data);
                
                setHabits(
                    habits.filter(h => h.id !== habitId)
                );
            })
            .catch(error => {
                console.error(error);
            });
    }

    function markHabitCompleted(habit: Habit, dateIndex: number){

        let isChecked = habit.progress[dateIndex].done;
        isChecked = ! isChecked;


        const data = {
            'date': dates[dateIndex].date,
            'done': isChecked
        };

        console.log("marking habit ID: " + habit.id+ " as "+(isChecked ? '' : 'not ')+"completed at: " + data.date + "(dateIndex: "+dateIndex+")");

        axios.post('http://127.0.0.1:8000/api/habit/mark-completed/' + habit.id, data, config)
            .then(response => {
                console.log("request successful, response: "+response.data);

                let respHabit = response.data;
                const nextHabits = habits.map((h, i) => {
                    if (h.id === respHabit.id) {
                        respHabit.progress[dateIndex].done = isChecked;
                        return respHabit;
                    } 
        
                    return h;
                });
        
                setHabits(nextHabits);
                
            })
            .catch(error => {
                console.error(error);
            });
    }

    function changeHabitProgress(habit: Habit, dateIndex: number, progress: number){

        console.log("changing progress of habit ID: " + habit.id+ " to "+progress +" at dateIndex: "+dateIndex);

        const data = {
            'date': dates[dateIndex].date,
            'progress': progress
        };

        console.log("changing progress of habit ID: " + habit.id+ " to "+progress +" at: " + data.date + "(dateIndex: "+dateIndex+")");
        
        axios.post('http://127.0.0.1:8000/api/habit/change-progress/' + habit.id, data, config)
            .then(response => {
                console.log("request successful, response: "+response.data);

                let respHabit = response.data;
                const nextHabits = habits.map((h, i) => {
                    if (h.id === respHabit.id) {
                        respHabit.progress[dateIndex].progress = progress;
                        return respHabit;
                    } 
        
                    return h;
                });
        
                setHabits(nextHabits);
                
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <>
            <IonContent color="light">
            {
                appView == 'home' ? (
                    <IonList inset={true}>
                        {habits.map(habit => (
                            <Habit
                                key={habit.id}
                                habit={habit}
                                appView={appView}
                                onDelete={() => deleteHabit(habit.id)}
                                onMarkCompleted={(dateIndex: number) => markHabitCompleted(habit, 0)}
                                onChangeProgress={(dateIndex: number, progress: number) => changeHabitProgress(habit, 0, progress)}
                                onEditStart={(habit: Habit) => startEditHabit(habit)}
                            /> 
                        ))}
                    </IonList>
                ) : (
                    <IonGrid>
                        <IonRow>
                            <IonCol size="2" key="name"></IonCol>
                            {dates.map((date, index) => (
                                <IonCol key={index}>{date.dayOfWeek}<br /><span>{date.dayInMonth}</span></IonCol> 
                            ))}
                        </IonRow>
                        {habits.map(habit => (
                        <Habit
                            key={habit.id}
                            habit={habit}
                            appView={appView}
                            onDelete={() => deleteHabit(habit.id)}
                            onMarkCompleted={(dateIndex: number) => markHabitCompleted(habit, dateIndex)}
                            onChangeProgress={(dateIndex: number, progress: number) => changeHabitProgress(habit, dateIndex, progress)}
                            onEditStart={(habit: Habit) => startEditHabit(habit)}
                        /> 
                    ))}
                    </IonGrid>
                )
            }           
            </IonContent>
            <AddEditHabit 
                isOpen={addEditHabitModalOpened}  
                habit={editedHabit}
                habitCategories={habitCategories} 
                onClose={() => {setEditedHabit(null); setAddEditHabitModalOpened(false);}} 
                onSubmit={(data) => onAddEditHabitSubmit(data)} 
            />
            <IonButton 
                shape="round" 
                className="addHabit" 
                onClick={() => {setEditedHabit(null); setAddEditHabitModalOpened(true);}}
            >+</IonButton>
        </>
    );
}
