import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LoginButton } from '@/components/auth/login-button'

export default function Home() {
  return (
    <div className='flex items-center justify-center h-screen font-Poppins'>
      <div className='bg-white h-[80vh] w-[80vw] lg:h-[60vh] lg:w-[40vw]' style={{ borderRadius: '10px' }}>
        <h1 className='m-2 p-2 font-bold text-3xl'>Next Auth 🔐</h1>
        <LoginButton>
          <div className='flex text-center items-center justify-center'>
            <Button className='text-lg'>Sign-in</Button>
          </div>
        </LoginButton>
      </div>
    </div>
  )
}
