import Department from "../models/Department.js";

const getDepartments = async (req, res) => {
    try{
        const departments = await Department.find()
        return res.status(200).json({success:true, departments})
    } catch(error){
        return res.status(500).json({success: false, error: "get department server error"})
 
    }
}

const addDepartment = async (req, res) => {
    try{
        const {dep_name, description} = req.body;
        const newDep= new Department({
            dep_name,
            description
        })
        await newDep.save()
        return res.status(200).json({success:true, department:newDep})

    }catch(error){
        return res.status(500).json({success: false, error: "add department server error"})
    }

}

const getDepartment = async(req, res) => {
    try{
        const {id} = req.params;
        const department = await Department.findById({_id: id})
        return res.status(200).json({success:true, department})
    } catch(error){
        return res.status(500).json({success: false, error: "get department server error"})
 
    }
}

const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { dep_name, description } = req.body;

        // Validate input
        if (!dep_name || !description) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const updatedDep = await Department.findByIdAndUpdate(id, { dep_name, description }, { new: true });
        
        if (!updatedDep) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }

        return res.status(200).json({ success: true, updatedDep });
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deleteDep = await Department.findByIdAndDelete({_id: id})
        

        return res.status(200).json({ success: true, deleteDep });
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        return res.status(500).json({ success: false, error: "delete department Server Error" });
    }
}

export {addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment}