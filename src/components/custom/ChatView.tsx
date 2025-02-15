"use client"
import { useConvex, useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { MessagesContext } from '@/context/MessagesContext';
import Colors from '@/data/Colors';
import { UserDetailContext } from '@/context/userDetailsContext';
import Image from 'next/image';
import Lookup from '@/data/Lookup';
import { ArrowRight, Link, Loader2Icon } from 'lucide-react';
import axios from 'axios';
import PROMPT from '@/data/Prompt';
import ReactMarkdown from "react-markdown";

function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const {userDetail, setUserDetail} = useContext(UserDetailContext);
  const {messages, setMessages} = useContext(MessagesContext);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMesssages);
  useEffect(() => {
    if (typeof id === 'string') {
      GetWorkspaceData(id as Id<"workspace">);
    }
  }, [id]);

  const GetWorkspaceData = async (workspaceId: Id<"workspace">) => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId,
    });
    setMessages(result?.message);
    console.log(result);
  };

  const onGenerate=(input: string)=>{
    setMessages(prev=>[...prev,{
      id: Date.now().toString(),
      role:'user',
      text: input,
      content:input
    }])
    setUserInput('');
  }

  useEffect(()=>{
    if(messages?.length>0){
      const role = messages[messages?.length-1].role;
      if(role=='user'){
        GetAiResponse()
      }
    }
  },[messages])

  const GetAiResponse=async()=>{
    setLoading(true);
    const promptText = JSON.stringify(messages)+PROMPT.CHAT_PROMPT;
    const result = await axios.post('/api/ai-chat',{
      prompt:promptText
    })
    console.log(result.data.result);
    const aiResp  ={
      id: Date.now().toString(),
      role: 'ai',
      text: result.data.result,
      content: result.data.result
    }
    setMessages(prev=>[...prev,aiResp])
    if (typeof id === 'string') {
      await UpdateMessages({
        messages:[...messages, aiResp],
        workspace: id as Id<"workspace">
      })
    }
    setLoading(false);
  }

  return <div className='relative h-[85vh] flex flex-col'>
    <div className='flex-1 overflow-y-scroll scrollbar-hide'>
      {messages?.map((msg,index)=>(
        <div key={index} 
        className='p-3 rounded-lg mb-2 flex gap-2 items-start leading-7'
        style={{
          backgroundColor:Colors.CHAT_BACKGROUND
        }}>
          {msg?.role=='user' && 
          <Image src={userDetail?.picture ?? '/default-avatar.png'} alt='userImage'
          width={35} height={35} className='rounded-full'/>}
          <div className='flex flex-col'>
            <ReactMarkdown>{String(msg.content)}</ReactMarkdown>
          </div>
        </div>
      ))}
      {loading && <div className='p-3 rounded-lg mb-2 flex gap-2 items-start'
      style={{
        backgroundColor:Colors.CHAT_BACKGROUND
      }}>
        <Loader2Icon className='animate-spin'/>
        <h2>Generating Response...</h2>
      </div>}
    </div>
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
    
  </div>;
}

export default ChatView;