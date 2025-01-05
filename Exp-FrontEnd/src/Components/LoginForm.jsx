import React, { useState } from 'react'
import axios from 'axios'
import '../App.css'
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const lgnbtnclick = (e) => {
        e.preventDefault();
        if (userId === '' || password === '') {
            alert('Both fields are required.');
            return;
        }
        axios.post('http://localhost:9000/checkUser', {
            userId: userId,
            password: password
        }).then((res) => {
            if (res.data) {
                console.log("Login Success")
                console.log(res.data);
                navigate(`/dashboard/${res.data.userId}`);
            } else {
                alert('Invalid UserID or Password.');
            }
        }).catch((err) => {
            console.log(err);
            alert('An error occurred. Please try again.');
        });
        setUserId('');
        setPassword('');
    }

    return (
        <div className='loginBox'>
            <form>
                <div className='loginTotalBox'>
                    <p className='LoginFormHead'>Login Form</p>
                    <label>UserID <span style={{ color: "red" }}>*</span></label>
                    <input type="text" placeholder="Enter UserID" name='UserId' value={userId}
                        onChange={(e) => setUserId(e.target.value)} />
                    <label>Password <span style={{ color: "red" }}>*</span></label>
                    <input type="password" placeholder="Enter Password" name='password' value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className='lgnbtn' onClick={lgnbtnclick}>Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm