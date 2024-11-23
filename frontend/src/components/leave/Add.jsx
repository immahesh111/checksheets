import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const { user } = useAuth();

    const [leave, setLeave] = useState({
        userId: user._id,
        date: new Date().toISOString().split('T')[0], // Automatically set current date
        shift: '', // Shift will be set based on user selection
        rawMaterialStorage: {
            question1: '',
            question2: '',
            question3: '',
            question4: '',
        },
        solderPasteManagement: {
            question5: '',
            question6: '',
            question7: '',
            question8: '',
            question9: '',
            question10: '',
            question11: '',
        },
        loaderManagement: {
            question12: '',
            question13: '',
            question14: '',
            question15: '',
            question16: '',
        },
        gkgPrinterManagement: {
            question17_stencilNo: '',
            question17_top: '',
            question17_bottom: '',
            question18: '',
            question19_printSpeed: '',
            question19_printGap: '',
            question19_cleanRate: '',
            question19_cleanMode: ''
        },
        spiManagement: {
            question21: '',
            question22: '',
            volumeStringMinimum: '', // Separate question for minimum volume
            volumeStringHighest: '',  // Separate question for highest volume
            areaStringMinimum: '',     // Separate question for minimum area
            areaStringHighest: '',     // Separate question for highest area
            heightStringMinimum: '',   // Separate question for minimum height
            heightStringHighest: '',    // Separate question for highest height
        },
        pickAndPlaceManagement: {
            question25: '',
            question26: '',
            question27: '',
            question28: '',
            question29: '',
            question30: '',
        },


    });

    const [showRawMaterialStorage, setShowRawMaterialStorage] = useState(false); // State to toggle Raw Material Storage questions
    const [showSolderPasteManagement, setShowSolderPasteManagement] = useState(false);
    const [showLoaderManagement, setShowLoaderManagement] = useState(false);
    const [showGKGPrinterManagement, setShowGKGPrinterManagement] = useState(false);
    const [showSPIMangement, setShowSPIMangement] = useState(false);

    const [showPickAndPlaceManagement, setShowPickAndPlaceManagement] = useState(false);
    const navigate = useNavigate();

  

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        console.log(`Input Name: ${name}, Input Value: ${value}`);  // Debugging log
    
        if (name.includes('.')) {
            const [subdivision, key, subKey] = name.split('.');
    
            if (subKey) {
                setLeave((prevState) => ({
                    ...prevState,
                    [subdivision]: {
                        ...prevState[subdivision],
                        [key]: {
                            ...prevState[subdivision][key],
                            [subKey]: value  // Update nested field directly.
                        }
                    }
                }));
            } else {
                setLeave((prevState) => ({
                    ...prevState,
                    [subdivision]: {
                        ...prevState[subdivision],
                        [key]: value  // Update non-nested field.
                    }
                }));
            }
        } else {
            setLeave((prevState) => ({
                ...prevState,
                [name]: value  // Update top-level field.
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting leave data:", leave); // Log leave data before submission

        try {
            const response = await axios.post(`http://localhost:5000/api/leave/add`, leave, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                navigate(`/employee-dashboard/leaves/${user._id}`);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-6'>Leave Application Form</h2>

            <form onSubmit={handleSubmit}>
                <div className='flex flex-col space-y-4'>
                    {/* Common Date Field */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Date:
                        </label>
                        <input
                            type='date'
                            name='date'
                            value={leave.date}
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        />
                    </div>

                    {/* Common Shift Selection */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Shift:
                        </label>
                        <select
                            name='shift'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        >
                            <option value="">Select Shift</option>
                            <option value="Day">Day</option>
                            <option value="Night">Night</option>
                        </select>
                    </div>

                    {/* Raw Material Storage Subdivision */}
                    <h3 className='text-lg font-bold cursor-pointer mt-4 p-2 border border-teal-500 bg-teal-100 rounded' onClick={() => setShowRawMaterialStorage(!showRawMaterialStorage)}>
                        Raw Material Storage
                    </h3>

                    {showRawMaterialStorage && (
                        <>
                            {/* Question 1 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    1. Whether Component reels as per feeder list and module based system?
                                </label>
                                <select
                                    name="rawMaterialStorage.question1"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Yes/No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            {/* Question 2 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    2. Whether component reels are in good condition?
                                </label>
                                <select
                                    name="rawMaterialStorage.question2"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Yes/No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            {/* Question 3 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    3. Whether component MBB puncher(MSL)?
                                </label>
                                <select
                                    name="rawMaterialStorage.question3"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Yes/No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            {/* Question 4 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    4. Loose material should have MSL tracking label during component open from packet?
                                </label>
                                <select
                                    name="rawMaterialStorage.question4"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Yes/No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </>
                    )}
                    {/*  Solder Paste/Glue Management */}
                    <h3 className='text-lg font-bold cursor-pointer mt-4 p-2 border border-teal-500 bg-teal-100 rounded' onClick={() => setShowSolderPasteManagement(!showSolderPasteManagement)}>
                        Solder Paste/Glue Management
                    </h3>

                    {showSolderPasteManagement && (
                        <>
                            {/* Question 5 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    5. Is correct solder paste used (brand/model)?
                                </label>
                                <select
                                    name="solderPasteManagement.question5"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Yes/No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            {/* Question 6 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    6. Solder paste/glue storage temperature (0–10°C)?
                                </label>
                                <input
                                    type='text'
                                    name='solderPasteManagement.question6'
                                    placeholder='Enter temperature in °C'
                                    onChange={handleChange}
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                    required
                                />
                            </div>

                            {/* Question 7 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    7. Check solder paste expiry date?
                                </label>
                                <input
                                    type='date'
                                    name='solderPasteManagement.question7'
                                    onChange={handleChange}
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                    required
                                />
                            </div>

                            {/* Question 8 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    8. Check solder paste thawing time?
                                </label>
                                <input
                                    type='text'
                                    name='solderPasteManagement.question8'
                                    placeholder='Enter thawing time'
                                    onChange={handleChange}
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                    required
                                />
                            </div>

                            {/* Question 9 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    9. Is the secondary use of solder paste used within 12 hours of the specific time?
                                </label>
                                <select
                                    name="solderPasteManagement.question9"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Yes/No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            {/* Question 10 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    10. The solder paste consumed as per FIFO?
                                </label>
                                <select
                                    name="solderPasteManagement.question10"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Yes/No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            {/* Question 11 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    11. Is solder paste tracking sheet and refrigerator temp. checksheet updated?
                                </label>
                                <select
                                    name="solderPasteManagement.question11"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Yes/No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </>
                    )}

                    {/*  Loader*/}
                    <h3 className='text-lg font-bold cursor-pointer mt-4 p-2 border border-teal-500 bg-teal-100 rounded' onClick={() => setShowLoaderManagement(!showLoaderManagement)}>
                        Loader
                    </h3>

                    {showLoaderManagement && (
                        <>
                            {/* Question 12 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    12. Is PCB loading direction correct?
                                </label>
                                <select
                                    name="loaderManagement.question12"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Yes/No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            {/* Question 13 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    13. Is PCB pallet at the front of magazine?
                                </label>
                                <select
                                    name="loaderManagement.question13"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Yes/No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            {/* Question 14 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    14.PCB panel max 50 no. should be in a magazine?
                                </label>
                                <select
                                    name="loaderManagement.question14"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Yes/No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            {/* Question 15 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    15.Whether each pallet is loaded in each magazine slot?
                                </label>
                                <select
                                    name="loaderManagement.question15"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Yes/No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            {/* Question 16 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    16.Whether push position is in centre of PCB Pallet?
                                </label>
                                <select
                                    name="loaderManagement.question16"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Yes/No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>


                        </>
                    )}



                    <h3 className='text-lg font-bold cursor-pointer mt-4 p-2 border border-teal-500 bg-teal-100 rounded' onClick={() => setShowGKGPrinterManagement(!showGKGPrinterManagement)}>
                        GKG Printer
                    </h3>

                    {showGKGPrinterManagement && (
                        <>
                            {/* Question 17 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    17. Stencil No:
                                </label>
                                <input
                                    type='text'
                                    name='gkgPrinterManagement.question17_stencilNo'
                                    value={leave.gkgPrinterManagement.question17_stencilNo || ''}
                                    onChange={handleChange}
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                    required
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    TOP:
                                </label>
                                <input
                                    type='text'
                                    name='gkgPrinterManagement.question17_top'
                                    value={leave.gkgPrinterManagement.question17_top}
                                    onChange={handleChange}
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                    required
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    BOTTOM:
                                </label>
                                <input
                                    type='text'
                                    name='gkgPrinterManagement.question17_bottom'
                                    value={leave.gkgPrinterManagement.question17_bottom}
                                    onChange={handleChange}
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                    required
                                />
                            </div>

                            {/* Question 18 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    18. Is stencil cleaning and tension checklist updated?
                                </label>
                                <select
                                    name="gkgPrinterManagement.question18"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Yes/No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            {/* Printing Parameters Heading */}
                            <h4 className='text-lg font-bold mt-4'>19. Printing Parameters</h4>

                            {/* Squeege Pressure Subheading */}
                            <h5 className='text-md font-semibold mt-2'>Squeege Pressure</h5>

                            {/* Question 19 - Print Speed */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Print Speed:
                                </label>
                                <input
                                    type='text'
                                    name='gkgPrinterManagement.question19_printSpeed'
                                    value={leave.gkgPrinterManagement.question19_printSpeed}
                                    onChange={handleChange}
                                    placeholder='Enter print speed'
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                    required
                                />
                            </div>

                            {/* Question 19 - Print Gap */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Print Gap:
                                </label>
                                <input
                                    type='text'
                                    name='gkgPrinterManagement.question19_printGap'
                                    value={leave.gkgPrinterManagement.question19_printGap}
                                    onChange={handleChange}
                                    placeholder='Enter print gap'
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                    required
                                />
                            </div>

                            {/* Question 19 - Clean Rate */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Clean Rate:
                                </label>
                                <input
                                    type='text'
                                    name='gkgPrinterManagement.question19_cleanRate'
                                    value={leave.gkgPrinterManagement.question19_cleanRate}
                                    onChange={handleChange}
                                    placeholder='Enter clean rate'
                                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                    required
                                />
                            </div>

                            {/* Question 19 - Clean Mode */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Clean Mode:
                                </label>
                                <div className="flex space-x-4 mt-1">
                                    {['D', 'W', 'V'].map((mode) => (
                                        <div key={mode}>
                                            <input
                                                type="radio"
                                                name="gkgPrinterManagement.question19_cleanMode"
                                                value={mode}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label>{mode}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </>
                    )}
                    {/* SPI */}

                    <h3 className='text-lg font-bold cursor-pointer mt-4 p-2 border border-teal-500 bg-teal-100 rounded' onClick={() => setShowSPIMangement(!showSPIMangement)}>
                        SPI
                    </h3>

                    {showSPIMangement && (
                        <>
                            {/* Question 21 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    21. SPI m/c program name matches the actual product model?
                                </label>
                                <select
                                    name="spiManagement.question21"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Yes/No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            {/* Question 22 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    22. Whether SPI m/c detects the defects?
                                </label>
                                <select
                                    name="spiManagement.question22"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Yes/No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            {/* Volume Section */}
                            <h4 className='text-md font-bold mt-4'>Volume</h4>
                            <div className='flex flex-col space-y-4'>
                                <div className='flex flex-col'>
                                    <label className='block text-sm font-medium text-gray-700'>Minimum Volume:</label>
                                    <input
                                        type='text'
                                        name='spiManagement.volumeStringMinimum'
                                        value={leave.spiManagement.volumeStringMinimum}
                                        onChange={handleChange}
                                        placeholder='Enter minimum volume'
                                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                        required
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='block text-sm font-medium text-gray-700'>Highest Volume:</label>
                                    <input
                                        type='text'
                                        name='spiManagement.volumeStringHighest'
                                        value={leave.spiManagement.volumeStringHighest}
                                        onChange={handleChange}
                                        placeholder='Enter highest volume'
                                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                        required
                                    />
                                </div>
                            </div>

                            {/* Area Section */}
                            <h4 className='text-md font-bold mt-4'>Area</h4>
                            <div className='flex flex-col space-y-4'>
                                <div className='flex flex-col'>
                                    <label className='block text-sm font-medium text-gray-700'>Minimum Area:</label>
                                    <input
                                        type='text'
                                        name='spiManagement.areaStringMinimum'
                                        value={leave.spiManagement.areaStringMinimum}
                                        onChange={handleChange}
                                        placeholder='Enter minimum area'
                                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                        required
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='block text-sm font-medium text-gray-700'>Highest Area:</label>
                                    <input
                                        type='text'
                                        name='spiManagement.areaStringHighest'
                                        value={leave.spiManagement.areaStringHighest}
                                        onChange={handleChange}
                                        placeholder='Enter highest area'
                                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                        required
                                    />
                                </div>
                            </div>

                            {/* Height Section */}
                            <h4 className='text-md font-bold mt-4'>Height</h4>
                            <div className='flex flex-col space-y-4'>
                                <div className='flex flex-col'>
                                    <label className='block text-sm font-medium text-gray-700'>Minimum Height:</label>
                                    <input
                                        type='text'
                                        name='spiManagement.heightStringMinimum'
                                        value={leave.spiManagement.heightStringMinimum}
                                        onChange={handleChange}
                                        placeholder='Enter minimum height'
                                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                        required
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='block text-sm font-medium text-gray-700'>Highest Height:</label>
                                    <input
                                        type='text'
                                        name='spiManagement.heightStringHighest'
                                        value={leave.spiManagement.heightStringHighest}
                                        onChange={handleChange}
                                        placeholder='Enter highest height'
                                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                        required
                                    />
                                </div>
                            </div>

                        </>
                    )}

                    {/* Pick & Place (Mounter) */}

                    <h3 className='text-lg font-bold cursor-pointer mt-4 p-2 border border-teal-500 bg-teal-100 rounded' onClick={() => setShowPickAndPlaceManagement(!showPickAndPlaceManagement)}>
                        Pick & Place (Mounter)
                    </h3>

                    {showPickAndPlaceManagement && (
                        <>
                            {/* Question 25 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    25. Whether the SMT material corresponds to the BOM?
                                </label>
                                <select
                                    name="pickAndPlaceManagement.question25"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Yes/No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            {/* Question 26 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    26. To check whether any ECN/DCN have been done online or running model?
                                </label>
                                <select
                                    name="pickAndPlaceManagement.question26"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Yes/No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            {/* Question 27 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    27. To check whether component verification has been done before start of the shift, during change over and during splicing?
                                </label>
                                <select
                                    name="pickAndPlaceManagement.question27"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Yes/No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            {/* Question 28 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    28. Check whether the maintenance of m/c is done?
                                </label>
                                <select
                                    name="pickAndPlaceManagement.question28"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Yes/No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            {/* Question 29 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    29. Whether the MSD components are managed and filled in as required and are used within the specified time?
                                </label>
                                <select
                                    name="pickAndPlaceManagement.question29"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Yes/No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            {/* Question 30 */}
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    30. Program as per running model wrt Controlled Feeder List?
                                </label>
                                <select
                                    name="pickAndPlaceManagement.question30"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Yes/No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </>
                    )}

                    {/* Submit Button */}
                    <button
                        type='submit'
                        className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Add;