const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const consultasRapidasControllers = require('../controllers/consultasRapidas-controllers');

//get all consultas rapidas
router.get('/',consultasRapidasControllers.getAllconsultasRapidas)
//get consultas rapidas by id
router.get('/:crId',consultasRapidasControllers.getconsultasRapidasById)
//get consultas rapidas by status
router.get('/status/:ToF',consultasRapidasControllers.getconsultasRapidasByStatus)
//get consultas rapidas by doctor
router.get('/doctor/:dId',consultasRapidasControllers.getconsultasRapidasByDoctor)
//get consultas rapidas by date
router.get('/date/:date',consultasRapidasControllers.getconsultasRapidasByDate)
//post a: consultas rapidas
router.post(
    '/createConsultaRapida',
    [
        check('idPaciente').not().isEmpty(),
        check('idDoctor').not().isEmpty(),
        check('time').not().isEmpty(),
        check('messagePaciente').not().isEmpty()
    ],
    consultasRapidasControllers.postconsultasRapidas)
//patch a: consultas rapidas
router.patch(
    '/:crId',
    [
        check('idPaciente').not().isEmpty(),
        check('idDoctor').not().isEmpty(),
        // check('time').not().isEmpty(),
        // check('messagePaciente').not().isEmpty()
    ],
    consultasRapidasControllers.patchconsultasRapidas)
//delete a: consultas rapidas
router.delete('/:crId',consultasRapidasControllers.deleteconsultasRapidas)
//active a: consultas rapidas
router.get('/active/:crId',consultasRapidasControllers.activeConsultasRapidas)

module.exports = router;