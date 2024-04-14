var DetalleFactura = require('./DetalleFactura');


exports.DetalleFactura_list = function(req, res){

    DetalleFactura.find({}).populate('Producto').exec(function(err, Detalles){
        res.status(200).json({
            detallesFactura: Detalles
        });

    });
}





exports.DetalleFactura_Create = function(req, res){
    var nuervodetalle = new DetalleFactura({
        factura: req.body.idfactura,
        producto: req.body.idProducto,
        cantidad: req.body.cantidad,
        total: req.body.total
    });

    nuervodetalle.save(function(err){
        if(err) res.status(400).json({error: err.message });    
        res.status(200).json(nuervodetalle);
    });

}



exports.DetalleFactura_Update = function(req, res){
        var DatosDetallef ={
            factura: req.body.idfactura,
            producto: req.body.idProducto,
            cantidad: req.body.cantidad,
            total: req.body.total
        }

        DetalleFactura.findByIdAndUpdate(req.body.id, DatosDetallef, function(err){
            if(err) res.status(400).json({error: err.message });

            res.status(200).json({mensaje: "Datos actualizados correctamente"});
        });
}


exports.DetalleFactura_delete = function(){
    DetalleFactura.findByIdAndDelete(req.body.id, function(err){
        if (err) {
            res.status(400).json({error: err.message });
        }
        else{          
        res.status(200).json({mensaje: "factura Eliminada"});
        }
    });
}




