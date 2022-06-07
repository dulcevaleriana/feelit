const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const pacienteControllers = require('../controllers/paciente-controllers');

//get all paciente
router.get('/',pacienteControllers.getAllPaciente)
//get paciente by id
router.get('/:pId',pacienteControllers.getPacienteById)
//post a paciente
router.post('/createPaciente',pacienteControllers.postPaciente)
//patch a paciente
router.patch('/:pId',pacienteControllers.patchPaciente)
//delete a paciente
router.delete('/:pId',pacienteControllers.deletePaciente)


module.exports = router;