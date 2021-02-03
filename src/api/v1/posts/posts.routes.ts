import { Router } from "express";
import createPost from './createPost'
import getPostsByUser from "./getPostsByUser";

const router = Router();

router.get("/", getPostsByUser);
router.post("/", createPost)

export default router
