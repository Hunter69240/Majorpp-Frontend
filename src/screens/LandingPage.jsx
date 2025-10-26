import React from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
export default function LandingPage() {
    return (
       <div className="bg-custom-gradient min-h-screen">
        <Header />
        

        <div className="flex flex-col gap-4 m-auto items-flex-start justify-center h-[80vh] max-w-3xl px-4">
            <div className="max-w-2xl mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                    goldfish ipsum dolor sit amet, consectetur adipiscing elit
                </h1>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
            </div>

            <div className="flex flex-col gap-6 items-center">
                <SearchBar />

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>

            </div>
        </div>
       </div>
    );
}