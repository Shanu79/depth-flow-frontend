import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../components/depthflow-api/Dashboard';
import ApiSidebar from '../components/ApiSidebar';
import ApiKeysPage from '../components/depthflow-api/ApiKeys';
import ApiLogs from '../components/depthflow-api/ApiLogs';

const DepthflowApi = () => {
    return (
        <div className="flex h-full w-full bg-[#070514] text-white font-sans overflow-hidden pt-20">
            <ApiSidebar />
            
            <div className="flex-1 overflow-y-auto">
                <Routes>
                    <Route path="/" element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="api-keys" element={<ApiKeysPage />} />
                    <Route path="logs" element={<ApiLogs />} />
                    <Route path="documentation" element={<div className="p-8 flex-1 text-gray-400">Documentation Component (Coming Soon)</div>} />
                    <Route path="pricing" element={<div className="p-8 flex-1 text-gray-400">Pricing Plans Component (Coming Soon)</div>} />
                    <Route path="billing" element={<div className="p-8 flex-1 text-gray-400">Billing Component (Coming Soon)</div>} />
                    <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
            </div>
        </div>
    );
};
export default DepthflowApi;