"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <div className="flex items-center justify-center font-bold text-lg">
      <Button variant="link" className="font-normal w-full" size="sm" asChild>
        <div className="flex items-center justify-center font-bold text-lg mx-auto">
          <a href={href} className="flex items-center justify-center text-center font-bold text-lg" style={{ color: 'blue' }}>
            <u>{label}</u>
          </a>
        </div>
      </Button>
    </div>
  );
};
