var Inventario = require('./Inventario');



exports.Invetario_list = function(req, res){
    Inventario.find({}).populate('Producto').exec(function(err,inventario){
        res.status(200).json({
            inventario: inventario
        });
    });
}


exports.Inventario_create = function(req, res){
    var nuevoInventario = new Inventario({
        Producto : req.body.idproducto,
        CantidadInicial: req.body.cantidadini,
        CantidadSalida : req.body.cantSalida,
        CantidadTotal: req.body.cantiTotal
    });
    nuevoInventario.save(function(err){
        if(err) res.status(400).json({error: err.message });    
        res.status(200).json(nuevoInventario);
    });
}

exports.Inventario_Update = function(req, res){
    var datos_Invetario = {
        producto: req.body.idproducto, 
        CantidadInicial: req.body.cantIni,
        CantidadSalida: req.body.canSal,
        CantidadTotal: req.body.cantTo    
    };

    Inventario.findByIdAndUpdate(req.body.id,datos_Invetario, function(err){
        if(err) res.status(400).json({error: err.message });

        res.status(200).json({mensaje: "Datos actualizados correctamente"});
    } );
}


exports.Inventario_delete = function(req, res){

    Inventario.findByIdAndDelete(req.body.id, function(err){
        if (err) {
            res.status(400).json({error: err.message });
        }
        else{
          
        res.status(200).json({mensaje: "Inventario Eliminado"});
        }
    })
}

exports.Inventario_GetInventario = function(req, res) {
    var invent = Inventario.findById(req.params.id);
    res.status(200).json({
        inventario: invent
    });
    
}
