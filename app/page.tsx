'use client'
import React from 'react';
import Link from "next/link";

export default function Home() {

  return (
          <div className="flex items-center justify-center min-h-screen bg-black">
              <div className="text-center">
                  <h1 className="text-red-500 text-5xl font-bold">WELCOME</h1>
                  <h2 className="text-gray-500 text-3xl mt-4">TO OUR BUDGET TRACKER!</h2>
                  <div className="text-center">
                      <h2 className="text-white text-1xl font-semibold mb-6">This web application allows you to add different bank accounts and manage them!</h2>
                      <Link className="inline-block px-6 py-3 text-white bg-blue-500 hover:bg-blue-700 rounded-lg shadow-lg font-semibold text-lg transition duration-300 ease-in-out"
                            href={"/login"} >Go to Login/Register Form</Link>
                  </div>
              </div>
          </div>
  );
}
