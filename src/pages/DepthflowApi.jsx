import { Outlet } from 'react-router-dom';
import ApiSidebar from '../components/ApiSidebar';

const DepthflowApi = () => {
    return (
        <div className="flex h-full w-full bg-[#070514] text-white font-sans overflow-hidden pt-20">
            <ApiSidebar />
            
            <div className="flex-1 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};
export default DepthflowApi;