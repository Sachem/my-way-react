import './AddEditHabit.css';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { 
    IonContent, IonModal, IonHeader, IonButton, IonToolbar, IonButtons, IonTitle, IonInput, 
    IonSelect, IonSelectOption, IonItem, IonList, IonNote, IonLabel, IonToggle, IonBadge 
} from '@ionic/react';

export default function AddEditHabit({ isOpen, habitCategories, habitUnits, onClose, onSubmit, habit }) {

    const [measurable, setMeasurable] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState,
        formState: { errors, isSubmitSuccessful },
    } = useForm({
        mode: "onTouched",
		//reValidateMode: "onChange",
        defaultValues: {
            measurable: 0,
            name: "",
            category_id: null,
            unit_id: null,
            goal: ""
        }
    });

    function setMeasurableValue(data: boolean){
        setMeasurable(data);
        setValue("measurable", data ? 1 : 0); 
    }

    useEffect(() => {
        console.log("EFFECT. Edited habit: ", habit);

        if (habit == null) {
            setValue("name", ""); 
            setValue("category_id", null); 
            setValue("unit_id", null); 
            setValue("measurable", 0); 
            setValue("goal", ""); 
            
            setMeasurable(false);
        }
        else {
            setValue("name", habit.name); 
            setValue("category_id", habit.category_id); 
            setValue("unit_id", habit.unit_id); 
            setValue("measurable", habit.measurable); 
            setValue("goal", habit.goal); 

            setMeasurable(habit.measurable == 1);
        }
    }, [habit]);

    const onAddEditHabit = data => {
        setMeasurableValue(false);
        onSubmit(data);
    }
    
    React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset();
        }
    }, [formState, reset])

    function onModalClose(){
        onClose();
        reset();
    }

    const onDidDismiss = () => {
        onModalClose();
    }

    return (
        <IonModal 
            isOpen={isOpen} 
            onDidDismiss={onDidDismiss}
        >
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{habit == null ? 'Create New Habit' : 'Edit Habit'}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onModalClose}>Close</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList lines="none">
                    <form onSubmit={ handleSubmit(onAddEditHabit) }>
                    <input 
                        value="0"
                        type="hidden"
                        {...register("measurable")}
                    />
                    <IonItem className='addHabitFormItem'>
                        <IonLabel>Habit Title</IonLabel>
                        <IonInput
                             {...register("name", { required: true, maxLength: 30 })}
                            class="text-input"
                            placeholder="Enter habit title"
                            slot="end"
                        ></IonInput>
                        { errors.name && <IonBadge color="danger">Required</IonBadge> }
                    </IonItem>
                    <IonItem className='addHabitFormItem'>
                        <IonSelect 
                            label="Habit Category" 
                            placeholder="Choose category"
                            {...register("category_id", { required: true })}
                        >
                            {habitCategories.map(category => (
                                 <IonSelectOption key={category.id} value={category.id}>{category.name}</IonSelectOption>
                            ))}
                        </IonSelect>
                        { errors.category_id && <IonBadge color="danger">Required</IonBadge> }
                    </IonItem>
                    <IonItem className='addHabitFormItem'>
                        <IonToggle
                            checked={measurable} 
                            onIonChange={e => setMeasurableValue(e.detail.checked)}
                        >
                            <IonLabel>Is habit Measurable?</IonLabel>
                            <IonNote color="medium">(leave unchecked for "Yes / No")</IonNote>
                        </IonToggle>
                    </IonItem>
                    { measurable &&
                        <>
                        <IonItem className='addHabitFormItem'>
                            <IonLabel>Goal</IonLabel>
                            <IonInput
                                {...register("goal", { required: true })}
                                class="text-input" 
                                placeholder="Enter quantity"
                                slot="end"
                            ></IonInput>
                            { errors.goal && <IonBadge color="danger">Required</IonBadge> }
                        </IonItem>
                        <IonItem className='addHabitFormItem'>
                            <IonSelect 
                                label="Habit Unit" 
                                placeholder="Choose unit"
                                {...register("unit_id", { required: true })}
                            >
                                {habitUnits.map(unit => (
                                    <IonSelectOption key={unit.id} value={unit.id}>{unit.name}</IonSelectOption>
                                ))}
                            </IonSelect>
                            { errors.unit_id && <IonBadge color="danger">Required</IonBadge> }
                        </IonItem>
                        </>
                    }
                    <IonItem className='submitItem'>
                        <IonButton
                            type="submit"
                            size='large'
                            className="submitAddEditHabit"
                        >{habit == null ? 'Create' : 'Update'}</IonButton>
                    </IonItem>
                    </form>
                </IonList>
            </IonContent>
        </IonModal>

    );
}

