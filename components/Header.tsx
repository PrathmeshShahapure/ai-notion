"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
const Header = () => {
  const { user } = useUser();
  return (
    <div className="flex justify-between items-center p-4 gap-4 h-16">
      <div>{user && <h1>{user?.firstName}`s Space </h1>}</div>
      <div></div>
      <div className="flex gap-4">
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton>
            <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </div>
  );
};

export default Header;
