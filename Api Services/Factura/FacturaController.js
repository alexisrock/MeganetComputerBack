var Factura = require('./Factura');


exports.Factura_list =  function(req, res){
    Factura.find({},function(factura){
        res.status(200).json({
            producto: producto
        });
    });
}


exports.Factura_GetIdFactura = function(req, res){
    var factu = Factura.findById(req.params.id);
    res.status(200).json({
        factura: factu
    });

}

exports.Factura_create = function(req, res){
    var nuevafactura = new Factura({
        cliente : req.body.idcliente,
        total: req.body.total,
        direccion: req.body.direccion,
        telefono: req.body.Telefono,
        fechaCreacion :  Date.now

    });

    nuevafactura.save(function(err){
        if(err) res.status(400).json({error: err.message });    
        res.status(200).json(nuevafactura);
    });
}


exports.Factura_update = function(req, res){
    var datosFactura = {
        cliente : req.body.idcliente,
        total: req.body.total,
        direccion: req.body.direccion,
        telefono: req.body.Telefono,
        fechamodificacion : Date.now
    };

    Factura.findByIdAndUpdate(req.body.id,datosFactura, function(err) {
        if(err) res.status(400).json({error: err.message });

        res.status(200).json({mensaje: "Datos actualizados correctamente"});
        
    });

}

exports.Factura_delete = function(res, res){
    Factura.findByIdAndDelete(req.body.id, function(err){
        if (err) {
            res.status(400).json({error: err.message });
        }
        else{
          
        res.status(200).json({mensaje: "factura Eliminada"});
        }
    })

}


