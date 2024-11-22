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
