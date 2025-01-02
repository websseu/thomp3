"use client";

import React from "react";
import { MdClose, MdStars } from "react-icons/md";

export default function LoginPopup() {
  return (
    <section
      id="login"
      className="w-full h-full fixed bg-black/75 z-50 left-0 top-0 flex items-center justify-center"
    >
      <div className="login__container w-10/12 h-5/6 bg-slate-400 rounded-2xl flex justify-between overflow-hidden">
        {/* 왼쪽 영역 */}
        <div className="login__left flex-1 w-[50%] h-full bg-slate-200">
          <div className="login__left__inner flex flex-col justify-between h-full p-10 poppins font-light">
            <div>
              <h3 className="text-xl text-gray-600">Welcome!</h3>
            </div>
            <div className="text-center flex items-center justify-center font-black text-8xl uppercase">
              <span className="mr-[-0.5vw] inline-block">th</span>
              <MdStars />
              <span className="ml-[-0.5vw] inline-block">mp</span>
            </div>
            <div className="text-sm">
              Not a member yet?{" "}
              <a href="/" className="underline font-medium">
                Register now
              </a>
            </div>
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <div className="login__right flex-1 w-[50%] h-full bg-slate-50 flex items-center">
          <div className="login__right__inner poppins p-10 flex w-full justify-center">
            <div className="w-full">
              <h3 className="text-2xl mb-8">Log in</h3>
              <form>
                <div className="flex flex-col mb-4">
                  <label className="text-xs text-gray-400 mb-2">
                    Email or Username
                  </label>
                  <input
                    name="_username"
                    className="px-4 py-3 NanumSquareNeo text-sm rounded-sm"
                    placeholder="Email or Username"
                    type="text"
                  />
                </div>
                <div className="flex flex-col mb-8">
                  <label className="text-xs text-gray-400 mb-2">Password</label>
                  <input
                    name="_password"
                    className="px-4 py-3 NanumSquareNeo text-sm rounded-sm"
                    placeholder="Password"
                    type="password"
                  />
                </div>
                <div className="mb-4">
                  <button
                    type="submit"
                    className="bg-black w-full text-white p-4 rounded-sm"
                  >
                    Log In Now
                  </button>
                </div>
                <div className="text-right text-sm text-zinc-600">
                  Forgot your password?
                </div>
                <div className="text-center py-2 text-gray-400 font-light">
                  or
                </div>
                <div className="border p-3 text-center rounded-md">
                  <button type="button">Sign in with GitHub</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* 닫기 버튼 */}
      <div className="login__close absolute right-3 top-3">
        <button className="w-12 h-12 rounded-lg bg-black/55 hover:bg-black/75 flex items-center justify-center">
          <MdClose size={20} className="text-white" />
        </button>
      </div>
    </section>
  );
}
