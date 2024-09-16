/* eslint-disable react/prop-types */

import { FileImage, ArrowRight } from 'lucide-react';
import ReactReadMoreReadLess from "react-read-more-read-less";
const TrademarkSkelnton = () => {
  return (
    <>
      <div className="h-16 bg-gray-200 rounded animate-pulse mb-4"></div>
      
    </>
  )
}


const TrademarkList = ({ trademarks, loading, error, formatDate, searchTerm }) => {
  console.log("tademarks", trademarks)
  if (loading) return(
    <>
      <TrademarkSkelnton />
      <TrademarkSkelnton />
      <TrademarkSkelnton />
      <TrademarkSkelnton />
      <TrademarkSkelnton />
      <TrademarkSkelnton />
      <TrademarkSkelnton />
      <TrademarkSkelnton />
    </>
  );
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-x-auto no-scrollbar">
      <h2 className="text-xl font-semibold p-4 border-b">
        About {trademarks.length} Trademarks found for &quot;{searchTerm || "nike"}&quot;
      </h2>
      <div className="p-4 bg-gray-50 border-b">
        <p className="text-sm text-gray-600">Also try searching for</p>
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">nike</span>
          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">nik</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mark
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Class/Description
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {trademarks.map((tm, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                    <FileImage size={24} className="text-gray-400" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {tm.mark_identification}
                  </div>
                  <div className="text-sm text-gray-500">
                    {tm.current_owner}
                  </div>
                  <div className="text-sm text-gray-500">
                    {tm.registration_number}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(tm.filing_date)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {tm.status_type}
                  </span>
                  <div className="text-sm text-gray-500 mt-1">
                    on {formatDate(tm.registration_date)}
                  </div>
                  <div className="text-sm text-red-500 mt-1">
                    <ArrowRight size={12} className="inline mr-1" />
                    {formatDate(tm.renewal_date)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    <ReactReadMoreReadLess
                      charLimit={200}
                      readMoreText={"Read more ▼"}
                      readLessText={"Read less ▲"}
                    >
                      {tm.mark_description_description.join(', ')}
                    </ReactReadMoreReadLess>

                  </div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {tm.class_codes.map((cls, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        <svg
                          className="mr-1.5 h-2 w-2 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 8 8"
                        >
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                        Class {cls}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrademarkList;
