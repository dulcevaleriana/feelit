const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const specialtyControllers = require('../controllers/specialty-controllers');

//get all specialty
router.get('/',specialtyControllers.getAllSpecialty)
//get specialty by id
router.get('/:sId',specialtyControllers.getSpecialtyById)
//post a: specialty
router.post('/createSpecialty',specialtyControllers.postSpecialty)
//patch a: specialty by patience
router.patch('/:sId',specialtyControllers.patchSpecialty)
//delete a: specialty
router.delete('/:sId',specialtyControllers.deleteSpecialty)

module.exports = router;