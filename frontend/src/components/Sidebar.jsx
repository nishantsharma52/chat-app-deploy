import React, { useState } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

const Sidebar = () => {
    const [search, setSearch] = useState(""); // Dhyan dein: SetSearch ki jagah setSearch use karein (naming convention)
    const { authUser } = useSelector(store => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`https://chat-app-deploy-9wkt.onrender.com/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
        } catch (error) {
            console.log(error);
        }
    }

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        // Yahan Redux ko modify karne ki zarurat nahi hai.
        // Agar user click karta hai aur input khali hai, toh error de sakte hain:
        if (!search) toast.error("Please enter a name to search");
    }

    return (
        <div className='border-r border-slate-500 p-4 flex flex-col h-full w-full'>
            <form onSubmit={searchSubmitHandler} className='flex items-center gap-2'>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='input input-bordered bg-white/20 text-white/90 backdrop-blur-md rounded-md'
                    type="text"
                    placeholder='Search...'
                />
                <button type='submit' className='btn bg-cyan-600 hover:bg-cyan-500 text-black'>
                    <BiSearchAlt2 className='hover:invert w-6 h-6 outline-none' />
                </button>
            </form>
            <div className='divider px-3'> </div>
            
            {/* Search state ko as a prop OtherUsers me pass kar diya */}
            <OtherUsers search={search} />
            
            <div>
                <div className='flex gap-2 items-center bg-white/20 rounded p-2 mt-2 cursor-pointer'>
                    <div className='avatar relative'>
                        <div className='w-12 rounded-full '>
                            <img src={authUser?.profilePhoto} alt="userprofile" />
                        </div>
                    </div>
                    <div className='flex flex-col flex-1'>
                        <div className='flex justify-between gap-2 '>
                            <p className='text-white/90'>{authUser?.fullName}</p>
                        </div>
                    </div>
                    <button onClick={logoutHandler} className='btn btn-sm bg-cyan-600 hover:bg-cyan-500 text-black'>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;