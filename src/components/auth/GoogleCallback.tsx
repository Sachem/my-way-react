import React, {useState, useEffect} from 'react';
import {useLocation} from "react-router-dom";
import axios from 'axios';

export default function GoogleCallback(props: {googleLogin}) {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [user, setUser] = useState(null);
    const location = useLocation();

    console.log('here!');

    // On page load, we take "search" parameters 
    // and proxy them to /api/auth/callback on our Laravel API
    useEffect(() => {
        axios.get(`/api/auth/socialite/google/callback${location.search}`, {
            // headers : {
            //     'Content-Type': 'application/json',
            //     'Accept': 'application/json'
            // }
        })
        .then((response) => {
            console.log('response', response);
            setLoading(false);
            setData(response.data);

            props.googleLogin(response.data);
        });
    }, []);

    // Helper method to fetch User data for authenticated user
    // Watch out for "Authorization" header that is added to this call
    function fetchUserData() {
        axios.get(`/api/user`, {
           // 'Authorization': 'Bearer ' + data.access_token,
        })
        .then((response) => {
            setUser(response.data);
        });
    }

    if (loading) {
        return <DisplayLoading/>
    } 
    else {
        return <div></div>
    }
    // else {
    //     if (user != null) {
    //         return <DisplayData data={user}/>
    //     } else {
    //         return (
    //             <div>
    //                 <DisplayData data={data}/>
    //                 <div style={{marginTop:10}}>
    //                     <button onClick={fetchUserData}>Fetch User</button>
    //                 </div>
    //             </div>
    //         );
    //     }
    // }
}

function DisplayLoading() {
    return <div>Loading....</div>;
}

function DisplayData(data: any) {
    return (
        <div>
            <samp>{JSON.stringify(data, null, 2)}</samp>
        </div>
    );
}