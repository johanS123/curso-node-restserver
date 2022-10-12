
const Role = require('../models/role');
const User = require('../models/user');

const esRoleValido = async(role = '') => {
    const existeRole = await Role.findOne({ role })
    if (!existeRole) {
        throw new Error(`El rol ${ role } no esta registrado en la BD`)
    }
}

const emailExiste = async (email = '') => {
    const existeEmail = await User.findOne({ email });

    if (existeEmail) {
        throw new Error(`El correo: ${ email }, ya esta registrado`)
    }
}

const existeUsuarioPorId = async( id ) => {

    // verificar si el correo existe
    const existeUsuario = await User.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El ID no existe ${ id }`)
    }

}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}