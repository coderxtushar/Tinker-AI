import React, { useContext } from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import Colors from '@/data/Colors'
import { UserDetailContext } from '@/context/userDetailsContext'

const Header = () => {
  const {userDetail, setUserDetail} = useContext(UserDetailContext);
  return (
    <div className='p-4 flex justify-between items-center'>
        <Image src= "/logo.svg"  alt='logo' width={40} height={40} priority/>
        {!userDetail?.name && <div className='flex gap-5'>
            <Button variant="ghost">Sign in</Button>
            <Button className='text-white' style={{
                backgroundColor:Colors.BLUE
            }}
            >Register</Button>
        </div>}
    </div>
  )
}

export default Header