const { response, request } = require('express');
const bcryptjs = require('bcryptjs')

const User = require('../models/user');

const usuariosGet = async (req = request, res = response) => {

    const { limit = 5, from = 0} = req.query;
    const query = { status: true };

    const [total, user] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        user
    });
}

const usuariosPost = async (req, res = response) => {

    const { name, email, password, role, status } = req.body;
    const user = new User({ name, email, password, role, status });
   
    // Encriptar la constraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await user.save();

    res.json({
        ok: true,
        msg: 'post API - controlador',
        user
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    // TODO validar contra base de datos
    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, resto );

    res.status(400).json(user);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API - controlador'
    });
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    // // Fisicamente lo borramos
    // const user = await User.findByIdAndDelete(id);

    // Logicamente lo borramos
    const user = await User.findByIdAndUpdate(id, { status: false });

    res.json({
        user
    });
}

module.exports =  {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}