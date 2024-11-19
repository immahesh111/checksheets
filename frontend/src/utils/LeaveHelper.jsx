import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "70px",
    },
    {
        name: "Emp Id",
        selector: (row) => row.employeeId,
        width: "120px",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        width: "120px",
    },
   
    {
        name: "Department", // Added Department column
        selector: (row) => row.department,
        width: "170px",
    },
    {
        name: "Day", // Added Day column
        selector: (row) => row.date,
        width: "80px",
    },
    {
        name: "Shift", // Added Shift column
        selector: (row) => row.shift,
        width: "80px",
    },
    {
        name: "Status",
        selector: (row) => row.status,
        width: "120px",
    },
    {
        name: "Action",
        selector:(row) => row.action, // Use LeaveButtons for action
        center: true,
    },
];

export const LeaveButtons = ({ _id }) => {
    const navigate = useNavigate();

    const handleView = () => {
        navigate(`/admin-dashboard/leaves/${_id}`);
    };

    return (
        <button
            className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600"
            onClick={() => handleView(_id)}
        >
            View
        </button>
    );
};