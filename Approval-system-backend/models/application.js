import { application } from "express";
import mongoose from "mongoose";

//applicationSchema - applicant, resume, status, currentStage, remark
//remarkSchema- reviewer, remark, status, date, 

const remarkSchema = new mongoose.Schema({
    reviewer:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    remark:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['Approved', 'Reject'],
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

//applicationSchema - applicant, resume, status, currentStage, remark

const applicationSchema = new mongoose.Schema({
    applicant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    resume:{
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Approved','in Review', 'Pending','Rejected'],
        default: 'Pending',
        required: true
    },
    currentStage:{
        type: String,
        enum: ['Reviewer 1', 'Reviewr 2', 'Reviewer 3', 'Approver'],
        //required: true
        default: 'Reviewer 1'
    },
    remark: [remarkSchema] ,
},{
    timestamps: true
})
export default mongoose.model('Application',applicationSchema)
