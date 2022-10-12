const { Router } = require('express');
const { usuariosGet, 
        usuariosPost,
        usuariosPut,
        usuariosDelete,
        usuariosPatch
    } = require('../controllers/usuarios');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(emailExiste),
    check('role').custom(esRoleValido),
    validarCampos
],usuariosPost);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
] ,usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;