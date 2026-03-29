import { ChevronDown, ChevronsUpDown } from "lucide-react";
import React, { useState } from 'react';

const ApiLogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 15;

  const logsData = [
    {
      id: "df_req_x4z1...",
      status: "Success",
      credits: 45,
      duration: "1150ms",
      time: "Oct 20, 10:30 AM",
    },
    {
      id: "df_req_a7b2...",
      status: "Failed",
      credits: 0,
      duration: "200ms",
      time: "Oct 20, 10:28 AM",
    },
    {
      id: "df_req_c9d3...",
      status: "Success",
      credits: 60,
      duration: "1500ms",
      time: "Oct 20, 10:25 AM",
    },
    {
      id: "df_req_e5f4...",
      status: "Success",
      credits: 30,
      duration: "900ms",
      time: "Oct 20, 10:20 AM",
    },
    {
      id: "df_req_g1h6...",
      status: "Failed",
      credits: 0,
      duration: "250ms",
      time: "Oct 20, 10:15 AM",
    },
    {
      id: "df_req_i2j7...",
      status: "Success",
      credits: 55,
      duration: "1400ms",
      time: "Oct 20, 10:10 AM",
    },
  ];

  // 2. Calculate indices for slicing the logs array
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  
  // This is the array you will actually map over in your JSX
  const currentLogs = logsData.slice(indexOfFirstLog, indexOfLastLog);
  
  // Calculate the total number of pages needed
  const totalPages = Math.ceil(logsData.length / logsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div className="flex-1 h-full relative p-8 flex flex-col overflow-hidden">
      {/* Background Glows to match the image's ambiance */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col h-full w-full">
        {/* Header Section */}
        <div>
          <h1 className="text-4xl font-bold text-white tracking-wide mb-2">
            API Logs
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Track all your API requests and responses
          </p>
        </div>

        {/* Filters Section */}
        <div className="flex flex-wrap items-center gap-6 mb-8 shrink-0">
          {/* Status Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Status</label>
            <div className="flex items-center justify-between bg-transparent border border-white/10 rounded-xl px-4 py-2.5 w-56 hover:bg-white/5 cursor-pointer transition-colors">
              <span className="text-sm text-gray-200">All</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Date Range</label>
            <div className="flex items-center justify-between bg-transparent border border-white/10 rounded-xl px-4 py-2.5 w-56 hover:bg-white/5 cursor-pointer transition-colors">
              <span className="text-sm text-gray-200">Last 7 Days</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Table Container with Purple Glow */}
        <div className="bg-[#151124]/80 backdrop-blur-md rounded-2xl border border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.3)] overflow-y-auto flex-1">
          <table className="w-full text-left border-collapse">
            {/* Table Head */}
            <thead className="sticky top-0 bg-[#151124] z-10">
              <tr className="border-b border-white/10 text-gray-400 text-sm">
                <th className="px-6 py-5 font-medium">Request ID</th>
                <th className="px-6 py-5 font-medium cursor-pointer hover:text-gray-300 group">
                  <div className="flex items-center gap-2">
                    Status
                    <ChevronsUpDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
                  </div>
                </th>
                <th className="px-6 py-5 font-medium cursor-pointer hover:text-gray-300 group">
                  <div className="flex items-center gap-2">
                    Credits Used
                    <ChevronsUpDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
                  </div>
                </th>
                <th className="px-6 py-5 font-medium cursor-pointer hover:text-gray-300 group">
                  <div className="flex items-center gap-2">
                    Duration
                    <ChevronsUpDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
                  </div>
                </th>
                <th className="px-6 py-5 font-medium cursor-pointer hover:text-gray-300 group">
                  <div className="flex items-center gap-2">
                    Date & Time
                    <ChevronsUpDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
                  </div>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-gray-300 text-sm">
              {currentLogs.map((log, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-5 font-mono text-gray-400">
                    {log.id}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium border ${
                        log.status === "Success"
                          ? "bg-green-500/10 text-green-400 border-green-500/30"
                          : "bg-red-500/10 text-red-400 border-red-500/30"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">{log.credits}</td>
                  <td className="px-6 py-5">{log.duration}</td>
                  <td className="px-6 py-5">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 shrink-0 space-x-4">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-semibold rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <span className="text-gray-400 text-sm font-medium">
              Page <span className="text-white">{currentPage}</span> of {totalPages}
            </span>

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-semibold rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiLogs;
