const router = require("express").Router();
const UserRoutes = require("./userRoutes");
const GroupRoutes =require("./groupRoutes");

// Book routes
router.use("/usersData", UserRoutes);
router.use("/groupData",GroupRoutes);
module.exports = router;
