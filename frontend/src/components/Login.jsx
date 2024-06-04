import React, { useState } from 'react';
import "../index.css";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

  return (
    <div className="h-screen p-12 px-24 bg-[#fefefe] flex justify-center">
        <div className="h-full register-col z-10 shadow-2xl bg-white w-[70%]">
            <div className="h-full w-full flex flex-col items-center px-5">
                <div className="flex justify-center flex-col items-center mt-8">
                    <h1 className="text-[40px] font-bold text-center">Welcome Back <br></br> to Marketify</h1>
                    <p>Login your Account</p>
                </div>
                <div className='mt-10 w-3/4'>
                    <form>
                        <div className="mt-4 flex flex-col">
                            <label htmlFor="username" className="pl-2">Username</label>
                            <input type="text" id="username" placeholder="Username" required className="rounded-xl bg-[#f3f4f8] p-2 border-2 font-medium" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        <div className="mt-8 flex flex-col">
                            <label htmlFor="password" className="pl-2">Password</label>
                            <input type="password" id="password" placeholder="Enter password" required className="rounded-xl bg-[#f3f4f8] p-2 border-2 font-medium" value={password} onChange={(e) => setPassword(e.target.value)} />
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

export default Login;