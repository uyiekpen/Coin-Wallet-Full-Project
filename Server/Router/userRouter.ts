import express from "express"

import { 
    getUser,
    Creatuser,
    signinUser,
    updateUser,
    deleteUser,
    getSingleUser
} from "../Controller/userController"

const  router = express.Router()

router.route("/").get(getUser);
router.route("/:id").get(getSingleUser);
router.route("/create").post(Creatuser);
router.route("/signin").post(signinUser);
router.route("/:id/update").patch(updateUser);
router.route("/:id/delete").delete(deleteUser);




export default router;