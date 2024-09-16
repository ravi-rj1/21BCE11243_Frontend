/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Sidebar from './Sidebar';

const SidebarOverlay = ({ 
    sidebarOpen, 
    setSidebarOpen, 
    selectedStatus, 
    setSelectedStatus, 
    selectedItems, 
    setSelectedItems, 
    data, 
    viewMode, 
    setViewMode 
}) => (
    <AnimatePresence>
        {sidebarOpen && (
            <>
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSidebarOpen(false)}
                ></motion.div>

                <motion.div
                    className="fixed top-0 right-0 w-64 bg-white shadow-lg z-20 h-full p-4 md:hidden"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold">Filters</h3>
                        <button onClick={() => setSidebarOpen(false)}>
                            <X size={24} />
                        </button>
                    </div>
                    <Sidebar
                        selectedStatus={selectedStatus}
                        setSelectedStatus={setSelectedStatus}
                        selectedItems={selectedItems} // Corrected prop
                        setSelectedItems={setSelectedItems} // Corrected prop
                        data={data} // Corrected prop
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                    />
                </motion.div>
            </>
        )}
    </AnimatePresence>
);

export default SidebarOverlay;
