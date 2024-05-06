import express from "express";
import getUserInfo from "../database/userInfoModel";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const result = await getUserInfo(req.body);
    res.json(result[0].nickname);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error!" });
  }
});

export default router;
