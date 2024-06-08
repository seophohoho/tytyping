import express from "express";
import isCorrectWord from "../controllers/inGameController";
const router = express.Router();

router.post("/is-correct", async (req: any, res: any) => {
  const { word } = req.body;
  const result = await isCorrectWord(word);
  const parse = JSON.parse(result);
  // console.log(parse);
  if (parse.channel.total === "0") {
    return res.status(200).json({ message: false });
  } else if (parse.channel.total === "1") {
    if (parse.channel.item.word === word) {
      return res.status(200).json({ message: true });
    }
  } else {
    if (JSON.parse(result).channel.item[0].word === word) {
      return res.status(200).json({ message: true });
    }
  }
});

export default router;
