import { LoginForm } from "@/components/auth/login-form";
const Page = () => {
    return (
        <div className='flex items-center justify-center h-screen font-Poppins'>
            <div className='text-center bg-white h-[80vh] w-[80vw] lg:h-[60vh] lg:w-[40vw]' style={{ borderRadius: '10px' }}>
                <LoginForm
                    header="Next Auth"
                    backButtonLabel="Back"
                    backButtonHref="/" 
                    showSocial  
                >
                    Login form
                </LoginForm>
            </div>
        </div>
    )
}

export default Page;