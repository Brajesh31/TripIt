import React, { useEffect, useState } from 'react'
import logo from '/logo.svg';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';


const Header = () => {

  const users = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data))
      setOpenDialog(false);
      window.location.reload()
    })
  }



  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })


  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <a href='/'>
        <img
          src={logo}
          alt="logo_image"
          className="p-2 w-18 h-auto"
        />
        <p className='text-center font-bold text-blue-900 text-lg'>TripIt</p>
      </a>
      <div>
        {users ?
          <div className='flex items-center gap-3'>

            <a href='/create-trip'>
              <Button variant='outline' className='rounded-full'>+ Create Trips</Button>
            </a>

            <a href='/my-trips'>
              <Button variant='outline' className='rounded-full'>My Trips</Button>
            </a>

            <Popover>
              <PopoverTrigger><img className='h-[35px] w-[35px] rounded-full' src={users?.picture} /></PopoverTrigger>
              <PopoverContent><h2 className='cursor-pointer' onClick={() => {
                googleLogout();
                localStorage.clear();
                window.location.reload();
              }}>Log Out</h2></PopoverContent>
            </Popover>
          </div> : <Button onClick={() => setOpenDialog(true)} className='cursor-pointer'>Sign in</Button>
        }
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img className='w-10' src='/logo.svg' />
              <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
              <p>Sign In to the app to proceed with Google authentication securely!</p>
              <Button
                onClick={login}
                className='w-full mt-5 flex gap-4 itms-center hover:cursor-pointer'>

                <FcGoogle />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>

  )
}

export default Header
