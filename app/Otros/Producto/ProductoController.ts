var Producto = require('./Producto'); 
var multer = require('multer'); 


exports.Producto_list = function(req, res){
    Producto.find({}).populate('Marca').populate('Categoria').exec(function(err,productos){   
        res.status(200).json({
            product: productos
        });
    });

}
exports.Producto_create = function(req, res){
    try {
    console.log(req.body.archivo.name);
    console.log(req.body)
    var upload = multer({ dest: '../../../public/images'})
    upload.single(req.body.archivo)
    console.log(req.file)
    console.log('salio al inicio de la carga')

    var nuevoProducto = new Producto({
        codigo : req.body.codproducto,
        Nombre : req.body.nombreproducto,
        Precio : req.body.precioproducto,
        Marca : req.body.idmarca,
        Descripcion : req.body.descriproducto, 
        PrecioVenta : req.body.preciovenproducto,
        EsPaginaInicial: req.body.paginainiproducto,
        Categoria: req.body.idCategoria,
        UrlImagen: req.body.urldeimagen
    });


    Producto.find({EsPaginaInicial: true}).countDocuments(function(err, result){
            console.log(result);
        if(result>10){
            res.status(400).json({
                error: "Ya a ingresado el numero maximo de productos para ver en la pagina principal"
            });

        }else{    
                nuevoProducto.save(function(err){
                if(err) res.status(400).json({error: err.message });    
                res.status(200).json(nuevoProducto);
            });
        }
    });
    } catch (error) {
    console.log(error.message)
}


}

exports.Producto_GetIdProducto = function(req, res){
    var product = Producto.findById(req.params.id);
    res.status(200).json({
        producto: product
    });
}

exports.Producto_Update = function(req, res){
    var datosproducto = {
        codigo : req.body.codproducto,
        Nombre : req.body.nombreproducto,
        Precio : req.body.precioproducto,
        Marca : req.body.idmarca,
        Descripcion : req.body.descriproducto,     
        PrecioVenta : req.body.preciovenproducto,
        EsPaginaInicial: req.body.paginainiproducto,
        Categoria: req.body.idCategoria
    };

    Producto.findByIdAndUpdate(req.body.id,datosproducto, function(err){
        if(err) res.status(400).json({error: err.message });

        res.status(200).json({mensaje: "Datos actualizados correctamente"});
    } );
}

exports.Producto_Delete = function(req, res){
    Producto.findByIdAndDelete(req.body.id, function(err){
        if (err) {
            res.status(400).json({error: err.message });
        }
        else{
          
        res.status(200).json({mensaje: "Inventario Eliminado"});
        }
    })
}
