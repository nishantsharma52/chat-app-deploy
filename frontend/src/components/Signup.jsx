import React from 'react'
import { Link } from "react-router-dom"

const Signup = () => {
  
  return (
    <div className='min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-white/10 backdrop-blur-md border border-white/20'>
        <h1 className='text-3xl font-bold text-center'>Signup</h1>
        <form action="">
          <div>
            <label className='label p-2'>
              <span className='text-base label-text '>Full Name </span>
            </label>
            <input className='w-full input input-borderd h-10' type="text" placeholder='Full Name' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text '>Username </span>
            </label>
            <input className='w-full input input-borderd h-10' type="text" placeholder='username' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text '>Password </span>
            </label>
            <input className='w-full input input-borderd h-10' type="password" placeholder='password' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text '>Confirm-Password </span>
            </label>
            <input className='w-full input input-borderd h-10' type="password" placeholder='confirm-password' />
          </div>
          <div className=' flex items-center my-4'>
            <div className='flex items-center'>
              <p>Male</p>
              <input type="checkbox" defaultChecked className="checkbox mx-2 checkbox-neutral" />
            </div>
            <div className=' flex items-center'>
              <p>Female</p>
              <input type="checkbox" defaultChecked className="checkbox mx-2 checkbox-neutral" />
            </div>
          </div>
          <p className=' text-center my-2 '> Already have an account?  <Link to="/login"> login</Link> </p>
          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700'>Signup</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Signup