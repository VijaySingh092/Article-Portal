import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { signOutSuccess } from '@/redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosCreate, IoIosDocument } from 'react-icons/io';

const BottomNavBar = () => {
  const dispatch = useDispatch()

  const {currentUser} = useSelector((state)=>state.user)

    const handleSignOut = async()=>{
        try{
          const res = await fetch("/api/user/signout",{
            method: "POST"
          })
  
          const data = await res.json()
  
          if(!res.ok){
            console.log(data.message)
          }else{
            dispatch(signOutSuccess())
          }
        }catch(error){
          console.log(error)
        }
      }

  return (
  <nav className='md:hidden fixed bottom-0 left-0 right-0 bg-slate-200 border-t border-gray-300 p-2 flex justify-around'>

      {/* <Link to="/" className='flex flex-col items-center text-slate-800'>
      <FaHome size={20}/>
      <span className='text-xs'>Home</span>
      </Link> */}

      <Link to="/dashboard?tab=profile" 
      className='flex flex-col items-center text-slate-800'>
      < FaUser size={20}/>
      <span className='text-xs'>Profile</span>
      </Link>

      {currentUser && currentUser.isAdmin && (
        <Link to="/create-post" 
      className='flex flex-col items-center text-slate-800'>
      < IoIosCreate size={20}/>
      <span className='text-xs'>Create Post</span>
      </Link>
    )}

    {currentUser && currentUser.isAdmin && (
        <Link to="/dashboard?tab=posts" 
      className='flex flex-col items-center text-slate-800'>
      < IoIosDocument size={20}/>
      <span className='text-xs'>Post</span>
      </Link>
    )}

      <button 
      className='flex flex-col items-center text-slate-800' 
      onClick={handleSignOut}>
        <FaSignOutAlt size={20}/>
        
        <span className='text-xs' >Logout</span>
      </button>
    </nav>
  )
}


export default BottomNavBar
