"use client"
import { useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import Header from '@/components/custom/Header'
import { MessagesContext, Message } from '@/context/MessagesContext'
import { UserDetailContext } from '@/context/userDetailsContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useConvex } from "convex/react"
import { api } from "../../convex/_generated/api"

interface ProviderProps {
  children: React.ReactNode
}

const Provider = ({ children }: ProviderProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [userDetail, setUserDetail] = useState<{
    _id: any;
    _creationTime: number;
    name: string;
    email: string;
    picture: string;
    uid: string;
  } | null>(null)
  const convex = useConvex();

  useEffect(() => {
    isAuthenticated();
  }, [])

  const isAuthenticated = async () => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      if (user && user.email) {
        const result = await convex.query(api.users.GetUser, {
          email: user.email
        })
        setUserDetail(result);
        console.log(result);
      }
    }
  }

  return (
    <div>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_OAUTH_GOOGLE || ''}>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <MessagesContext.Provider value={{ messages, setMessages }}>
            <NextThemesProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              disableTransitionOnChange
            >
              <Header />
              {children}
            </NextThemesProvider>
          </MessagesContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </div>
  )
}

export default Provider