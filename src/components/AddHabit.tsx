import './AddHabit.css';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { 
    IonContent, IonModal, IonHeader, IonButton, IonToolbar, IonButtons, IonTitle, IonInput, 
    IonSelect, IonSelectOption, IonItem, IonList, IonNote, IonLabel, IonToggle, IonBadge 
} from '@ionic/react';

export default function AddHabit({ isOpen, habitCategories, onClose, onSubmit }) {

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
		reValidateMode: "onChange",
        defaultValues: {
            measurable: 0,
            name: "",
            category_id: null,
            goal: ""
        }
    });

    function setMeasurableValue(data: number){
        setMeasurable(data);
        setValue("measurable", data ? 1 : 0 ); 
    }

    const onAddHabit = data => {
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

    return (
        <IonModal isOpen={isOpen} >
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Create New Habit</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onModalClose}>Close</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList lines="none">
                    <form onSubmit={ handleSubmit(onAddHabit) }>
                    <input 
                        value="0"
                        type="hidden"
                        {...register("measurable")}
                    />
                    <IonItem className='addHabitFormItem'>
                        <IonInput
                             {...register("name", { required: true, maxLength: 30 })}
                            class="text-input"
                            label="Habit Title" 
                            placeholder="Enter habit title"
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
                            onIonChange={e => setMeasurableValue(e.detail.checked)}
                        >
                            <IonLabel>Is habit Measurable?</IonLabel>
                            <IonNote color="medium">(leave unchecked for a simple "Yes / No")</IonNote>
                        </IonToggle>
                    </IonItem>
                    { measurable &&
                        <IonItem className='addHabitFormItem'>
                            <IonInput
                                {...register("goal", { required: true })}
                                class="text-input"
                                label="Goal" 
                                placeholder="Enter quantity"
                            ></IonInput>
                            { errors.goal && <IonBadge color="danger">Required</IonBadge> }
                        </IonItem>
                    }
                    <IonItem className='submitItem'>
                        <IonButton
                            type="submit"
                            size='large'
                            className="submitAddHabit"
                        >Add Habit</IonButton>
                    </IonItem>
                    </form>
                </IonList>
            </IonContent>
        </IonModal>

    );
}

