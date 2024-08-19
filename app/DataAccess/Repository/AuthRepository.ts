import { Cliente } from "../../Domain/Cliente";
import { IRepository } from "../Interface/IRespository";
import { MongoConecction } from "../MongoConnection";
import { injectable } from "inversify";
import {  ObjectId } from 'mongodb';

@injectable()
export class AuthRepository implements IRepository{
    
    document: string = "Cliente";
    private monggoConecction : MongoConecction

   constructor() {
      this.monggoConecction = new MongoConecction()
    }
    

    async findById(id: string): Promise<Cliente | null> {
        const client = await this. getConectionDataBase(); 
        let documentId = new ObjectId(id);
        let cliente =  await client.findOne({ _id: documentId}); 
        this.disconnect();
        return Promise.resolve(cliente);
    }

    
    async insert(cliente: Cliente): Promise<string | null> {
        const client = await this. getConectionDataBase();     
        const result = await client.insertOne(cliente);
        this.disconnect();
        if (result.insertedId.toHexString()== null || result.insertedId.toHexString() !== undefined) {
            return Promise.resolve(result.insertedId.toHexString());  
        }
        return Promise.resolve(null)
    }  
   
    async findByEmail(email: string ): Promise< any| null> {
        
        if(email=== "" || email ===  undefined )
            return Promise.resolve(null);
              
        const client = await this. getConectionDataBase();
        let cliente =  await client.findOne({ email: email}); 
        this.disconnect();
        return Promise.resolve(cliente);       
    }

    async findByCedula(cedula: string | null): Promise<Cliente | null> {
        if(cedula=== "" || cedula ===  undefined )
            return Promise.resolve(null);
              
        const client = await this. getConectionDataBase();
        let cliente =  await client.findOne({ cedula: cedula}); 
        this.disconnect();
        return Promise.resolve(cliente);   
    }
      
    async  getConectionDataBase(){
        return await this.monggoConecction.getConectionDataBase(this.document); 
    }

    disconnect(){
        this.monggoConecction.disconnect();
    }
}