// routes/users.js
const router = require("express").Router();
const auth = require("../middleware/auth");
const { getAllUsers, updateStatus, deleteUsers } = require("../controllers/userController");

router.get("/", auth, getAllUsers);
router.post("/status", auth, updateStatus);
router.post("/delete", auth, deleteUsers);

module.exports = router;
