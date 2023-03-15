import { useEffect, useState } from 'react';

import * as userService from './services/userService';

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import './App.css';
import { UserList } from "./components/UserList";


function App() {
    const [users, setUsers] = useState([]);
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        imageUrl: '',
        country: '',
        city: '',
        street: '',
        streetNumber: '',
    });
    const [formErrors, setFormsErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        imageUrl: '',
        country: '',
        city: '',
        street: '',
        streetNumber: '',
    })

    const formChangeHandler = (e) => {

        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    const formValidate = (e) => {
        const value = e.target.value;
        const errors = {};

        if (e.target.name === 'firstName' && (value.length < 3 || value.length > 20)) {
            errors.firstName = 'First name should be between 3 and 20 characters!';
        };

        if (e.target.name === 'lastName' && (value.length < 3 || value.length > 20)) {
            errors.lastName = 'Last name should be between 3 and 20 characters!';
        };

        if (e.target.name === 'email' && !/^[A-Za-z0-9_\.]+@[A-Za-z]+\.[A-Za-z]{2,3}$/.test(value)) {
            errors.email = 'Email is not valid';
        };

        if (e.target.name === 'phoneNumber' && !/^0[1-9]{1}[0-9]{8}$/.test(value)) {
            errors.phoneNumber = 'Phone number is not valid!';
        };

        if (e.target.name === 'imageUrl' && !/^https?:\/\/.+/.test(value)) {
            errors.imageUrl = 'ImageUrl is not valid!';
        };

        if (e.target.name === 'country' && value.length < 2) {
            errors.country = 'Country should be at least 2 characters long!';
        };

        if (e.target.name === 'city' && value.length < 3) {
            errors.city = 'City should be at least 3 characters long!';
        };

        if (e.target.name === 'street' && value.length < 3) {
            errors.street = 'Street should be at least 3 characters long!';
        };

        if (e.target.name === 'streetNumber' && Number(value) < 1) {
            errors.streetNumber = 'Street number should be a positive number!';
        };

        setFormsErrors(errors);
    }

    useEffect(() => {
        // async function getUsers() {
        //   const users = await userService.getAll();
        //   return users
        // };
        // getUsers()
        userService.getAll()
            .then(setUsers)
            // .then(users => {
            //     setUsers(users);
            // })
            .catch(err => {
                console.log('Error' + err);
            })
    }, []);

    const onUserCreate = async (e) => {
        //stop automatic form submit
        e.preventDefault();
        //take form data from DOM tree
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        //send ajax request to server
        const result = await userService.createUser(data);
        //if successfull add new user to the state
        setUsers(state => [...state, result])
    };

    const onUserUpdateSubmit = async (e, userId) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        const updatedUser = await userService.updateUser(userId, data);

        setUsers(state => state.map(x => x._id === userId ? updatedUser : x))
    }

    const onUserDelete = async (userId) => {
        //delete from server
        await userService.deleteUser(userId)
        //delete from state
        setUsers(state => state.filter(x => x._id !== userId));
    }

    return (
        <>
            <Header />
            <main className="main">
                <section className="card users-container">
                    <Search />
                    <UserList
                        users={users}
                        onUserCreate={onUserCreate}
                        onUserUpdateSubmit={onUserUpdateSubmit}
                        onUserDelete={onUserDelete}
                        formValues={formValues}
                        formChangeHandler={formChangeHandler}
                        formErrors={formErrors}
                        formValidate={formValidate}
                    />
                </section>
            </main>
            <Footer />
        </>
    );
}

export default App;
