import { useEffect, useState } from 'react';

import * as userService from './services/userService';

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import './App.css';
import { UserList } from "./components/UserList";


function App() {
    const [users, setUsers] = useState([]);

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
        setUsers(state => [...state, result.user])
    };

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
                        onUserDelete={onUserDelete}
                    />
                </section>
            </main>
            <Footer />
        </>
    );
}

export default App;
