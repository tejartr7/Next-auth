'use client'
import { useRouter } from "next/navigation";
interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
};
export const LoginButton = ({
    children,
    mode,
    asChild
}: LoginButtonProps) => {
    const router = useRouter();
    const login = () => {
        return router.push('/auth/login')
    }
    return (
        <div onClick={login}>
            {children}
        </div>
    )
}