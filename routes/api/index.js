const router = require("express").Router();
const UserRoutes = require("./userRoutes");

// Book routes
router.use("/usersData", UserRoutes);

module.exports = router;
