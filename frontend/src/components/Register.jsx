import React, { useState } from 'react';
import "../index.css";

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const fullName = `${firstName} ${lastName}`;
    
        const response = await fetch('http://127.0.0.1:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: fullName,
                username,
                password,
            }),
        });
    
        const data = await response.json();
    
        console.log(data);
    };

    return (
        <div className="h-screen p-12 px-24 bg-[#fefefe] flex justify-center">
            <div className="h-full register-col z-10 shadow-2xl bg-white w-[70%]">
                <div className="h-full w-full flex flex-col items-center px-5">
                    <div className="flex justify-center flex-col items-center">
                        <h1 className="text-[60px] font-bold">Join Marketify</h1>
                        <p>Create your Account</p>
                    </div>
                    <div className="">
                        <form onSubmit={handleSubmit}>
                            <div className="flex mt-12 justify-between min-w-full gap-8">
                                <div className="flex flex-col">
                                    <label htmlFor="firstName" className="pl-2">First Name</label>
                                    <input type="text" id="firstName" placeholder="First Name" required className="rounded-xl bg-[#f3f4f8] p-2 border-2 font-medium" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="lastName" className="pl-2">Last Name</label>
                                    <input type="text" id="lastName" placeholder="Last Name" required className="rounded-xl bg-[#f3f4f8] p-2 border-2 font-medium" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>

                            <div className="mt-4 flex flex-col">
                                <label htmlFor="username" className="pl-2">Username</label>
                                <input type="text" id="username" placeholder="Username" required className="rounded-xl bg-[#f3f4f8] p-2 border-2 font-medium" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>

                            <div className="mt-4 flex flex-col">
                                <label htmlFor="password" className="pl-2">Password</label>
                                <input type="password" id="password" placeholder="Enter password" required className="rounded-xl bg-[#f3f4f8] p-2 border-2 font-medium" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div className="mt-4 flex flex-col">
                                <label htmlFor="confirmPassword" className="pl-2">Confirm Password</label>
                                <input type="password" id="confirmPassword" placeholder="Confirm password" required className="rounded-xl bg-[#f3f4f8] p-2 border-2 font-medium" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>

                            <div className="mt-8 flex justify-center">
                                <button type="submit" className="bg-[#ffbe30] px-4 py-2 rounded-3xl text-lg font-bold w-1/2">Get Started</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="bg-stocks bg-cover bg-no-repeat">
                </div>
            </div>
        </div>
    );
}

export default Register;