import express from "express";
import { createBoard } from "../database/boardCreateModel";
import { readBoard } from "../database/boardReadModel";
import { readDetail } from "../database/boardReadContentModel";
import { updateBoard } from "../database/boardUpdateModel";
import { updateSolved } from "../database/boardUpdateSolveModel";
import { deleteBoard } from "../database/boardDeleteModel";

const router = express.Router();

router.post("/write", async (req, res) => {
  const { title, writer, content } = req.body;

  try {
    await createBoard(title, writer, content);
    res.status(201).json({ message: "Board created successfully" });
  } catch (error) {
    console.error("Error creating board: ", error);
    res.status(500).json({ message: "Failed to create board" });
  }
});

router.post("/readBoard", async (req, res) => {
  try {
    const boards = await readBoard();
    res.status(200).json(boards);
  } catch (error) {
    console.error("Error reading board: ", error);
    res.status(500).json({ message: "failed to read board" });
  }
});

router.get("/readBoard/:boardId", async (req, res) => {
  const boardId = req.params.boardId;

  try {
    const content = await readDetail(boardId);
    res.status(200).json(content);
  } catch (error) {
    console.error("Error reading detail content: ", error);
    res.status(500).json({ message: "failed to read board" });
  }
});

router.patch("/update/:boardId", async (req, res) => {
  const boardId = req.params.boardId;
  const { title, content } = req.body;
  try {
    const updateData = { title, content };
    await updateBoard(boardId, updateData);
    res.status(200).json({ message: "Board updated successfully" });
  } catch (error) {
    console.error("Error update detail content: ", error);
    res.status(500).json({ message: "failed to update board" });
  }
});

router.patch("/edit/:boardId", async (req, res) => {
  const boardId = req.params.boardId;
  const { solve } = req.body;
  try {
    await updateSolved(boardId, solve);
    res.status(200).json({ message: "Solve updated succesfully" });
  } catch (error) {
    console.error("Error update solve status content: ", error);
    res.status(500).json({ message: "failed to update solve status" });
  }
});

router.delete("/delete/:boardId", async (req, res) => {
  const boardId = req.params.boardId;

  try {
    await deleteBoard(boardId);
    res.status(200).json({ message: "Board deleted successfully" });
  } catch (error) {
    console.error("Error delete board: ", error);
    res.status(500).json({ message: "failed to delete board" });
  }
});

export default router;
