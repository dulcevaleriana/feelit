const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const agendarCitaControllers = require('../controllers/agendarCita-controllers');

//get all agendar cita
router.get('/',agendarCitaControllers.getAllAgendarCita)
//get agendar cita by id
router.get('/:acId',agendarCitaControllers.getAgendarCitaById)
//get agendar cita by status
router.get('/status/:ToF',agendarCitaControllers.getAgendarCitaByStatus)
//get agendar cita by doctor
router.get('/doctor/:dId',agendarCitaControllers.getAgendarCitaByDoctor)
//get agendar cita by date
router.get('/date/:date',agendarCitaControllers.getAgendarCitaByDate)
//post a: agendar cita
router.post(
    '/createDate',
    [
        check('idPaciente').not().isEmpty(),
        check('idDoctor').not().isEmpty(),
        check('date').trim().isDate(),
        // .withMessage('11111start must be in correct format yyyy:mm:dd hh:mm:ss')
        check('time').not().isEmpty(),
        check('message').not().isEmpty()
    ],
    agendarCitaControllers.postAgendarCita)
//patch a: agendar cita
router.patch(
    '/:acId',
    [
        check('idPaciente').not().isEmpty(),
        check('idDoctor').not().isEmpty(),
        check('date').trim().isDate(),
        check('time').not().isEmpty(),
        check('message').not().isEmpty()
    ],
    agendarCitaControllers.patchAgendarCita)
//delete a: agendar cita
router.delete('/:acId',agendarCitaControllers.deleteAgendarCita)


module.exports = router;