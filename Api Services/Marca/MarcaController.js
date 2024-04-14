var Marca = require('./Marca');


exports.Marca_list = function(req, res) {
    Marca.find({}, function (err, marcas) {
        res.status(200).json({
            marcas: marcas
        });
    });
}

exports.Marca_create = function(req, res) {

    var nuevaMarca = new Marca({
        Descripcion: req.body.marcaproducto
    });
console.log("creando"+nuevaMarca);
    nuevaMarca.save(function(err){
        if(err) res.status(400).json({error: err.message });    
        res.status(200).json(nuevaMarca);
    });    
}

exports.Marca_update = function(req, res){
    console.log("ingreso");
    console.log("descripcion: "+req.body.Descripcion);
    var datos = {
        Descripcion: req.body.Descripcion
    };   
    console.log("id: "+req.params.id); 
    Marca.findByIdAndUpdate(req.params.id, datos, function(err){
        if(err) res.status(400).json({error: err.message });
        res.status(200).json({mensaje: "Datos actualizados correctamente"});
    });
}



exports.Marca_delete = function(req, res){
    Marca.findByIdAndDelete(req.params.id, function(err){
        if (err) {
            res.status(400).json({error: err.message });
        }
        else{
          
        res.status(200).json({mensaje: "Inventario Eliminado"});
        }
    })
}

exports.Marca_GetId = function(){
    var marca = Marca.findById(req.params.id);
    res.status(200).json({
        marca: marca
    });
    
}