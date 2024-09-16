/* eslint-disable no-unused-vars */
import { div } from 'framer-motion/client';
import { Menu } from 'lucide-react';

// eslint-disable-next-line react/prop-types
const SearchHeader = ({ searchTerm, setSidebarOpen }) => (

    <div className="flex justify-between  items-center ">
        <div>
        <hr  className='text-blue-400 min-w-80 font-bold'/>

        </div>

        <button className="md:hidden p-2" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
        </button>
    </div>
);

export default SearchHeader;
