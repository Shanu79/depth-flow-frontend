import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import ApiSidebar from '../components/ApiSidebar'; // Adjust path if necessary
import PageLoader from '../components/PageLoader';

const DepthflowApi = () => {
    return (
        <div className="flex h-full w-full bg-[#070514] text-white font-sans overflow-hidden pt-20">
            <ApiSidebar />
            
            <div className="flex-1 overflow-y-auto">
                <Suspense fallback={<PageLoader />}>
                    <Outlet /> 
                </Suspense>
            </div>
        </div>
    );
};

export default DepthflowApi;