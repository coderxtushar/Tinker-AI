"use client"
import React, { useContext, useState } from 'react'
import Lookup from '@/data/Lookup'
import { ArrowRight, Link } from 'lucide-react'
import Colors from '@/data/Colors'
import { MessagesContext } from '@/context/MessagesContext'
import { UserDetailContext } from '@/context/userDetailsContext'
import SignInDialog from './SignInDialog'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useRouter } from 'next/navigation'

const Hero = () => {
  const [userInput, setUserInput] = useState('');
  const { messages, setMessages } = useContext(MessagesContext);
  const userDetailContext = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();

  const onGenerate = async (input: string) => {

    console.log(userDetailContext)
    if (!userDetailContext?.userDetail) {
      setOpenDialog(true);
      return;
    }
    const msg = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      content: input
    }
    setMessages(prev => [...prev, msg]);
    // setMessages(prev => [...prev, {
    //   id: Date.now().toString(),
    //   role: "user",
    //   text: input
    // }]);
    // setUserInput(''); // Clear input after sending

    const workspaceId = await CreateWorkspace({
      user: userDetailContext.userDetail._id,
      messages:[msg]
    })
    console.log(workspaceId);
    router.push('/workspace/'+workspaceId);
  }


  return (
    <div className='flex flex-col items-center mt-20 xl:mt-32 gap-2'>
      <h2 className='font-bold text-4xl'>{Lookup.HERO_READING}</h2>
      <p className='text-gray-400 font-medium'>{Lookup.HERO_DESC}</p>
      <div className='p-5 border rounded-xl max-w-xl w-full mt-3'
        style={{
          backgroundColor: Colors.BACKGROUND
        }}>
        <div className='flex gap-2'>
          <textarea
            value={userInput}
            placeholder={Lookup.INPUT_PLACEHOLDER}
            onChange={(event) => setUserInput(event.target.value)}
            className='outline-none bg-transparent w-full h-32 max-h-56 resize-none' />
          {userInput && <ArrowRight
            onClick={() => onGenerate(userInput)}
            className='bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer'></ArrowRight>}
        </div>
        <div>
          <Link className='h-5 w-5' />
        </div>
      </div>
      <div className='flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-3'>
        {Object.values(Lookup.SUGGESTION).map((suggestion, index) => (
          <h2 key={index}
            onClick={() => onGenerate(suggestion)}
            className='p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer'
          >{suggestion}</h2>
        ))}
      </div>
      <SignInDialog openDialog={openDialog} closeDialog={(v) => setOpenDialog(v)} />
    </div>
  )
}

export default Hero