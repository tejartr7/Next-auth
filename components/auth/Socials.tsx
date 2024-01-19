'use client'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
export const Social = () => {

    return (
        <div className="flex items-center w-full gap-x-2">
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