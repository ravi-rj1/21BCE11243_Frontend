import { Search } from 'lucide-react';
import logo from '../assets/website logo/Logo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav className="flex items-center p-5 bg-[#F8FAFE] shadow-sm z-100">
      <div className="text-2xl font-bold text-blue-600">
        <img src={logo} alt="Logo" />
      </div>
      <div className='flex flex-grow max-w-[40rem]'>
        <div className="flex-grow mx-4">
          <div className="relative max-w">
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Trademark Here e.g. Mickey Mouse"
              className="w-full p-2 pl-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
        <button
          className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </nav>
  );
};

export default Navbar;