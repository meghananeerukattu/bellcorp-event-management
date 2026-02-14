const Event = require("../models/Event");
const Registration = require("../models/Registration");
//creates new event
const createEvent = async (req, res) => {
  try {
    const {
      name,
      organizer,
      location,
      date,
      description,
      capacity,
      category
    } = req.body;
    if (!name || !organizer || !location || !date || !description || !capacity || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newEvent = await Event.create({
      name,
      organizer,
      location,
      date: new Date(date),
      description,
      capacity: Number(capacity),
      availableSeats: Number(capacity),
      category
    });
    res.status(201).json(newEvent);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
//get events
const getEvents = async (req, res) => {
  try {
    const { search, location, category, page = 1 } = req.query;
    let query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (location) {
      query.location = location;
    }
    if (category) {
      query.category = category;
    }
    const limit = 5;
    const skip = (page - 1) * limit;
    const events = await Event.find(query)
      .skip(skip)
      .limit(limit);
    res.json(events);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
//get event by id
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
//register for event
const registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    const alreadyRegistered = await Registration.findOne({
      user: userId,
      event: eventId
    });
    if (alreadyRegistered) {
      return res.status(400).json({ message: "Already registered for this event" });
    }
    if (event.availableSeats <= 0) {
      return res.status(400).json({ message: "Event is full" });
    }
    await Registration.create({
      user: userId,
      event: eventId
    });
    event.availableSeats -= 1;
    await event.save();
    res.json({ message: "Registered successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
//cancel registration
const cancelRegistration = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;
    const registration = await Registration.findOne({
      user: userId,
      event: eventId
    });
    if (!registration) {
      return res.status(400).json({ message: "You are not registered for this event" });
    }
    await Registration.deleteOne({ _id: registration._id });
    const event = await Event.findById(eventId);
    event.availableSeats += 1;
    await event.save();
    res.json({ message: "Registration cancelled" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
//users dashboard
const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user._id;
    const registrations = await Registration.find({ user: userId })
      .populate("event");
    const now = new Date();
    const upcoming = [];
    const past = [];
    registrations.forEach((item) => {
      if (item.event.date > now) {
        upcoming.push(item.event);
      } else {
        past.push(item.event);
      }
    });
    res.json({
      upcoming,
      past
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports =
 { createEvent, getEvents,getEventById,registerForEvent,cancelRegistration,getUserDashboard,};
