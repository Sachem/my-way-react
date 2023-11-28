import React from 'react';
import axios from 'axios';
import { IonButton, IonCol, IonGrid, IonInput, IonItem, IonRow } from '@ionic/react';
 
export default function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const handleSubmit = (e) => {
        console.log("logging in....");
        e.preventDefault();
        axios.get('/sanctum/csrf-cookie')
            .then(response => {
                axios.post('login', {
                    email: email,
                    password: password
                })
                .then(response => {
                    if (response.status === 200) {
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

        <IonGrid>
            <IonRow>
                <IonCol size-md="6" size-lg="5" size-xs="12">
                <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                    
                    <h4>Login Form</h4>
                
                    <IonItem>
                        <IonInput type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@company.com" required=""></IonInput>
                    </IonItem>
    

                    <IonItem>
                        <IonInput type="password" name="password" id="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required=""></IonInput>
                    </IonItem>
                
                    <IonButton size="large" type="submit" expand="block">Login</IonButton>
                </form>
                <p className="text-sm font-light text-white">
                    Don’t have an account yet? <a href="/auth/registration" className="font-medium text-primary-600 hover:underline text-primary-500">Sign up</a>
                </p>
                </IonCol>
            </IonRow>
        </IonGrid>
    
    );
}