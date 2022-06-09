const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const enviarExamenesControllers = require('../controllers/enviarExamenes-controllers');

//get all enviar examenes
router.get('/',enviarExamenesControllers.getAllEnviarExamenes)
//get enviar examenes by id
router.get('/:eeId',enviarExamenesControllers.getEnviarExamenesById)
//get enviar examenes by status
router.get('/status/:ToF',enviarExamenesControllers.getEnviarExamenesByStatus)
//get enviar examenes by doctor
router.get('/doctor/:dId',enviarExamenesControllers.getEnviarExamenesByDoctor)
//get enviar examenes by date
router.get('/date/:date',enviarExamenesControllers.getEnviarExamenesByDate)
//post a: enviar examenes
router.post(
    '/createEnviarExamenes',
    [
        check('idPaciente').not().isEmpty(),
        check('idDoctor').not().isEmpty(),
        check('message').not().isEmpty(),
        check('docUpload').not().isEmpty()
    ],
    enviarExamenesControllers.postEnviarExamenes)
//patch a: enviar examenes by patience
router.patch(
    '/:eeId/:pId',
    [
        check('message').not().isEmpty(),
        check('docUpload').not().isEmpty()
    ],
    enviarExamenesControllers.patchEnviarExamenesByPaciente)
//patch a: enviar examenes by doctor
router.patch(
    '/doctorMessage/:eeId/:dId',
    check('messageDoctor').not().isEmpty(),
    enviarExamenesControllers.patchEnviarExamenesByDoctor)
//delete a: enviar examenes
router.delete('/:eeId',enviarExamenesControllers.deleteEnviarExamenes)

module.exports = router;