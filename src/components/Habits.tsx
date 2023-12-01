import './Habits.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AddEditHabit from '../components/AddEditHabit';
import Habit from '../components/Habit';


import { IonContent, IonList, IonButton, IonGrid, IonRow, IonCol, IonItem } from '@ionic/react';
import HabitCalendar from './HabitCalendar';


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
 

export default function Habits(props) {

    const [loadingHabits, setLoadingHabits] = useState(true);
    const [habits, setHabits] = useState<Habit[]>([]);
    const [dates, setDates] = useState<ProgressDate[]>([]);
    const [habitCategories, setHabitCategories] = useState([]);
    const [habitUnits, setHabitUnits] = useState([]);
    const [addEditHabitModalOpened, setAddEditHabitModalOpened] = useState(false);
    const [editedHabit, setEditedHabit] = useState<null | Habit>(null);
    const [habitCalendarModalOpened, setHabitCalendarModalOpened] = useState(false);
    const [calendarHabit, setCalendarHabit] = useState<null | Habit>(null);

    // console.log("appView: " + props.appView);
    // console.log("Habits.props.accessToken: " + props.accessToken);

    let config = { // TODO: move to some shared config 
        headers: {
          'Authorization': 'Bearer ' + props.accessToken
        }
    }

    useEffect(() => {
        axios.get('/api/habits', config) // TODO: read API endpoint from some shared config
        .then(response => {
            setHabits(response.data.data);
            setDates(response.data.meta.dates);
            setLoadingHabits(false);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        axios.get('/api/habit/meta', config)
        .then(response => {
            setHabitCategories(response.data.categories);
            setHabitUnits(response.data.units);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);


    const onAddEditHabitSubmit = data => {

        console.log("add/edit habit");
        
        if (editedHabit == null) {
            // create new habit
            axios.post('/api/habits', data, config)
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
            axios.put('/api/habits/' + editedHabit.id, data, config)
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

        axios.delete('/api/habits/' + habitId, config)
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

        axios.post('/api/habit/mark-completed/' + habit.id, data, config)
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
        
        axios.post('/api/habit/change-progress/' + habit.id, data, config)
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

    function openCalendar(habit: Habit)
    {
        console.log("opening calendar for habit: " + habit.name);
        setHabitCalendarModalOpened(true);
        setCalendarHabit(habit);
    }

    console.log(dates);
    console.log(habits);

    return (
        <>
            <IonContent color="light">
            {
            loadingHabits
            ?
            <IonList>
                <IonItem>
                    Loading...
                </IonItem>
            </IonList>
            :
            (
                habits.length == 0
                ?
                <IonList>
                    <IonItem>
                        <p>No habits yet, <a style={{cursor:'pointer'}} onClick={() => {setEditedHabit(null); setAddEditHabitModalOpened(true);}}>add one</a> now.</p>
                    </IonItem>
                </IonList>
                :
                (
                    props.appView == 'home' 
                    ? 
                    <IonList className="ion-no-padding">
                        {habits.map(habit => (
                            <Habit
                                key={habit.id}
                                habit={habit}
                                appView={props.appView}
                                onDelete={() => deleteHabit(habit.id)}
                                onMarkCompleted={(dateIndex: number) => markHabitCompleted(habit, 0)}
                                onChangeProgress={(dateIndex: number, progress: number) => changeHabitProgress(habit, 0, progress)}
                                onEditStart={(habit: Habit) => startEditHabit(habit)}
                                onCalendarOpen={(habit: Habit) => openCalendar(habit)}
                            /> 
                        ))}
                    </IonList>
                    : 
                    <IonList className="ion-no-padding">
                        <IonItem>
                        <div className='multiDayWrapper'>
                            <div className='habitNamesColumn'>
                                <table className='habitsTable habitNamesTable'>
                                    <tr><td>&nbsp;</td></tr>
                                    {habits.map(habit => (
                                        <tr key={habit.id}>
                                            <td key="name">
                                                <div>
                                                {habit.name}
                                                {
                                                    habit.measurable == 1 &&
                                                    <>
                                                        <br />
                                                        <span>Goal: {habit.goal}</span>
                                                    </>
                                                }
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className='habitProgressColumn'>
                                <table className='habitsTable habitProgressTable'>
                                    <tr>
                                        {dates.map((date, index) => (
                                            <td key={index}>{date.dayOfWeek}<br /><span>{date.dayInMonth}</span></td> 
                                        ))}
                                    </tr>
                                    {habits.map(habit => (
                                        <Habit
                                            key={habit.id}
                                            habit={habit}
                                            appView={props.appView}
                                            onDelete={() => deleteHabit(habit.id)}
                                            onMarkCompleted={(dateIndex: number) => markHabitCompleted(habit, dateIndex)}
                                            onChangeProgress={(dateIndex: number, progress: number) => changeHabitProgress(habit, dateIndex, progress)}
                                            onEditStart={(habit: Habit) => startEditHabit(habit)}
                                        /> 
                                    ))}
                                </table>
                            </div>
                        </div>
                        </IonItem>
                    </IonList>
                )
            )
            }           
            </IonContent>

            <AddEditHabit 
                isOpen={addEditHabitModalOpened}  
                habit={editedHabit}
                habitCategories={habitCategories} 
                habitUnits={habitUnits} 
                onClose={() => {setEditedHabit(null); setAddEditHabitModalOpened(false);}} 
                onSubmit={(data) => onAddEditHabitSubmit(data)} 
            />
            <HabitCalendar 
                isOpen={habitCalendarModalOpened}  
                habit={calendarHabit}
                onClose={() => {setCalendarHabit(null); setHabitCalendarModalOpened(false);}} 
            />
            <IonButton 
                shape="round" 
                className="addHabit ion-hide-md-down" 
                onClick={() => {setEditedHabit(null); setAddEditHabitModalOpened(true);}}
            >+</IonButton>
            <IonButton 
                shape="round" 
                className="addHabitSmall ion-hide-md-up" 
                onClick={() => {setEditedHabit(null); setAddEditHabitModalOpened(true);}}
            >+</IonButton>
        </>
    );
}
