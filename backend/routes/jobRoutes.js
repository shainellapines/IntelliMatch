const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { createJob, getMatches } = require("../controllers/jobController");

router.post("/", auth, createJob);
router.get("/match/:id", auth, getMatches);

module.exports = router;