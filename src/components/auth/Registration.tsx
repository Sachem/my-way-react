import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

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
        <section>
        {
            registered ?    
            <Redirect to="/login"/>
        :
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-indigo-600 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                            <input 
                                type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} placeholder="your name" required=""
                                className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input 
                                type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@company.com" required=""
                                className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input 
                                type="password" name="password" id="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required=""
                                className="border border-gray-300 text-gray-600 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input 
                                type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required=""
                                className="border border-gray-300 text-gray-600 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
        
                        <button type="submit" className="w-full text-white  bg-secondary hover:bg-secondary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                        <p className="text-sm font-light text-white">
                            Already have an account? <a href="/auth" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        }
        </section>
    );
}