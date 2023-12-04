import {useState, useEffect} from 'react';
import { IonRow, IonCol, IonGrid, IonButton } from '@ionic/react';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

export default function GoogleSignIn(props) {

   // const [loginUrl, setLoginUrl] = useState(null);

    useEffect(() => {
        GoogleAuth.initialize({
            clientId: '115573134563-ivq857r42h71gnqr8cbcujohi46n58ip.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
            grantOfflineAccess: true,
          });
    }, []);

    const signIn = async function () {
        const result = await GoogleAuth.signIn();

        // set TOKEN in local storage
        // set authenticated state
console.log('result', result)
        if (result) {
           // props.login(result);
        }
    };


    return (
        <IonGrid> 
            <IonRow> 
                <IonCol size-md="6" size-lg="5" size-xs="12">
                    <h4>Social Auth</h4>
                </IonCol>
            </IonRow>
            <IonRow> 
                <IonCol size-md="6" size-lg="5" size-xs="12">
                    <IonButton className="login-button" onClick={() => signIn()} expand="block" fill="solid" color="danger">
                        Login with Google
                    </IonButton>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
}
