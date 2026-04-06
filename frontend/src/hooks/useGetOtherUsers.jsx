import axios from "axios"
import React, { useEffect } from 'react'
import { useDispatch } from "react-redux"
import { setOtherUsers } from "../redux/userSlice"

const useGetOtherUsers = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`https://chat-app-deploy-9wkt.onrender.com/api/v1/user/`)
                console.log(res);
                //store
                dispatch(setOtherUsers(res.data))

            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers()
    }, [])
}

export default useGetOtherUsers