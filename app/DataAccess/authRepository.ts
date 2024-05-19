// import { MongoClient, Collection } from "mongodb";
import { IRepository } from "./IRespository";
import { Cliente } from "../Domain/Cliente";
import { Service } from "typedi";


@Service()
export class AuthRepository implements IRepository{

    // private readonly Cliente: Collection<Cliente>;
    
    // constructor(client: MongoClient, dbName: string, collectionName: string) {
    //     // this.Cliente = client.db(dbName).collection<Cliente>(collectionName);
    //   }
    constructor(){}

    async findById(email: string ): Promise< any| undefined> {

        if(email=== "" || email ===  undefined )
            return Promise.resolve(undefined);
        // return await this.Cliente.findOne({ email: email});   
        
        
        let cliente: Cliente = new Cliente();
        cliente.apellidos = "Bueno castro"

        return Promise.resolve(cliente);
       
    }




    // ClienteSchema.pre('save', function(next){
    //     if (this.isModified('password')) {
    //         this.password = bcrypt.hashSync(this.password, saltRounds);
    //     }
    //      next();
    // });


}