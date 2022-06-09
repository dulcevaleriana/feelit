const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const enviarExamenesControllers = require('../controllers/enviarExamenes-controllers');

//get all enviar examenes
router.get('/',)
//get enviar examenes by id
router.get('/:eeId',)
//get enviar examenes by status
router.get('/status/:ToF',)
//get enviar examenes by doctor
router.get('/doctor/:dId',)
//get enviar examenes by date
router.get('/date/:date',)
//post a: enviar examenes
router.post('/createEnviarExamenes',)
//patch a: enviar examenes
router.patch('/:eeId',)
//delete a: enviar examenes
router.delete('/:eeId',)

module.exports = router;