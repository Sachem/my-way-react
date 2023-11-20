import React, {useState, useEffect} from 'react';
import axios from 'axios';

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
        <div>
            {loginUrl != null && (
                <a href={loginUrl}>Socialite Google Sign In</a>
            )}
        </div>
    );
}
