const { addNotification, sendNotification } = require("../Controllers/NotificationController");

router.post("/notification-api",addNotification)
router.get("/notifiaction-api",sendNotification)

module.exports = router;