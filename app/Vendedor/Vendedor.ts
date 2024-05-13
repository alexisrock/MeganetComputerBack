var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
const crypto = require('crypto');


const saltRounds = 10;


let  Vendedorschema = new Schema({
    usuario : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    created : {
        type: Date,
        default: Date.now

    },
    nombre:  {
        type: String,
        required: true
    },

});


Vendedorschema.pre('save', function(next){
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
     next();
});


module.exports = mongoose.model('Vendedor', Vendedorschema);

