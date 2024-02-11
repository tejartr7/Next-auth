'use client'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
export const Social = () => {
    const SearchParams=useSearchParams();
    const callbackUrl=SearchParams.get('callbackUrl');
    return (
        <div className="flex justify-center items-center w-full gap-x-2">
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => { }}
                style={{ height: '50px' }}
            >
                <FcGoogle style={{ height: '50px', width: '50px' }} />
            </Button>
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => { }}
                style={{ height: '50px' }}
            >
                <FaGithub style={{ height: '50px', width: '50px' }} />
            </Button>
        </div>
    );
};
