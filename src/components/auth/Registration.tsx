import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { IonButton, IonCol, IonGrid, IonInput, IonItem, IonRow } from '@ionic/react';

export default function Registration(props) {
    const [registered, setRegistered] = React.useState(false);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

console.log("registered", registered);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('/sanctum/csrf-cookie')
            .then(response => {
                console.log("response1@ ", response);
                //axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
                axios.post('/register', {
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: confirmPassword
                })
                .then(response => {
                    if (response.status === 201) {
                        setRegistered(true);
                        props.login(response.data.name);
                    }
                }).catch(error => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);

                        if (error.response.status == 422)
                        {
                            alert(error.response.data.message);
                        }
                    } 
                });
            });
    }

    return (  
        <>
        {
            registered ?    
            <Redirect to="/login"/>
        :
        <IonGrid>
            <IonRow color="primary" justify-content-center>
                <IonCol align-self-center  size-md="6" size-lg="5" size-xs="12">
                    <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                        <h4>Create an account</h4>
                        
                        <IonItem>
                            <IonInput type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} placeholder="your name" required="" />
                        </IonItem>
                        <IonItem>
                            <IonInput type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@company.com" required="" />
                        </IonItem>
                        <IonItem>
                            <IonInput type="password" name="password" id="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required="" />
                        </IonItem>
                        <IonItem>
                            <IonInput type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required="" />
                        </IonItem>
        
                        <IonButton size="large" type="submit" expand="block">Sign Up</IonButton>
                    </form>
                    <p className="text-sm font-light text-white">
                        Already have an account? <a href="/auth" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                    </p>
                </IonCol>
            </IonRow>
        </IonGrid>
        }
        </>
    );
}