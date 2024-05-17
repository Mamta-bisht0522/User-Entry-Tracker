const express = require("express");
const auth = require("../middlewares/auth.middleware");
const { userController } = require("../controllers/user.controller");

const {
  signup,
  login,
  logout,
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = userController;

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router
  .route("/:userId")
  .get(getUserById)
  .patch(auth, updateUser)
  .delete(auth, deleteUser);

router.route("/").post(registerUser).get(getAllUsers);
module.exports = router;
