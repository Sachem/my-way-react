import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { IonRow, IonCol, IonGrid } from '@ionic/react';
import GoogleButton from 'react-google-button';

export default function GoogleSignIn() {

    const [loginUrl, setLoginUrl] = useState(null);

    useEffect(() => {
        axios.get('/api/auth/socialite/google')
        .then((response) => {
            setLoginUrl( response.data.url )
        })
        .catch((error) => console.error(error));
    }, []);

    return (
        <IonGrid> 
            <IonRow justify-content-center> 
                <IonCol align-self-center size-md="6" size-lg="5" size-xs="12">
                    {
                    loginUrl != null && 
                        <a href={loginUrl}>
                            <GoogleButton type="light" />
                        </a>
                    }
                </IonCol>
            </IonRow>
        </IonGrid>
    );
}
