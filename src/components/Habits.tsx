import './Habits.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AddHabit from '../components/AddHabit';

import { IonContent, IonItem, IonLabel, IonList, IonButton } from '@ionic/react';


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

    const token = '6|ITI2rMrjW04dgvoRT0SvKeIorEOIvt4np9vuHoUU08c30be0';

    let config = { // TODO: refactor / move to one place
        headers: {
          'Authorization': 'Bearer ' + token
        }
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/habits', config)
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
                                    
                    <IonItem key={habit.id}>
                        <IonLabel>{habit.name}</IonLabel>
                    </IonItem>
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
