const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const doctorControllers = require('../controllers/doctor-controllers');

//get all doctor
router.get('/',doctorControllers.getAllDoctor)
//get doctor by specialty
router.get('/especiality/:sId',doctorControllers.getAllDoctorBySpecialty)
//post a doctor
router.post('/',doctorControllers.postDoctor)
//patch a doctor
router.patch('/:dId',doctorControllers.patchDoctor)
//delete a doctor
router.delete('/:dId',doctorControllers.deleteDoctor)


module.exports = router;