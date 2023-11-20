import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { LogoutIcon } from '@heroicons/react/outline';

const LogoutButton = (props) => {

    const logout = () => {
        axios.post('http://0.0.0.0/logout')
        .then(response => {
            if (response.status === 204) {
                props.logout();
            }
        }).catch(error => {
            // TODO: handle error
        });
    }

    return (
        <button
            onClick={() => logout()} 
            className='text-white hover:bg-indigo-600 hover:bg-opacity-75 group flex items-center px-2 py-2 text-base font-medium rounded-md'
        >
            <LogoutIcon className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300" aria-hidden="true" />
            Log Out
        </button>
    );
};

LogoutButton.propTypes = {

};

export default LogoutButton;    
