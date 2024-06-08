import express from "express";
import isCorrectWord from "../controllers/inGameController";

const router = express.Router();

router.post("/is-correct", async (req: any, res: any) => {
  const { word } = req.body;
  const result = await isCorrectWord(word)
    .then((data: any) => {
      if (JSON.parse(data).channel.total._text === "0") {
        return [""];
      } else {
        const parse = JSON.parse(data).channel.item.map(
          (item: any) => item.word._text
        );
        return parse;
      }
    })
    .catch((error) => {
      console.error(error);
    });
  if (word === result[0]) {
    if (result[0].length === 1) {
      return res.status(200).json({ message: false });
    } else {
      return res.status(200).json({ message: true });
    }
  } else {
    return res.status(200).json({ message: false });
  }
});

export default router;
