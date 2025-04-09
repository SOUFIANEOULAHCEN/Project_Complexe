import { useState } from 'react';
import { FiFileText, FiDownload, FiCalendar } from 'react-icons/fi';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Reports = () => {
  const [activeReport, setActiveReport] = useState('usage');

  const usageData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Active Users',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: '#824B26',
      },
      {
        label: 'New Users',
        data: [28, 48, 40, 19, 86, 27],
        backgroundColor: '#A56B3A',
      },
    ],
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [1250, 1900, 1800, 2100, 2500, 2300],
        borderColor: '#824B26',
        backgroundColor: 'rgba(130, 75, 38, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const reports = [
    { id: 'usage', name: 'Usage Statistics', icon: FiFileText },
    { id: 'revenue', name: 'Revenue Report', icon: FiFileText },
    { id: 'events', name: 'Events Participation', icon: FiCalendar },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <FiFileText className="h-6 w-6 text-[#824B26] mr-2" />
          Reports
        </h1>
        <button className="flex items-center px-4 py-2 bg-[#824B26] text-white rounded-md hover:bg-[#A56B3A]">
          <FiDownload className="h-5 w-5 mr-2" />
          Export Report
        </button>
      </div>

      {/* Report Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {reports.map((report) => (
          <button
            key={report.id}
            onClick={() => setActiveReport(report.id)}
            className={`p-4 rounded-lg border ${activeReport === report.id ? 'border-[#824B26] bg-[#824B26]/10' : 'border-gray-200'}`}
          >
            <div className="flex items-center">
              <report.icon className={`h-5 w-5 mr-3 ${activeReport === report.id ? 'text-[#824B26]' : 'text-gray-500'}`} />
              <span className={`font-medium ${activeReport === report.id ? 'text-[#824B26]' : 'text-gray-700'}`}>
                {report.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Report Content */}
      <div className="bg-white shadow rounded-lg p-6">
        {activeReport === 'usage' && (
          <>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Usage Statistics</h2>
            <div className="h-96">
              <Bar data={usageData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </>
        )}

        {activeReport === 'revenue' && (
          <>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Revenue Report</h2>
            <div className="h-96">
              <Line data={revenueData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </>
        )}

        {activeReport === 'events' && (
          <>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Events Participation</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span>Tech Conference</span>
                <span className="font-medium">245 participants</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span>Photography Workshop</span>
                <span className="font-medium">189 participants</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span>Design Seminar</span>
                <span className="font-medium">132 participants</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Reports;