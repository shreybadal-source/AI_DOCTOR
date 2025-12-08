"use client";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Header() {
  const [addBorder, setAddBorder] = useState(false);
  const { user } = useUser();
  const t = useTranslations('Header');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setAddBorder(true);
      } else {
        setAddBorder(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={
        "relative sticky top-0 z-50 py-2 bg-background/60 backdrop-blur px-2 sm:px-4"
      }
    >
      <div className="flex justify-between items-center container">
        <Link
          href="/"
          title="brand-logo"
          className="relative mr-6 flex items-center space-x-2 px-0 sm:pl-20"
        >
          <Icons.logo className="w-auto h-[40px]" />
          <span className="font-bold text-xl">{siteConfig.name}</span>
        </Link>

        <div className="hidden lg:block">
          <div className="flex items-center ">

            <div className="gap-2 flex">
              <LanguageSwitcher />
              <Link
                href={user ? "/dashboard" : "/sign-in"}
                className={buttonVariants({ variant: "outline" })}
              >
                {user ? t('dashboard') : t('login')}
              </Link>
              {user && (
                <UserButton />
              )}
              {!user && (
                <Link
                  href="/sign-up"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "w-full sm:w-auto text-background flex gap-2"
                  )}
                >
                  <Icons.logo className="h-6 w-6" />
                  {t('startConsultation')}
                </Link>
              )
              }

            </div>
          </div>
        </div>
        <div className="mt-2 cursor-pointer block lg:hidden">
          <div className="flex items-center gap-4">
            <Link
              href={user ? "/dashboard" : "/sign-in"}
              className={buttonVariants({ variant: "outline" })}
            >
              {user ? t('dashboard') : t('login')}
            </Link>
            <LanguageSwitcher />
            <UserButton />
          </div>
        </div>
      </div>
      <hr
        className={cn(
          "absolute w-full bottom-0 transition-opacity duration-300 ease-in-out",
          addBorder ? "opacity-100" : "opacity-0"
        )}
      />
    </header>
  );
}
