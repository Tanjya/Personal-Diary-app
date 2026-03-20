const { Router } = require('express');
const diaryController = require('../controllers/diaryController');

const diaryRouter = Router();

// GET all entries
diaryRouter.get("/", diaryController.index);

// GET single entry by ID
diaryRouter.get("/:id", diaryController.show);

// CREATE new entry
diaryRouter.post("/", diaryController.create);

// UPDATE entry
diaryRouter.patch("/:id", diaryController.update);

// DELETE entry
diaryRouter.delete("/:id", diaryController.destroy);

module.exports = diaryRouter;