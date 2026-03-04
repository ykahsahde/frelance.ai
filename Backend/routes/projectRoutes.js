import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { createProject, deleteProject, getProjectById, getProjects, updateProject } from "../controllers/projectController.js"



const router = express.Router()

router.route("/")
      .post(protect,createProject)
      .get(getProjects);
router.route("/:id")
      .get(getProjectById)
      .put(protect,updateProject)
      .delete(protect,deleteProject);

export default router;