/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Search, Dot } from 'lucide-react';

const Sidebar = ({ selectedStatus, setSelectedStatus, selectedItems, setSelectedItems, data, viewMode, setViewMode }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('Owners');

    const filterItems = (items) => {
        return items ? items.filter(item =>
            item.toLowerCase().includes(searchTerm.toLowerCase())
        ) : [];
    };

    const handleItemSelection = (item) => {
        setSelectedItems(prevItems => {
            if (prevItems.includes(item)) {
                return prevItems.filter(i => i !== item);
            } else {
                return [...prevItems, item];
            }
        });
    };
    const safeData = data || { owners: [], lawfirms: [], attorneys: [] };
    console.log('safeData:', safeData);

    return (
        <div className="w-64 bg-white p-4 shadow-md">
            <div className="mb-6">
                <h3 className="font-semibold text-sm mb-2">Status</h3>
                <div className="flex flex-wrap gap-2">
                    {['All', 'Registered', 'Pending', 'Abandoned', 'Others'].map(status => (
                        <button
                            key={status}
                            className={`px-1 rounded-md flex font-bold items-center text-xs  ${selectedStatus.includes(status)
                                ? status === 'Registered' ? 'bg-green-100 text-green-800' :
                                    status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                        status === 'Abandoned' ? 'bg-red-100 text-red-800' :
                                            status === 'Others' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                : 'bg-white border border-gray-300 text-gray-700'
                                }`}
                            onClick={() => setSelectedStatus([status])}
                        >
                            <Dot
                                size={'2.8em'}
                                color={status === 'Registered' ? 'green' :
                                    status === 'Pending' ? 'yellow' :
                                        status === 'Abandoned' ? 'red' :
                                            status === 'Others' ? 'blue' :
                                                'gray'}
                            />
                            {status}
                        </button>
                    ))}
                </div>
            </div>


            <div className="mb-6">
                <div className="flex border-b mb-4">
                    {['Owners', 'Lawfirms', 'Attorneys'].map((tab) => (
                        <button
                            key={tab}
                            className={`flex-1 py-2 text-sm font-medium ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="relative mb-2">
                    <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder={`Search ${activeTab}`}
                        className="w-full p-2 pl-8 border rounded text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="max-h-40 overflow-y-auto">
                    {filterItems(safeData[activeTab.toLowerCase().replace(' ', '')]).map(item => (
                        <div key={item} className="flex items-center mb-1">
                            <input
                                type="checkbox"
                                id={item}
                                checked={selectedItems.includes(item)}
                                onChange={() => handleItemSelection(item)}
                                className="mr-2 form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                            />
                            <label htmlFor={item} className="text-sm">{item}</label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-sm mb-2">Display</h3>
                <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                    <button
                        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${viewMode === 'grid' ? 'bg-white text-gray-800 shadow' : 'text-gray-600'
                            }`}
                        onClick={() => setViewMode('grid')}
                    >
                        Grid View
                    </button>
                    <button
                        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${viewMode === 'list' ? 'bg-white text-gray-800 shadow' : 'text-gray-600'
                            }`}
                        onClick={() => setViewMode('list')}
                    >
                        List View
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;