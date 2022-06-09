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
router.post('/createEnviarExamenes',enviarExamenesControllers.postEnviarExamenes)
//patch a: enviar examenes by patience
router.patch('/:eeId/:pId',enviarExamenesControllers.patchEnviarExamenesByPaciente)
//patch a: enviar examenes by doctor
router.patch('/doctorMessage/:eeId/:dId',enviarExamenesControllers.patchEnviarExamenesByDoctor)
//delete a: enviar examenes
router.delete('/:eeId',enviarExamenesControllers.deleteEnviarExamenes)

module.exports = router;