const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const pacienteControllers = require('../controllers/paciente-controllers');

//get all paciente
router.get('/',pacienteControllers.getAllPaciente)
//get paciente by id
router.get('/:pId',pacienteControllers.getPacienteById)
//post a paciente
router.post(
    '/createPaciente',
    [
        check('name').not().isEmpty(),
        check('cedula').isLength({min:13}),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({min:6}),
        check('telefono').isLength({min:12}),
    ],
    pacienteControllers.postPaciente)
//patch a paciente
router.patch(
    '/:pId',
    [
        check('name').not().isEmpty(),
        check('cedula').isLength({min:13}),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({min:6}),
        check('telefono').isLength({min:12}),
    ],
    pacienteControllers.patchPaciente)
//delete a paciente
router.delete('/:pId',pacienteControllers.deletePaciente)


module.exports = router;