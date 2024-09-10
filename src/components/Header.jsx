import React, { useState, useEffect } from 'react';

// استيراد الوظائف الضرورية من نظام المصادقة مثل Firebase
// import { auth } from './firebase'; 

const Header = () => {



 
  return (
    <header className="bg-[#3d3d3d] text-white p-4 flex flex-col md:flex-row items-center justify-between rounded-lg shadow-md">
      <div className="flex justify-between items-center w-full md:w-auto">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">متتبع النفقات</h1>

        
          
      </div>

     

      
    </header>
  );
};

export default Header;
