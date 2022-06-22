const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const doctorControllers = require('../controllers/doctor-controllers');

//get all doctor
router.get('/',doctorControllers.getAllDoctor)
//get doctor by id
router.get('/:dId',doctorControllers.getDoctorById)
//get doctor by specialty
router.get('/speciality/:specialityName',doctorControllers.getAllDoctorBySpecialty)
//post a doctor
router.post(
    '/createDoctor',
    [
        check('name').not().isEmpty(),
        check('password').isLength({min:6}),
        check('cedula').isLength({min:13}),
        check('email').normalizeEmail().isEmail(),
        check('specialty').not().isEmpty(),
        check('telefono').isLength({min:12}),
        check('laborDays').not().isEmpty(),
        check('hourStart').not().isEmpty(),
        check('hourFinish').not().isEmpty(),
        check('location').not().isEmpty(),
    ],
    doctorControllers.postDoctor)
//patch a doctor
router.patch(
    '/:dId',
    [
        check('name').not().isEmpty(),
        check('password').isLength({min:6}),
        check('cedula').isLength({min:13}),
        check('email').normalizeEmail().isEmail(),
        check('specialty').not().isEmpty(),
        check('telefono').isLength({min:12}),
        check('laborDays').not().isEmpty(),
        check('hourStart').not().isEmpty(),
        check('hourFinish').not().isEmpty(),
        check('location').not().isEmpty(),
    ],
    doctorControllers.patchDoctor)
//delete a doctor
router.delete('/:dId',doctorControllers.deleteDoctor)
//active a doctor
router.get('/activeDoctor/:dId',doctorControllers.activeDoctor)
//login doctor
router.post('/login',doctorControllers.loginDoctor)


module.exports = router;