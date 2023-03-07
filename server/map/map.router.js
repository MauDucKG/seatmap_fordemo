const { webFramework } = require("../shared/internalServices");

const router = webFramework.Router();

const MapController = require("../map/map.controller");

router.get("/", MapController.authenToken, MapController.getAllMap);
router.post("/", MapController.authenToken, MapController.addNewMap);
router.put("/", MapController.authenToken, MapController.changeMap);
router.delete("/", MapController.authenToken, MapController.deleteMap);

module.exports = router;
