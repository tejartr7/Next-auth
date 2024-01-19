import { LoginForm } from "@/components/auth/login-form";
const Page = () => {
    return (
        <div className='flex items-center justify-center h-screen font-Poppins'>
            <div className=' bg-white h-[80vh] w-[80vw] lg:h-[70vh] lg:w-[40vw]' style={{ borderRadius: '10px' }}>
                <LoginForm
                    header="Next Auth"
                    backButtonLabel="Dont have an account?"
                    backButtonHref="/auth/signup" 
                    showSocial 
                >
                    Login form
                </LoginForm>
            </div>
        </div>
    )
}

export default Page;