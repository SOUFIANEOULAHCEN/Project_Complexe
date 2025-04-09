import { useState } from 'react';
import { 
  FiUsers, 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiSearch, 
  FiCheck, 
  FiX 
} from 'react-icons/fi';

const Talents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [talents, setTalents] = useState([
    { id: 1, name: 'Alex Johnson', expertise: 'Photography', status: 'approved', portfolio: '15 items' },
    { id: 2, name: 'Sarah Miller', expertise: 'Graphic Design', status: 'pending', portfolio: '8 items' },
    { id: 3, name: 'David Wilson', expertise: 'Music Production', status: 'rejected', portfolio: '22 items' },
  ]);

  const filteredTalents = talents.filter(talent =>
    talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    talent.expertise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (id, newStatus) => {
    setTalents(talents.map(talent => 
      talent.id === id ? { ...talent, status: newStatus } : talent
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <FiUsers className="h-6 w-6 text-[#824B26] mr-2" />
          Talent Management
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-[#824B26] text-white rounded-md hover:bg-[#A56B3A]"
        >
          <FiPlus className="h-5 w-5 mr-2" />
          Add Talent
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search talents..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#824B26] focus:border-[#824B26]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Talents Table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expertise</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Portfolio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTalents.map((talent) => (
              <tr key={talent.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{talent.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{talent.expertise}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{talent.portfolio}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    talent.status === 'approved' ? 'bg-green-100 text-green-800' :
                    talent.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {talent.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  {talent.status !== 'approved' && (
                    <button
                      onClick={() => handleStatusChange(talent.id, 'approved')}
                      className="text-green-600 hover:text-green-900 inline-flex items-center"
                      title="Approve"
                    >
                      <FiCheck className="h-4 w-4" />
                    </button>
                  )}
                  {talent.status !== 'rejected' && (
                    <button
                      onClick={() => handleStatusChange(talent.id, 'rejected')}
                      className="text-red-600 hover:text-red-900 inline-flex items-center"
                      title="Reject"
                    >
                      <FiX className="h-4 w-4" />
                    </button>
                  )}
                  <button className="text-[#824B26] hover:text-[#A56B3A]">
                    <FiEdit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Talent Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Talent</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#824B26] focus:border-[#824B26]"
                  placeholder="Alex Johnson"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Expertise</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#824B26] focus:border-[#824B26]"
                  placeholder="Photography"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Link</label>
                <input
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#824B26] focus:border-[#824B26]"
                  placeholder="https://example.com/portfolio"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#824B26] text-white rounded-md text-sm font-medium hover:bg-[#A56B3A]"
                >
                  Add Talent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Talents;