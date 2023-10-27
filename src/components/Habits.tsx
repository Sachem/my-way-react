import './Habits.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AddHabit from '../components/AddHabit';
import Habit from '../components/Habit';


import { IonContent, IonItem, IonLabel, IonList, IonButton, IonIcon, IonAlert } from '@ionic/react';


interface ContainerProps {
     name: string;
}

interface Habit {
     id: number;
     name: string;
}
 

const Habits: React.FC<ContainerProps> = ({ name }) => {

    const [habits, setHabits] = useState<Habit[]>([]);
    const [habitCategories, setHabitCategories] = useState([]);
    const [addHabitModalOpened, setAddHabitModalOpened] = useState(false);

    const token = '6|ITI2rMrjW04dgvoRT0SvKeIorEOIvt4np9vuHoUU08c30be0'; // TODO: remove hardcoded, when auth done

    let config = { // TODO: move to some shared config 
        headers: {
          'Authorization': 'Bearer ' + token
        }
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/habits', config) // TODO: read API endpoint from some shared config
        .then(response => {
            setHabits(response.data);
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


    const onAddHabitSubmit = data => {

        console.log("YES");
        console.log(data);

        axios.post('http://127.0.0.1:8000/api/habits', data, config)
            .then(response => {
                console.log("POSTed");
                console.log(response.data);
                
                setHabits([
                    ...habits,
                    { 
                        id: response.data.id, 
                        name: data.name 
                    }
                ]);

                setAddHabitModalOpened(false);
            })
            .catch(error => {
                console.error(error);
            });
    
    }

    function onHabitDelete(habitId: number){
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
    
    return (
        <>
            <IonContent color="light">
                <IonList inset={true}>
                {habits.map(habit => (
                    <Habit
                        key={habit.id}
                        habit={habit}
                        onDelete={() => onHabitDelete(habit.id)}
                    /> 
                ))}
                </IonList>
            </IonContent>
            <AddHabit 
                isOpen={addHabitModalOpened} 
                habitCategories={habitCategories} 
                onClose={() => setAddHabitModalOpened(false)} 
                onSubmit={(data) => onAddHabitSubmit(data)} 
            />
            <IonButton 
                shape="round" 
                className="addHabit" 
                onClick={() => setAddHabitModalOpened(true)}
            >+</IonButton>
        </>
    );
}

export default Habits;
