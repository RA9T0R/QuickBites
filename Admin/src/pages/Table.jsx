import React, { useContext, useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import { SkipBack } from 'lucide-react';

const Table = () => {

    const { tableNumber } = useParams();

    return (
    <div className="w-full flex flex-col items-center text-Text p-8">
        {/* Header Section */}
        <div className='flex self-start justify-center gap-3 md:gap-6'>
            <Link to="/order" className="flex items-center text-Text hover:text-Highlight mb-5">
                <SkipBack className="size-8 md:size-10" />
            </Link>
            <h1 className="text-2xl md:text-4xl font-bold ml-1">
                Table {tableNumber}
            </h1>
        </div>
    </div>
  );
}

export default Table
