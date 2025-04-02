import { Ghost, HelpCircle, LogOut, Settings, Wallet } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

const SidebarFooter = () => {
    const options = [
        {
            name : 'Settings',
            icon : Settings
        },
        {
            name : 'Help Center',
            icon : HelpCircle
        },
        {
            name : 'My Subscription',
            icon : Wallet
        },
        {
            name : 'Sign Out',
            icon : LogOut
        }
    ]
  return (
    <div className='p-2 mb-10'>
        {options.map((option,index)=>(
            <Button variant="ghost" key={index}>
                <option.icon className="w-full flex justify-start my-3"/>
                {option.name}
            </Button>
        ))}
    </div>
  )
}

export default SidebarFooter