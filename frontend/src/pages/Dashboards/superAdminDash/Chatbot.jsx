import { useState } from 'react';
import { 
  FiMessageSquare,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSearch
} from 'react-icons/fi';

const Chatbot = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('questions');
  const [questions, setQuestions] = useState([
    { id: 1, question: 'How do I register for an event?', answer: 'You can register through our website...' },
    { id: 2, question: 'What payment methods do you accept?', answer: 'We accept credit cards and PayPal...' },
  ]);
  const [conversations, setConversations] = useState([
    { id: 1, user: 'john@example.com', date: '2023-06-15', status: 'resolved' },
    { id: 2, user: 'jane@example.com', date: '2023-06-16', status: 'pending' },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <FiMessageSquare className="h-6 w-6 text-[#824B26] mr-2" />
          Chatbot Management
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('questions')}
          className={`px-4 py-2 font-medium ${activeTab === 'questions' ? 'text-[#824B26] border-b-2 border-[#824B26]' : 'text-gray-500'}`}
        >
          FAQ Management
        </button>
        <button
          onClick={() => setActiveTab('conversations')}
          className={`px-4 py-2 font-medium ${activeTab === 'conversations' ? 'text-[#824B26] border-b-2 border-[#824B26]' : 'text-gray-500'}`}
        >
          Conversations
        </button>
      </div>

      {activeTab === 'questions' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search questions..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#824B26] focus:border-[#824B26]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center px-4 py-2 bg-[#824B26] text-white rounded-md hover:bg-[#A56B3A] ml-4">
              <FiPlus className="h-5 w-5 mr-2" />
              Add Question
            </button>
          </div>

          <div className="bg-white shadow overflow-hidden rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Question</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Answer</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {questions.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.question}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.answer.substring(0, 50)}...</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
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
        </>
      )}

      {activeTab === 'conversations' && (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {conversations.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#824B26] hover:text-[#A56B3A]">
                      View Chat
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Chatbot;