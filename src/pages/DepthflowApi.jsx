import React from 'react';
import { Outlet } from 'react-router-dom';
import ApiSidebar from '../components/ApiSidebar'; // Adjust path if necessary

const DepthflowApi = () => {
    return (
        <div className="flex h-full w-full bg-[#070514] text-white font-sans overflow-hidden pt-20">
            <ApiSidebar />
            
            <div className="flex-1 overflow-y-auto">
                {/* The Outlet automatically renders the matching child route 
                  (Dashboard, ApiKeys, etc.) that you defined inside App.js! 
                */}
                <Outlet /> 
            </div>
        </div>
    );
};

export default DepthflowApi;