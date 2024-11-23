import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Detail = () => {
    const { id } = useParams();
    const [leave, setLeave] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/leave/detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
        
                if (response.data.success) {
                    console.log("Fetched Leave Data:", response.data.leave); // Log fetched data
                    setLeave(response.data.leave);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        };

        fetchLeave();
    }, [id]);
    const changeStatus = async (id, status) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/leave/${id}`, { status }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                navigate('/admin-dashboard/leaves');
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <>
            {leave ? (
                <div className='max-w-6xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
                    <h2 className='text-2xl font-bold mb-8 text-center'>
                        Leave Details
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {/* Left Column */}
                        <div className='flex flex-col space-y-4'>
                            {/* Status Section */}
                            <div className='flex justify-between mb-4'>
                                <span className='text-lg font-bold'>Status:</span>
                                {leave.status === "Pending" ? (
                                    <>
                                        {/* Approval and Rejection Buttons */}
                                        <button
                                            onClick={() => changeStatus(leave._id, "Approve")}
                                            className='px-4 py-1 bg-teal-600 text-white rounded hover:bg-teal-700'
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => changeStatus(leave._id, "Rejected")}
                                            className='px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700'
                                        >
                                            Reject
                                        </button>
                                    </>
                                ) : (
                                    <span className='font-medium'>{leave.status}</span>
                                )}
                            </div>

                            {/* Display Raw Material Storage Questions and Answers */}
                            {leave.rawMaterialStorage && (
                                <div className="border-t border-b pt-4 pb-4">
                                    <h3 className="text-lg font-bold mb-4">Raw Material Storage Questions</h3>

                                    {/* Question 1 */}
                                    <div className="flex justify-between mb-2">
                                        <span>1. Whether Component reels as per feeder list and module based system?</span>
                                        <span>{leave.rawMaterialStorage.question1 || 'Not answered'}</span>
                                    </div>

                                    {/* Question 2 */}
                                    <div className="flex justify-between mb-2">
                                        <span>2. Whether component reels are in good condition?</span>
                                        <span>{leave.rawMaterialStorage.question2 || 'Not answered'}</span>
                                    </div>

                                    {/* Question 3 */}
                                    <div className="flex justify-between mb-2">
                                        <span>3. Whether component MBB puncher(MSL)?</span>
                                        <span>{leave.rawMaterialStorage.question3 || 'Not answered'}</span>
                                    </div>

                                    {/* Question 4 */}
                                    <div className="flex justify-between mb-2">
                                        <span>4. Loose material should have MSL tracking label during component open from packet?</span>
                                        <span>{leave.rawMaterialStorage.question4 || 'Not answered'}</span>
                                    </div>
                                </div>
                            )}

                            {/* Display Solder Paste Management Questions and Answers */}
                            {leave.solderPasteManagement && (
                                <div className="border-t border-b pt-4 pb-4">
                                    <h3 className="text-lg font-bold mb-4">Solder Paste Management Questions</h3>

                                    {/* Question 5 */}
                                    <div className="flex justify-between mb-2">
                                        <span>5. Is correct solder paste used (brand/model)?</span>
                                        <span>{leave.solderPasteManagement.question5 || 'Not answered'}</span>
                                    </div>

                                    {/* Question 6 */}
                                    <div className="flex justify-between mb-2">
                                        <span>6. Solder paste/glue storage temperature (0–10°C)?</span>
                                        <span>{leave.solderPasteManagement.question6 || 'Not answered'}</span>
                                    </div>

                                    {/* Question 7 */}
                                    <div className="flex justify-between mb-2">
                                        <span>7. Check solder paste expiry date?</span>
                                        <span>{leave.solderPasteManagement.question7 ? new Date(leave.solderPasteManagement.question7).toLocaleDateString() : 'Not answered'}</span>
                                    </div>

                                    {/* Question 8 */}
                                    <div className="flex justify-between mb-2">
                                        <span>8. Check solder paste thawing time?</span>
                                        <span>{leave.solderPasteManagement.question8 || 'Not answered'}</span>
                                    </div>

                                    {/* Question 9 */}
                                    <div className="flex justify-between mb-2">
                                        <span>9. Is the secondary use of solder paste used within 12 hours of the specific time?</span>
                                        <span>{leave.solderPasteManagement.question9 || 'Not answered'}</span>
                                    </div>

                                    {/* Question 10 */}
                                    <div className="flex justify-between mb-2">
                                        <span>10. The solder paste consumed as per FIFO?</span>
                                        <span>{leave.solderPasteManagement.question10 || 'Not answered'}</span>
                                    </div>

                                    {/* Question 11 */}
                                    <div className="flex justify-between mb-2">
                                        <span>11. Is solder paste tracking sheet and refrigerator temp. checksheet updated?</span>
                                        <span>{leave.solderPasteManagement.question11 || 'Not answered'}</span>
                                    </div>
                                </div>
                            )}

                            {/* Display Loader Management Questions and Answers */}
                            {leave.loaderManagement && (
                                <div className="border-t border-b pt-4 pb-4">
                                    <h3 className="text-lg font-bold mb-4">Loader Management Questions</h3>

                                    {/* Question 12 */}
                                    <div className="flex justify-between mb-2">
                                        <span>12. Is PCB loading direction correct?</span>
                                        <span>{leave.loaderManagement.question12 || 'Not answered'}</span>
                                    </div>

                                    {/* Question 13 */}
                                    <div className="flex justify-between mb-2">
                                        <span>13. Is PCB pallet at the front of magazine?</span>
                                        <span>{leave.loaderManagement.question13 || 'Not answered'}</span>
                                    </div>

                                    {/* Question 14 */}
                                    <div className="flex justify-between mb-2">
                                        <span>14. PCB panel max 50 no. should be in a magazine?</span>
                                        <span>{leave.loaderManagement.question14 || 'Not answered'}</span>
                                    </div>

                                    {/* Question 15 */}
                                    <div className="flex justify-between mb-2">
                                        <span>15. Whether each pallet is loaded in each magazine slot?</span>
                                        <span>{leave.loaderManagement.question15 || 'Not answered'}</span>
                                    </div>

                                    {/* Question 16 */}
                                    <div className="flex justify-between mb-2">
                                        <span>16. Whether push position is in centre of PCB Pallet?</span>
                                        <span>{leave.loaderManagement.question16 || 'Not answered'}</span>
                                    </div>
                                </div>
                            )}

                            {/* Display GKG Printer Management Questions and Answers */}
                            {leave.gkgPrinterManagement && (
                                <div className="border-t border-b pt-4 pb-4">
                                    <h3 className="text-lg font-bold mb-4">GKG Printer Management Questions</h3>

                                    {/* Question 17 - Stencil No */}
                                    <div className="flex justify-between mb-2">
                                        <span>17. Stencil No:</span>
                                        <span>{leave.gkgPrinterManagement.question17_stencilNo || 'Not answered'}</span>
                                    </div>

                                    {/* Question 18 - TOP */}
                                    <div className="flex justify-between mb-2">
                                        <span>TOP:</span>
                                        <span>{leave.gkgPrinterManagement.question17_top || 'Not answered'}</span>
                                    </div>

                                    {/* Question 19 - BOTTOM */}
                                    <div className="flex justify-between mb-2">
                                        <span>BOTTOM:</span>
                                        <span>{leave.gkgPrinterManagement.question17_bottom || 'Not answered'}</span>
                                    </div>

                                    {/* Question 20 - Is stencil cleaning and tension checklist updated? */}
                                    <div className="flex justify-between mb-2">
                                        <span>18. Is stencil cleaning and tension checklist updated?</span>
                                        <span>{leave.gkgPrinterManagement.question18 || 'Not answered'}</span>
                                    </div>

                                    {/* Printing Parameters Heading */}
                                    <h4 className='text-lg font-bold mt-4'>19. Printing Parameters</h4>

                                    {/* Squeege Pressure Subheading */}
                                    <h5 className='text-md font-semibold mt-2'>Squeege Pressure</h5>

                                    {/* Question 19 - Print Speed */}
                                    <div className="flex justify-between mb-2">
                                        <span>Print Speed:</span>
                                        <span>{leave.gkgPrinterManagement.question19_printSpeed || 'Not answered'}</span>
                                    </div>

                                    {/* Question 19 - Print Gap */}
                                    <div className="flex justify-between mb-2">
                                        <span>Print Gap:</span>
                                        <span>{leave.gkgPrinterManagement.question19_printGap || 'Not answered'}</span>
                                    </div>

                                    {/* Question 19 - Clean Rate */}
                                    <div className="flex justify-between mb-2">
                                        <span>Clean Rate:</span>
                                        <span>{leave.gkgPrinterManagement.question19_cleanRate || 'Not answered'}</span>
                                    </div>

                                    {/* Question 19 - Clean Mode */}
                                    <div className="flex justify-between mb-2">
                                        <span>Clean Mode:</span>
                                        <span>{leave.gkgPrinterManagement.question19_cleanMode || 'Not answered'}</span>
                                    </div>
                                </div>
                            )}

                            {/* Display SPI Management Questions and Answers */}
                            {leave.spiManagement && (
                                <div className="border-t border-b pt-4 pb-4">
                                    <h3 className="text-lg font-bold mb-4">SPI Management Questions</h3>

                                    {/* Question 21 - SPI m/c program name matches the actual product model */}
                                    <div className="flex justify-between mb-2">
                                        <span>21. SPI m/c program name matches the actual product model?</span>
                                        <span>{leave.spiManagement.question21 || 'Not answered'}</span>
                                    </div>

                                    {/* Question 22 - Whether SPI m/c detects the defects */}
                                    <div className="flex justify-between mb-2">
                                        <span>22. Whether SPI m/c detects the defects?</span>
                                        <span>{leave.spiManagement.question22 || 'Not answered'}</span>
                                    </div>

                                    {/* Volume Section */}
                                    <h4 className='text-md font-bold mt-4'>Volume</h4>
                                    <div className='flex space-x-4'>
                                        <div className='flex flex-col'>
                                            <label className='block text-sm font-medium text-gray-700'>Minimum Volume:</label>
                                            <span>{leave.spiManagement.volumeStringMinimum || 'Not answered'}</span>
                                        </div>
                                        <div className='flex flex-col'>
                                            <label className='block text-sm font-medium text-gray-700'>Highest Volume:</label>
                                            <span>{leave.spiManagement.volumeStringHighest || 'Not answered'}</span>
                                        </div>
                                    </div>

                                    {/* Area Section */}
                                    <h4 className='text-md font-bold mt-4'>Area</h4>
                                    <div className='flex space-x-4'>
                                        <div className='flex flex-col'>
                                            <label className='block text-sm font-medium text-gray-700'>Minimum Area:</label>
                                            <span>{leave.spiManagement.areaStringMinimum || 'Not answered'}</span>
                                        </div>
                                        <div className='flex flex-col'>
                                            <label className='block text-sm font-medium text-gray-700'>Highest Area:</label>
                                            <span>{leave.spiManagement.areaStringHighest || 'Not answered'}</span>
                                        </div>
                                    </div>

                                    {/* Height Section */}
                                    <h4 className='text-md font-bold mt-4'>Height</h4>
                                    <div className='flex space-x-4'>
                                        <div className='flex flex-col'>
                                            <label className='block text-sm font-medium text-gray-700'>Minimum Height:</label>
                                            <span>{leave.spiManagement.heightStringMinimum || 'Not answered'}</span>
                                        </div>
                                        <div className='flex flex-col'>
                                            <label className='block text-sm font-medium text-gray-700'>Highest Height:</label>
                                            <span>{leave.spiManagement.heightStringHighest || 'Not answered'}</span>
                                        </div>
                                    </div>

                                </div>
                            )}

                            {/* Display Pick & Place Management Questions and Answers */}
                            {leave.pickAndPlaceManagement && (
                                <div className="border-t border-b pt-4 pb-4">
                                    <h3 className="text-lg font-bold mb-4">Pick & Place Management Questions</h3>

                                    {/* Question 25 - Whether the SMT material corresponds to the BOM */}
                                    <div className="flex justify-between mb-2">
                                        <span>25. Whether the SMT material corresponds to the BOM?</span>
                                        <span>{leave.pickAndPlaceManagement.question25 || 'Not answered'}</span>
                                    </div>

                                    {/* Question 26 - Check whether any ECN/DCN have been done online or running model */}
                                    <div className="flex justify-between mb-2">
                                        <span>26. To check whether any ECN/DCN have been done online or running model?</span>
                                        <span>{leave.pickAndPlaceManagement.question26 || 'Not answered'}</span>
                                    </div>

                                    {/* Question 27 - Check whether component verification has been done */}
                                    <div className="flex justify-between mb-2">
                                        <span>27. To check whether component verification has been done before start of the shift, during change over and during splicing?</span>
                                        <span>{leave.pickAndPlaceManagement.question27 || 'Not answered'}</span>
                                    </div>

                                    {/* Question 28 - Check whether the maintenance of m/c is done */}
                                    <div className="flex justify-between mb-2">
                                        <span>28. Check whether the maintenance of m/c is done?</span>
                                        <span>{leave.pickAndPlaceManagement.question28 || 'Not answered'}</span>
                                    </div>

                                    {/* Question 29 - Whether the MSD components are managed and filled in as required */}
                                    <div className="flex justify-between mb-2">
                                        <span>29. Whether the MSD components are managed and filled in as required and are used within the specified time?</span>
                                        <span>{leave.pickAndPlaceManagement.question29 || 'Not answered'}</span>
                                    </div>

                                    {/* Question 30 - Program as per running model wrt Controlled Feeder List */}
                                    <div className="flex justify-between mb-2">
                                        <span>30. Program as per running model wrt Controlled Feeder List?</span>
                                        <span>{leave.pickAndPlaceManagement.question30 || 'Not answered'}</span>
                                    </div>
                                </div>
                            )}



                        </div>

                        {/* Right Column - Empty or Additional Details */}
                        <div className='flex flex-col space-y-4'>
                            {/* You can add any additional details here if needed */}
                            {/* Currently empty as per your request to remove specific details */}
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default Detail;