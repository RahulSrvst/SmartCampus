import React from 'react';
import './Navbar.css';
import { MdOutlineEuroSymbol } from 'react-icons/md';
import { RxCross2 } from "react-icons/rx";
import { AiOutlineUser, AiOutlineMail, AiOutlineSetting, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaProjectDiagram } from 'react-icons/fa';
import { BsPeople } from 'react-icons/bs';

const ActionItem = ({ label, Icon }) => (
  <div className="bg-slate-100 xl:h-[16vh] h-[18vh] w-full sm:w-[35%] md:w-[45%] lg:w-[14vw] xl:w-[9vw] flex flex-col justify-center items-center rounded-md transition duration-100 bg-hover hover:text-white text-lg icon-purple">
    <Icon className="text-2xl mb-1" />
    <span className="text-sm md:text-base">{label}</span>
  </div>
);

function Quick() {
  return (
    <div className="p-4">
      <div className="xl:ml-2 lg:ml-3 md:ml-5 space-y-5">
        <div className='flex justify-between'>
          <div>
            <span className="block text-base font-medium mb-3">Quick Actions</span>
            <span className="text-xs rounded px-2 bg-purple p-1 text-white font-normal">23 Task Pending</span>
          </div>

          
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
          <ActionItem label="Accounting" Icon={MdOutlineEuroSymbol} />
          <ActionItem label="Members" Icon={BsPeople} />
          <ActionItem label="Projects" Icon={FaProjectDiagram} />
          <ActionItem label="Customers" Icon={AiOutlineUser} />
          <ActionItem label="Email" Icon={AiOutlineMail} />
          <ActionItem label="Setting" Icon={AiOutlineSetting} />
          <ActionItem label="Orders" Icon={AiOutlineShoppingCart} />
        </div>
      </div>
    </div>
  );
}

export default Quick;
