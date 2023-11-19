import express from "express";
import {register,login,logout,refetch} from '../controller/auth.js'
const router= express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/refetch",refetch);



export default router;