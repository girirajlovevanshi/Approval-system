import Application from '../models/Application.js';
import User from '../models/user.js';


//new application
export const createApplication = async (req,res)=>{
    const { resume } = req.body ;
    try {
        
        const application = await Application.create({
            applicant: req.user._id,
            resume,
            status: "Pending",
            currentStage: 'Reviewer 1', //enum values must be same else getting errors
        })
        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//deatils of single application

export const getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate('applicant', 'name email')
            .populate('remarks.reviewer', 'name email role'); 

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Approve or Reject an Application
export const reviewApplication = async (req,res) =>{
    const { status, remark } = req.body; // status can be approved or rejected and can add remark 
    try {
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        if (req.user.role !== 'reviewer') {
            return res.status(403).json({ message: 'Only reviewers can review applications' });
        }

        // reviewers current stage
        if (req.user.role === 'reviewer' && req.user._id.toString() !== application.currentReviewer.toString()) {
            return res.status(403).json({ message: 'You are not assigned to this application stage' });
        }

        //remark
        application.remarks.push({
            reviewer: req.user._id,
            remark,
            status,
        });

        // Approval and rejection
        if (status === 'Approved') {

            if (application.currentStage === 'Reviewer 1') {
                application.currentStage = 'Reviewer 2';
            } else if (application.currentStage === 'Reviewer 2') {
                application.currentStage = 'Reviewer 3';
            } else if (application.currentStage === 'Reviewer 3') {
                application.currentStage = 'Approver'; // Final Approver
            } else {
                return res.status(400).json({ message: 'Invalid application stage for review' });
            }
            application.status = 'in Review'; // Updating the overall status
        } else if (status === 'Rejected') {
            application.status = 'Rejected'; // Mark as rejected
        }
        
        //Saving Updateted application 
        await application.save();

        res.json(application);

        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Application review by Approver
export const approveApplication = async (req, res) => {
    const { status, remark } = req.body; // can be Approved or Rejected

    try {
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // need to ensure user is an approver
        if (req.user.role !== 'Approver') {
            return res.status(403).json({ message: 'Only approvers can  accress' });
        }

        // Ensuring that the application on approver stage
        if (application.currentStage !== 'Approver') {
            return res.status(400).json({ message: ' Application is not in the approver stage' });
        }

        // Adding the final remark
        application.remarks.push({
            reviewer: req.user._id,
            remark,
            status,
        });

        // Updating application status
        if (status === 'Approved') {
            application.status = 'Approved';
        } else if (status === 'Rejected') {
            application.status = 'Rejected';
        } else {
            return res.status(400).json({ message: 'Invalid status provided' });
        }

        // updated application
        await application.save();

        res.json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

