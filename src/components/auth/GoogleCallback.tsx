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
        axios.get(`/api/auth/socialite/google/callback${location.search}`)
        .then((response) => {
            setLoading(false);
            setData(response.data);

            props.googleLogin(response.data);
        });
    }, []);

    if (loading) {
        return <div>Loading....</div>
    } 
    else {
        return <div></div>
    }
}
