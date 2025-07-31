var Vendedor = require('./Vendedor');


exports.Vendedor_create = function(req, res){
    var nuevoVendedor = new Vendedor({
        usuario : req.body.Idusuario,
        password : req.body.pass,
        nombre: req.body.nombre
    });

    nuevoVendedor.save(function(err){
        if(err) res.status(400).json({error: err.message });    
        res.status(200).json(nuevoVendedor);
    })
}

exports.Vendedor_update = function(req, res){
    var datosVendedor = {
        usuario : req.body.Idusuario,
        password : req.body.pass,
        nombre: req.body.nombre
    }

    Vendedor.findByIdAndUpdate(req.body.id,datosVendedor, function(err){
        if(err) res.status(400).json({error: err.message });
        res.status(200).json({mensaje: "Datos actualizados correctamente"});
    });
}

exports.Vendedor_Delete = function(req, res){
    Vendedor.findByIdAndDelete(req.body.id, function(err){
        if (err) {
            res.status(400).json({error: err.message });
        }
        else{
          
        res.status(200).json({mensaje: "Vendedor Eliminado"});
        }
    })
}