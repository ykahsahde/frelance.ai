import Project from "../models/Project.js"

// Create Project
export const createProject = async (req,res) =>{
  try {
     const {title,description,budget} = req.body;

     const project = await Project.create({
        title,
        description,
        budget,
        user:req.user.id
     });
     res.status(201).json(project);
  } catch (error) {
     res.status(200).json({message:error.message})
  }
};
// Get all projects

export const getProjects = async(req,res)=>{
 try {
    const projects = await Project.find().populate("user","name email");
    res.json(projects)
 } catch (error) {
    res.status(500).json({message:error.message})
 }
};

// Get single project
export const getProjectById= async (req,res)=>{
    try {
        const project = await Project.findById(req.params.id);
    if(!project){
        return res.status(404).json({message:"Project not found"})
    }
    res.json(project)
        
    } catch (error) {
       res.status(500).json({message :error.message}) 
    }
    
};

// Update Project

export const updateProject = async (req,res) =>{
   try {
     const project = await Project.findById(req.params.id);
    if(!project){
        return res.status(404).json({message:"Project Not Found"})
    }
     // check owner
     if(project.user.toString()!==req.user._id.toString()){
        return res.status(401).json({message:"Not Authorized"});
    }

    project.title = req.body.title || project.title;
    project.description=req.body.decription||project.description;
    project.budget = req.body.budget||project.budget;
    const updateProject = await project.save();
    res.json(updateProject)
    
   } catch (error) {
    res.status(500).json({message:message.error})
   }
};
// Delete Project

export const deleteProject = async (req,res) => {
    try {
        const project = await Project.findById(req.params.id);
        if(!project){
            return res.status(404).json({message:"Project Not Found"})
        }

        if(project.user.toString()!==req.user.id.toString()){
            return res.status(401).json({message:"Not Authorized"});
         }
        await project.deleteOne();
        res.json({message:"Project Removed"})
       
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

   


