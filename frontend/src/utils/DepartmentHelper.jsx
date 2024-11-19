import { useNavigate } from "react-router-dom"
import axios from "axios"

export const columns =[
    {
        name: "S No",
        selector: (row) => row.sno
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        selector: (row) => row.action
    },
]

export const DepartmentButtons = ({_id, onDepartmentDelete}) => {
    console.log("Attempting to delete department with ID:", _id);
    const navigate = useNavigate()

    const handleDelete = async (id) => {
        const confirm = window.confirm("Do you want to delete?");
        if (confirm) {
            try {
                console.log("Attempting to delete department with ID:", id);
                const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
    
                if (response.data.success) {
                    onDepartmentDelete(id);
                    alert("Department deleted successfully.");
                }
            } catch (error) {
                console.error("Error deleting department:", error); // Log detailed error for debugging
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error || "An unexpected error occurred.");
                } else {
                    alert("An unexpected error occurred.");
                }
            }
        }
    };
    
    return(
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white"
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >Edit</button>
            <button className="px-3 py-1 bg-red-600 text-white"
            onClick={() => handleDelete(_id)}>Delete</button>
    </div>
    )
    
}