var Cliente = require('./Cliente');


exports.Cliente_list = function(req, res){
    Cliente.find({}, function(err, clientes){
        res.status(200).json({
            clientes: clientes
        });
    });
}


exports.Cliente_create = function(req, res){
var nuevoCliente = new Cliente({
    cedula: req.body.cedulaCli,
    nombre: req.body.nombrecli,
    apellidos: req.body.apellidosCli,
    direccion: req.body.direccionCli,
    telefono: req.body.telefonoCli,
    email: req.body.emailCli,
    password: req.body.passCli
});

nuevoCliente.save(function(err){
    if(err) res.status(400).json({error: err.message });

    res.status(200).json(nuevoCliente);
});

}


exports.Cliente_update = function(req, res){
    var actualizar_values = {
        nombre: req.body.nombrecli,
        apellidos: req.body.apellidosCli,
        direccion: req.body.direccionCli,
        telefono: req.body.telefonoCli,
        email: req.body.emailCli,
        password: req.body.passCli
    }
    Cliente.findOneAndUpdate({ cedula: req.params.cedula},actualizar_values , function(err, client){
        if(err) res.status(400).json({error: err.message });

        res.status(200).json({mensaje: "Datos actualizados correctamente"});
    });

}




