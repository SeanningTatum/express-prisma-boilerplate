import { Router } from "express";
import createPost from './createPost'

const router = Router();

// router.get("/", getUsers);
router.post("/", createPost)

export default router
