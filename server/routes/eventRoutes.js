const express = require("express");
const router = express.Router();
const { 
  createEvent, 
  getEvents, 
  getEventById, 
  registerForEvent, 
  cancelRegistration,
  getUserDashboard
} = require("../controllers/eventController");
const protect = require("../middleware/protect");
// create event
router.post("/", protect, createEvent);
// get all events
router.get("/", getEvents);
router.get("/dashboard/me", protect, getUserDashboard);
router.get("/:id", getEventById);
router.post("/:id/register", protect, registerForEvent);
router.delete("/:id/cancel", protect, cancelRegistration);
module.exports = router;
