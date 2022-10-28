const { Router } = require("express");
const router = Router();
const {createService, getAllService, getOneServiceByVehicle_id, modifyServices, deleteService} = require('../controllers/services')
const {serviceValidator} = require('.././middleware/serviceValidator')


router.get('/services', getOneServiceByVehicle_id)
router.post('/services', createService)
router.get('/services', getAllService)
router.put('/modifyservices', modifyServices)
router.delete('/deleteservices',serviceValidator,deleteService)

module.exports = router