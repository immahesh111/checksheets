import mongoose from "mongoose";
import { Schema } from "mongoose";

const leaveSchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    shift: { type: String, required: true }, // Added shift field
    date: { type: Date, required: true }, // Assuming you want to keep track of the date
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    appliedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    // Raw Material Storage Questions
    rawMaterialStorage: {
        question1: { type: String },
        question2: { type: String },
        question3: { type: String },
        question4: { type: String },
    },

    // Solder Paste Management Questions
    solderPasteManagement: {
        question5: { type: String },
        question6: { type: String },
        question7: { type: Date }, // Expiry date
        question8: { type: String }, // Thawing time
        question9: { type: String }, // Yes/No
        question10: { type: String }, // Yes/No
        question11: { type: String }, // Yes/No
    },

    // Loader Management Questions
    loaderManagement: {
        question12: { type: String }, // Yes/No
        question13: { type: String }, // Yes/No
        question14: { type: String }, // Yes/No
        question15: { type: String }, // Yes/No
        question16: { type: String }, // Yes/No
    },

    // GKG Printer Management Questions
    gkgPrinterManagement: {
        question17_stencilNo: { type: String },
        question17_top: { type: String },
        question17_bottom: { type: String },
        question18: { type: String }, // Yes/No
        question19_printSpeed: { type: String },
        question19_printGap: { type: String },
        question19_cleanRate: { type: String },
        question19_cleanMode:{type:String}  // Radio button value (D, W, V)
    },

    // SPI Management Questions
    spiManagement: {
        question21: { type: String },
        question22: { type: String },
        volumeStringMinimum: { type: String },  // Separate field for minimum volume
        volumeStringHighest: { type: String },   // Separate field for highest volume
        areaStringMinimum: { type: String },      // Separate field for minimum area
        areaStringHighest: { type: String },      // Separate field for highest area
        heightStringMinimum: { type: String },    // Separate field for minimum height
        heightStringHighest: { type: String }     // Separate field for highest height
    },

    // Pick & Place Management Questions
    pickAndPlaceManagement:{
        question25:{type:String}, // Yes/No
        question26:{type:String}, // Yes/No
        question27:{type:String}, // Yes/No
        question28:{type:String}, // Yes/No
        question29:{type:String}, // Yes/No
        question30:{type:String}  // Yes/No
    }
});

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;