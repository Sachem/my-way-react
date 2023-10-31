import './Habits.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AddEditHabit from '../components/AddEditHabit';
import Habit from '../components/Habit';


import { IonContent, IonItem, IonLabel, IonList, IonButton, IonIcon, IonAlert } from '@ionic/react';


interface ContainerProps {
    name: string;
}

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
}
 

const Habits: React.FC<ContainerProps> = ({ name }) => {

    const [habits, setHabits] = useState<Habit[]>([]);
    const [dates, setDates] = useState<ProgressDate[]>([]);
    const [habitCategories, setHabitCategories] = useState([]);
    const [addEditHabitModalOpened, setAddEditHabitModalOpened] = useState(false);
    const [editedHabit, setEditedHabit] = useState<null | Habit>(null);

    const token = '6|ITI2rMrjW04dgvoRT0SvKeIorEOIvt4np9vuHoUU08c30be0'; // TODO: remove hardcoded, when auth done

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

    function markHabitCompleted(habit: Habit, date: string){

        let isChecked = habit.progress[0].done;
        isChecked = ! isChecked;

        console.log("marking habit ID: " + habit.id+ " as "+(isChecked ? '' : 'not ')+"completed");

        const data = {
            'date': dates[0],
            'done': isChecked
        };
        
        axios.post('http://127.0.0.1:8000/api/habit/mark-completed/' + habit.id, data, config)
            .then(response => {
                console.log("request successful, response: "+response.data);

                let respHabit = response.data;
                const nextHabits = habits.map((h, i) => {
                    if (h.id === respHabit.id) {
                        respHabit.progress[0].done = isChecked;
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

    function changeHabitProgress(habit: Habit, date: string, progress: number){

        console.log("changing progress of habit ID: " + habit.id+ " to "+progress);

        const data = {
            'date': dates[0],
            'progress': progress
        };
        
        axios.post('http://127.0.0.1:8000/api/habit/change-progress/' + habit.id, data, config)
            .then(response => {
                console.log("request successful, response: "+response.data);

                let respHabit = response.data;
                const nextHabits = habits.map((h, i) => {
                    if (h.id === respHabit.id) {
                        respHabit.progress[0].progress = progress;
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
                <IonList inset={true}>
                {habits.map(habit => (
                    <Habit
                        key={habit.id}
                        habit={habit}
                        onDelete={() => deleteHabit(habit.id)}
                        onMarkCompleted={(date: string) => markHabitCompleted(habit, date)}
                        onChangeProgress={(date: string, progress: number) => changeHabitProgress(habit, date, progress)}
                        onEditStart={(habit: Habit) => startEditHabit(habit)}
                    /> 
                ))}
                </IonList>
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

export default Habits;
