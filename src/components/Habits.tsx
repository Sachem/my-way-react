import './Habits.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AddHabit from '../components/AddHabit';

import { IonContent, IonItem, IonLabel, IonList, IonButton, IonIcon, IonAlert } from '@ionic/react';
import { createOutline, trashOutline } from 'ionicons/icons';


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

    function editHabit(habitId: number){
        console.log("Editing habit ID: " + habitId);
    }

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
    
    return (
        <>
            <IonContent color="light">
                <IonList inset={true}>
                {habits.map(habit => (
                                    
                    <IonItem key={habit.id}>
                        <IonLabel>{habit.name}</IonLabel>
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
                                    handler: () => {
                                        console.log('Alert canceled');
                                    },
                                },
                                {
                                    text: 'Yes',
                                    role: 'confirm',
                                    handler: () => {
                                        deleteHabit(habit.id);
                                    },
                                },
                            ]}
                            onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
                        ></IonAlert>
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
