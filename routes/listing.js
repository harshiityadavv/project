const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listings.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");


const listingController = require("../controllers/listings.js");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
.get(wrapAsync (listingController.index))   // Index Route
.post(isLoggedIn, upload.single('Listing[image]'), validateListing, wrapAsync (listingController.createListing));  // Create Route


// new route
router.get("/new",isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync (listingController.showListing))   // Show Route
.put(isLoggedIn, isOwner, upload.single('Listing[image]'),validateListing, wrapAsync (listingController.updateListing))  // Update route
.delete(isOwner, wrapAsync (listingController.destroyListing));   // delete route




// Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync (listingController.renderEditForm));



module.exports = router;