import Leave from '../models/Leave.js';
import Employee from '../models/Employee.js';

const addLeave = async (req, res) => {
    try {
        const { date, shift, rawMaterialStorage, solderPasteManagement, loaderManagement, gkgPrinterManagement, spiManagement, pickAndPlaceManagement } = req.body;

        // Check for required fields
        if (!date || !shift || !rawMaterialStorage || !solderPasteManagement || !loaderManagement || !gkgPrinterManagement || !spiManagement || !pickAndPlaceManagement) {
            return res.status(400).json({ success: false, error: "All fields are required." });
        }

        // Log the user ID being used for lookup
        console.log("User ID from request:", req.userId);

        // Find employee using req.userId
        const employee = await Employee.findOne({ userId: req.userId });
        console.log("Querying for employee with userId:", req.userId);

        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found." });
        }

        // Create new leave entry
        const newLeave = new Leave({
            employeeId: employee._id,
            date,
            shift,
            rawMaterialStorage,
            solderPasteManagement,
            loaderManagement,
            gkgPrinterManagement,
            spiManagement,
            pickAndPlaceManagement,
        });

        await newLeave.save();
        return res.status(200).json({ success: true });

    } catch (error) {
        console.log("Error adding leave:", error); // Log details for debugging
        return res.status(500).json({ success: false, error: "leave add server error" });
    }
};
const getLeave = async (req, res) => {
    try {
        const { id, role } = req.params;
        let leaves;
        
        if (role === "admin") {
            leaves = await Leave.find({ employeeId: id });
        } else {
            const employee = await Employee.findOne({ userId: id });
            leaves = await Leave.find({ employeeId: employee._id });
        }

        return res.status(200).json({ success: true, leaves });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: "leave retrieval server error" });
    }
};

const getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate({
            path: "employeeId",
            populate: [
                { path: 'department', select: 'dep_name' },
                { path: 'userId', select: 'name' }
            ]
        });

        return res.status(200).json({ success: true, leaves });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: "leave retrieval server error" });
    }
};

const getLeaveDetail = async (req, res) => {
    try {
        const { id } = req.params;
        
        const leave = await Leave.findById(id).populate({
            path: "employeeId",
            populate: [
                { path: 'department', select: 'dep_name' },
                { path: 'userId', select: 'name profileImage' }
            ]
        });

        if (!leave) {
            return res.status(404).json({ success: false, error: "Leave not found" });
        }

        return res.status(200).json({ success: true, leave });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: "leave detail server error" });
    }
};

const updateLeave = async (req, res) => {
    try {
        const { id } = req.params;
        
        const leave = await Leave.findByIdAndUpdate(id, { status: req.body.status }, { new: true });
        
        if (!leave) {
            return res.status(404).json({ success: false, error: "Leave not found" });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: "leave update server error" });
    }
};

export { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave };