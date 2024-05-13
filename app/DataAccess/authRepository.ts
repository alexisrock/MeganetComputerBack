import { MongoClient, Collection } from "mongodb";
import { IRepository } from "./IRespository";
import { Cliente } from "../Domain/Cliente";



export class AuthRepository implements IRepository{

    private readonly Cliente: Collection<Cliente>;
    
    constructor(client: MongoClient, dbName: string, collectionName: string) {
        this.Cliente = client.db(dbName).collection<Cliente>(collectionName);
      }

    async findById(email: string ): Promise< any| undefined> {
        return await this.Cliente.findOne({ email: email});         
    }




    // ClienteSchema.pre('save', function(next){
    //     if (this.isModified('password')) {
    //         this.password = bcrypt.hashSync(this.password, saltRounds);
    //     }
    //      next();
    // });
    



}