import React from "react";
import { MdClose, MdStars } from "react-icons/md";

export default function Register() {
  return (
    <section
      id="login"
      className="w-full h-full fixed bg-black/75 z-50 left-0 top-0 flex items-center justify-center"
    >
      <div className="login__container w-10/12 h-5/6 bg-slate-400 rounded-2xl flex justify-between overflow-hidden">
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
              Are you a member?{" "}
              <a href="/" className="underline font-medium">
                Log in Now
              </a>
            </div>
          </div>
        </div>
        <div className="login__right flex-1 w-[50%] h-full bg-slate-50 flex items-center">
          <div className="login__right__inner poppins p-10 flex w-full justify-center">
            <div className="w-full">
              <h3 className="text-2xl mb-8">Register</h3>
              <div>
                <form>
                  <div className="flex flex-col mb-4">
                    <label className="text-xs text-gray-400 mb-2">
                      Username
                    </label>
                    <input
                      name="username"
                      className="px-4 py-3 NanumSquareNeo text-sm rounded-sm"
                      placeholder="Username"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <label className="text-xs text-gray-400 mb-2">Email</label>
                    <input
                      name="email"
                      className="px-4 py-3 NanumSquareNeo text-sm rounded-sm"
                      placeholder="Email"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col mb-8">
                    <label className="text-xs text-gray-400 mb-2">
                      Password
                    </label>
                    <input
                      name="_username"
                      className="px-4 py-3 NanumSquareNeo text-sm rounded-sm"
                      placeholder="Password"
                      type="Password"
                    />
                  </div>
                  <div className="mb-4">
                    <button
                      type="submit"
                      className="bg-black w-full text-white p-4 rounded-sm"
                    >
                      Create Account
                    </button>
                  </div>
                  <div className="text-right text-sm text-zinc-600">
                    Are you a member?
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="login__close absolute right-3 top-3">
        <button className="w-12 h-12 rounded-lg bg-black/55 hover:bg-black/75 flex items-center justify-center">
          <MdClose size={20} className="text-white" />
        </button>
      </div>
    </section>
  );
}
