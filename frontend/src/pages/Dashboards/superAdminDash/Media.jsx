import { useState } from 'react';
import { 
  FiImage,
  FiPlus,
  FiTrash2,
  FiSearch,
  FiDownload
} from 'react-icons/fi';

const Media = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaItems, setMediaItems] = useState([
    { id: 1, name: 'event-photo-1.jpg', type: 'image', size: '2.4 MB', event: 'Tech Conference', date: '2023-06-15' },
    { id: 2, name: 'workshop-video.mp4', type: 'video', size: '45.2 MB', event: 'Photography Workshop', date: '2023-06-18' },
    { id: 3, name: 'presentation.pdf', type: 'document', size: '8.1 MB', event: 'Design Seminar', date: '2023-06-22' },
  ]);

  const filteredMedia = mediaItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.event.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <FiImage className="h-6 w-6 text-[#824B26] mr-2" />
          Media Gallery
        </h1>
        <button className="flex items-center px-4 py-2 bg-[#824B26] text-white rounded-md hover:bg-[#A56B3A]">
          <FiPlus className="h-5 w-5 mr-2" />
          Upload Media
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search media..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#824B26] focus:border-[#824B26]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Media Table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMedia.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{item.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.size}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.event}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button className="text-[#824B26] hover:text-[#A56B3A]">
                    <FiDownload className="h-4 w-4" />
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
    </div>
  );
};

export default Media;