import { Router } from "express";

import {
    createWallet,
    viewWallet,
    updateWallet
} from "../Controller/walletController"

const router = Router()

router.route("/:id/create").post(createWallet);

router.route("/:id/wallet").get(viewWallet);

router.route("/:myID/:recieverID").patch(updateWallet);

export default router