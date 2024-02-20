import React,{Suspense}from 'react'
import { NewVerificationForm } from '@/components/auth/new-verification';
const Page = () => {
  return (
    <Suspense>
    <div>
        < NewVerificationForm />
    </div>
    </Suspense>
  )
}

export default Page