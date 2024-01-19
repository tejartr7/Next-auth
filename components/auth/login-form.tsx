'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Social } from "@/components/auth/Socials";
import { BackButton } from "@/components/auth/back-button";
interface LoginFormProps {
    children: React.ReactNode;
    header: string,
    backButtonLabel: string,
    backButtonHref: string,
    showSocial?: boolean,
};
export const LoginForm = ({
    header,
    backButtonLabel,
    backButtonHref,
    showSocial,
    children,
}: LoginFormProps) => {
    return (
        <div className='text-center bg-white h-[80vh] w-[80vw] lg:h-[60vh] lg:w-[40vw]' style={{ borderRadius: '10px' }}>
            <Card className='text-center bg-white h-[80vh] w-[80vw] lg:h-[60vh] lg:w-[40vw]' style={{ borderRadius: '10px' }}>
                <CardHeader>
                    <CardTitle className='text-3xl'>{header}</CardTitle>
                    <CardDescription className='font-bold font-Poppins'>Welcome Back🎉</CardDescription>
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
                {showSocial && (
                    <CardFooter>
                        <Social />
                    </CardFooter>
                )}
                <CardFooter>
                    <BackButton label={backButtonLabel} href={backButtonHref} />
                </CardFooter>
            </Card>
        </div>
    );
};