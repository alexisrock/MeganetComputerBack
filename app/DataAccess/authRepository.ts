import { Cliente } from "../Domain/Cliente";
import { IRepository } from "./IRespository";
import { MongoConecction } from "./mongoConnection";
import { injectable } from "inversify";
import {  ObjectId } from 'mongodb';

@injectable()
export class AuthRepository implements IRepository{
    
    private monggoConecction : MongoConecction

   constructor() {
      this.monggoConecction = new MongoConecction()
    }

    async findById(id: string): Promise<Cliente | null> {
        const client = await this.getConectionDataBase();
        let documentId = new ObjectId(id);
        let cliente =  await client.findOne({ _id: documentId}); 
        return Promise.resolve(cliente);
    }


    async getConectionDataBase() {
        const client = await this.monggoConecction.getDatabase("Cliente");   
        return client
    }

    async insert(cliente: Cliente): Promise<string | null> {
        const client = await this.getConectionDataBase();       
        const result = await client.insertOne(cliente);
        
        if (result.insertedId.toHexString()== null || result.insertedId.toHexString() !== undefined) {
            return Promise.resolve(result.insertedId.toHexString());  
        }
        return Promise.resolve(null)
    }
  
   
    async findByEmail(email: string ): Promise< any| undefined> {
        
        if(email=== "" || email ===  undefined )
            return Promise.resolve(undefined);
              
        const client = await this.getConectionDataBase();
        let cliente =  await client.findOne({ email: email}); 
        return Promise.resolve(cliente);       
    }

    
    
    





    // ClienteSchema.pre('save', function(next){
    //     if (this.isModified('password')) {
    //         this.password = bcrypt.hashSync(this.password, saltRounds);
    //     }
    //      next();
    // });


}