/* eslint-disable no-unused-vars */

import { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchTrademarksData } from '../utils/fetchData.js';

const SearchHeader = lazy(() => import('../components/SearchHeader'));
const TrademarkList = lazy(() => import('../components/TrademarkList'));
const Sidebar = lazy(() => import('../components/Sidebar'));
const SidebarOverlay = lazy(() => import('../components/SidebarOverlay'));

// Skeleton components
const SearchHeaderSkeleton = () => (
    <div className="h-16 bg-gray-200 rounded animate-pulse mb-4"></div>
);

const TrademarkListSkeleton = () => (
    <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
            <div key={i} className="flex space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                </div>
            </div>
        ))}
    </div>
);

const SidebarSkeleton = () => (
    <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
    </div>
);

const mockTrademarks = [
    {
        _source: {
            mark_identification: 'CHECK´S',
            current_owner: 'CHIC-KLES GUM, S.L.U.',
            registration_number: '123456',
            filing_date: 1627884000,
            registration_date: 1627884000,
            expiration_date: 1727884000,
            mark_description_description: ['Candy', 'Chocolate'],
            class_codes: ['030', '005']
        }
    },
    {
        _source: {
            mark_identification: 'TECH-SOLUTIONS',
            current_owner: 'Tech Innovations LLC',
            registration_number: '987654',
            filing_date: 1617884000,
            registration_date: 1617884000,
            expiration_date: 1717884000,
            mark_description_description: ['Software', 'Hardware'],
            class_codes: ['009', '042']
        }
    },
    {
        _source: {
            mark_identification: 'NATURALS',
            current_owner: 'Green Earth Ltd.',
            registration_number: '453789',
            filing_date: 1607884000,
            registration_date: 1607884000,
            expiration_date: 1707884000,
            mark_description_description: ['Organic Products', 'Cosmetics'],
            class_codes: ['003', '005']
        }
    },
    {
        _source: {
            mark_identification: 'FAST-FIT',
            current_owner: 'Global Gym Inc.',
            registration_number: '124578',
            filing_date: 1597884000,
            registration_date: 1597884000,
            expiration_date: 1697884000,
            mark_description_description: ['Fitness Equipment', 'Health Supplements'],
            class_codes: ['028', '035']
        }
    },
    {
        _source: {
            mark_identification: 'HEALTHY LIVING',
            current_owner: 'Wellness Co.',
            registration_number: '894562',
            filing_date: 1587884000,
            registration_date: 1587884000,
            expiration_date: 1687884000,
            mark_description_description: ['Vitamins', 'Nutritional Supplements'],
            class_codes: ['005', '029']
        }
    },
    {
        _source: {
            mark_identification: 'GLOBE-TECH',
            current_owner: 'World Technologies Pvt. Ltd.',
            registration_number: '774512',
            filing_date: 1577884000,
            registration_date: 1577884000,
            expiration_date: 1677884000,
            mark_description_description: ['Telecommunications', 'Networking Equipment'],
            class_codes: ['038', '009']
        }
    },
    {
        _source: {
            mark_identification: 'SWEET DREAMS',
            current_owner: 'Luxury Linens Inc.',
            registration_number: '336547',
            filing_date: 1567884000,
            registration_date: 1567884000,
            expiration_date: 1667884000,
            mark_description_description: ['Bedding', 'Home Decor'],
            class_codes: ['024', '020']
        }
    },
    {
        _source: {
            mark_identification: 'AQUA-FRESH',
            current_owner: 'Pure Water Solutions Ltd.',
            registration_number: '215478',
            filing_date: 1557884000,
            registration_date: 1557884000,
            expiration_date: 1657884000,
            mark_description_description: ['Water Filtration', 'Beverages'],
            class_codes: ['011', '032']
        }
    },
    {
        _source: {
            mark_identification: 'COMFY WEAR',
            current_owner: 'Comfort Clothing Co.',
            registration_number: '789123',
            filing_date: 1547884000,
            registration_date: 1547884000,
            expiration_date: 1647884000,
            mark_description_description: ['Clothing', 'Footwear'],
            class_codes: ['025', '035']
        }
    }
];


// Skeleton components remain unchanged

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('check');
    const [selectedStatus, setSelectedStatus] = useState(['All']);
    const [selectedItems, setSelectedItems] = useState([]);
    const [viewMode, setViewMode] = useState('list');
    const [trademarks, setTrademarks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sidebarData, setSidebarData] = useState({
        attorneys: [],
        owners: [],
        lawFirms: []
    });
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get('search');
        if (searchQuery) {
            setSearchTerm(searchQuery);
        }
    }, [location]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { trademarks, sidebarData } = await fetchTrademarksData({
                    searchTerm,
                    selectedStatus,
                    selectedItems
                });
                console.log('trademarks:', trademarks);
                setTrademarks(trademarks);

                
                setSidebarData({
                    attorneys: sidebarData.attorneys || [],
                    owners: sidebarData.owners || [],
                    lawFirms: sidebarData.lawFirms || []
                });
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchTerm, selectedStatus, selectedItems]);

    const formatDate = (timestamp) => new Date(timestamp * 1000).toLocaleDateString();

    return (
        <div className="flex flex-col md:flex-row-reverse container mx-auto">
            <div className="hidden md:block md:w-1/4">
                <Suspense fallback={<SidebarSkeleton />}>
                    <Sidebar
                        selectedStatus={selectedStatus}
                        setSelectedStatus={setSelectedStatus}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                        data={sidebarData}
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                    />
                </Suspense>
            </div>

            <div className="w-full md:w-3/4 p-4 overflow-y-auto" style={{ height: 'calc(100vh - 5rem)' }}>
                <Suspense fallback={<SearchHeaderSkeleton />}>
                    <SearchHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} setSidebarOpen={setSidebarOpen} />
                </Suspense>

                <Suspense fallback={<TrademarkListSkeleton />}>
                    <TrademarkList
                        trademarks={trademarks}
                        loading={loading}
                        error={error}
                        viewMode={viewMode}
                        formatDate={formatDate}
                    />

                </Suspense>
            </div>

            <Suspense fallback={null}>
                <SidebarOverlay
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    data={sidebarData}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                />
            </Suspense>
        </div>
    );
};

export default SearchPage;