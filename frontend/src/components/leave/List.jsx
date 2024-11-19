import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const List = () => {
    const [leaves, setLeaves] = useState(null);
    let sno = 1;
    const { id } = useParams();
    const { user } = useAuth();

    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/leave/${id}/${user.role}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });

            console.log(response.data);
            if (response.data.success) {
                setLeaves(response.data.leaves);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    if (!leaves) {
        return <div>Loading...</div>;
    }

    return (
        <div className='p-6'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Filled CheckSheets</h3>
            </div>

            <div className='flex justify-between items-center'>
                <input type="text" placeholder='Search By Dept Name' className='px-4 py-0.5 border'></input>
                {user.role === "employee" && 
                    <Link to="/employee-dashboard/add-leave" className='px-4 py-1 bg-teal-600 rounded text-white'>Fill New CheckSheet</Link>}
            </div>

            <table className='w-full text-sm text-left text-gray-500 mt-6'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-500 border border-gray-200'>
                    <tr>
                        <th className='px-6 py-3'>SNO</th>
                        <th className='px-6 py-3'>Day</th> {/* Added Day column */}
                        <th className='px-6 py-3'>Shift</th> {/* Added Shift column */}
                        <th className='px-6 py-3'>Status</th> {/* Status column */}
                    </tr>
                </thead>

                <tbody>
                    {leaves.map((leave) => (
                        <tr
                            key={leave._id}
                            className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>

                            <td className='px-6 py-3'>{sno++}</td>
                            <td className='px-6 py-3'>{leave.date || 'Not specified'}</td> {/* Display Day */}
                            <td className='px-6 py-3'>{leave.shift || 'Not specified'}</td> {/* Display Shift */}
                            <td className='px-6 py-3'>{leave.status}</td> {/* Display Status */}

                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default List;