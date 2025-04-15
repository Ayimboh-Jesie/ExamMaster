import React from 'react';

const StatsCard = ({value, title, bg, icon}) => (

    <>
        <div className="flex flex-col border border-gray-300 shadow-md rounded-lg p-5 w-94">
            <div className={`flex justify-between items-center `}>
                <p className="text-lg text-gray-400 mb-8 capitalize">{title}</p>
                <p className={`w-12 h-12 ${bg} rounded-lg p-3 text-lg flex justify-center items-center`}>
                    <i className={`${icon}`}></i>
                </p>
            </div>
            <p className={`font-medium rounded-lg text-2xl`}>{value}</p>
        </div>

    </>

);

export default StatsCard;