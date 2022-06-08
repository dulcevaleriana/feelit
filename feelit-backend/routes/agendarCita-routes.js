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
router.post('/createDoctor',agendarCitaControllers.postAgendarCita)
//patch a: agendar cita
router.patch('/:acId',agendarCitaControllers.patchAgendarCita)
//delete a: agendar cita
router.delete('/:dId',agendarCitaControllers.deleteAgendarCita)


module.exports = router;