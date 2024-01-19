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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginSchema } from "@/schemas/index"
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
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })
    return (
        <div className=' bg-white h-[80vh] w-[80vw] lg:h-[70vh] lg:w-[40vw]' style={{ borderRadius: '10px' }}>
            <Card className=' bg-white h-[80vh] w-[80vw] lg:h-[60vh] lg:w-[40vw]' style={{ borderRadius: '10px' }}>
                <CardHeader className="text-center">
                    <CardTitle className='text-3xl'>{header}</CardTitle>
                    <CardDescription className='font-bold font-Poppins'>Welcome Back🎉</CardDescription>
                </CardHeader>
                <CardContent>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(() => { })} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='font-bold'>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="darkknight@gmail.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='font-bold'>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="enter your password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex items-center justify-center'>
                                <Button type="submit" >Login</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                {showSocial && (
                    <CardFooter>
                        <Social />
                    </CardFooter>
                )}
                <CardFooter className='font-bold font-Poppins text-lg flex justify-center items-center'>
                    <div className='text-center font-bold font-Poppins text-lg'>
                        <BackButton label={backButtonLabel} href={backButtonHref}
                        />
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};