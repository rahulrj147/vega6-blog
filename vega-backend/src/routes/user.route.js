const express = require("express");
const router = express.Router();
const UserController = require("../controller/user.controller");
const { authenticateToken } = require("../middleware/auth.middleware");
const asyncHandler = require("../utils/asyncHandler");
const createUploader = require("../middleware/upload.middleware");

const upload = createUploader("vega6/users");

// Public routes
router.post("/register", upload.single("profilePicture"), asyncHandler(UserController.register));
router.post("/login", asyncHandler(UserController.login));
router.post("/refresh", asyncHandler(UserController.refreshAccessToken));

// Protected routes
router.post("/logout", authenticateToken, asyncHandler(UserController.logout));
router.get("/stats/dashboard", authenticateToken, asyncHandler(UserController.getDashboardStats));

// Optimized Profile routes
router.route("/profile")
    .all(authenticateToken)
    .get(asyncHandler(UserController.getProfile))
    .put(upload.single("profilePicture"), asyncHandler(UserController.updateProfile));

// CRUD routes
router.get("/", authenticateToken, asyncHandler(UserController.getAllUsers));

router.route("/:id")
    .all(authenticateToken)
    .get(asyncHandler(UserController.getUserById))
    .delete(asyncHandler(UserController.deleteUser));

module.exports = router;

