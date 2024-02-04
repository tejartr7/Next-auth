import { RegisterForm } from "@/components/auth/register-form";
const Page = () => {
    return (
        <div className='flex items-center justify-center h-screen font-Poppins'>
            <div className=' bg-white h-[90vh] w-[80vw] lg:h-[90vh] lg:w-[40vw]' style={{ borderRadius: '10px' }}>
                <RegisterForm
                    header="Next Auth"
                    backButtonLabel="Already have an account?"
                    backButtonHref="/auth/login" 
                    showSocial 
                >
                    Register form
                </RegisterForm>
            </div>
        </div>
    )
}

export default Page;