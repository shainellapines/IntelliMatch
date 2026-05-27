const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  createResume,
  getResumes,
  updateResume,
  deleteResume,
} = require("../controllers/resumeController");

router.post("/", auth, createResume);
router.get("/", auth, getResumes);
router.put("/:id", auth, updateResume); // 🔥 NEW
router.delete("/:id", auth, deleteResume);

module.exports = router;