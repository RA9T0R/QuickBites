import React from "react";
import { Phone,Check,MapPin,Mail,Heart  } from 'lucide-react';

const Thank = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center min-h-screen bg-BG">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-600 rounded-full shadow-lg shadow-Text/20 flex items-center justify-center">
        <Check className="size-11 sm:size-14 text-Text" alt="Check" />
      </div>
      <h2 className="text-4xl font-semibold text-center text-Text">Thank you for dining with us!</h2>
      <p className="text-Text/50 w-[70%] md:w-[50%] text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos consequuntur voluptatem harum dolorum inventore amet maiores, temporibus, blanditiis nihil dolor, odit ducimus dolorem eius vero!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-10 justify-center">
        <div className="flex flex-col justify-center items-center gap-8 bg-Text p-16 shadow-lg shadow-Text/20 rounded-xl">
            <strong className="text-4xl text-BG">Contact Us</strong>
            <div className="flex gap-5 ">
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-BG rounded-full shadow-lg shadow-Text/20 flex items-center justify-center">
                    <Phone className="size-4 sm:size-6 text-Text" alt="Phone" />
                </div>
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-BG rounded-full shadow-lg shadow-Text/20 flex items-center justify-center">
                    <MapPin className="size-4 sm:size-6 text-Text" alt="MapPin" />
                </div>
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-BG rounded-full shadow-lg shadow-Text/20 flex items-center justify-center">
                    <Mail  className="size-4 sm:size-6 text-Text" alt="Mail" />
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center items-center p-10">
            <Heart className="size-48 sm:size-52 fill-red-500 text-Text" alt="Heart"/>
        </div>
      </div>
    </div>
  );
};

export default Thank;