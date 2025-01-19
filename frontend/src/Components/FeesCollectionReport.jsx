import React from 'react';
import { TiArrowDownThick, TiArrowUpThick } from "react-icons/ti";


const FeesCollection = () => {
    const currentSatisfaction = 80;

    return (
        <div className='pb-4 bg-white rounded-xl'>
            <div>
                <div className='text-lg font-normal p-5 border-b'>Fees Collection Report</div>
            </div>

            <div className='flex px-4 font-normal text-base mx-5 justify-between p-4'>
                <div>
                    <span className='block text-slate-800'>Today</span>
                    <span className='flex text-lg'>$12k<TiArrowUpThick className='h-7 w-8  ml-0.5 text-green-700' /></span>
                </div>

                <div>
                    <span className='block text-slate-800'>This Week</span>
                    <span className='flex text-lg'>$22k<TiArrowDownThick className='h-7 w-8  ml-0.5 text-red-700' /></span>
                </div>

                <div>
                    <span className='block text-slate-800'>This Month</span>
                    <span className='flex text-lg'>$95k<TiArrowUpThick className='h-7 w-8  ml-0.5 text-green-700' /></span>
                </div>
            </div>

            <div className="text-md font-bold px-4 ">
                <div className="relative pt-2 w-full">
                    <div className="overflow-hidden h-4 text-xs flex rounded bg-slate-200">
                        <div
                            style={{ width: `${currentSatisfaction}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-red-600"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeesCollection;
