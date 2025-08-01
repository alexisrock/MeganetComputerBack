import { Cliente } from "../../Domain/Entities/Cliente";
import { IRepository } from "../../Domain/Interface/IRespository";
import { MongoConecction } from "../mongoConnection";
import { injectable } from "inversify";
import {  ObjectId, OptionalId } from 'mongodb';
 

@injectable()
export class AuthRepository implements IRepository{
    
    document: string = "Cliente";
    private readonly monggoConecction : MongoConecction

   constructor() {
      this.monggoConecction = new MongoConecction()
    }
    

    async findById(id: string): Promise<Cliente | null> {
        try {
            const client = await this.getConectionDataBase(); 
            let documentId = new ObjectId(id);
            let cliente = await client.findOne({ _id: documentId})as Cliente | null;; 
            return Promise.resolve(cliente);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

    
    async insert(cliente: Cliente): Promise<string | null> {
        try {
            const client = await this.getConectionDataBase();  
            if (typeof cliente._id === "string") {
                // Convertir string a ObjectId
                (cliente as any)._id = new ObjectId(cliente._id);
            }
    
                 
            const result = await client.insertOne(cliente as unknown as OptionalId<Document>);
            if (result.insertedId.toHexString()== null || result.insertedId.toHexString() !== undefined) {
                return Promise.resolve(result.insertedId.toHexString());  
            }

            return Promise.resolve(null);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }  
   
    async findByEmail(email: string ): Promise< Cliente| null> {
        try {
            if(email=== "" || email ===  undefined )
                return Promise.resolve(null);
                  
            const client = await this.getConectionDataBase()
            let cliente = await client.findOne({ email: email})as Cliente | null;
            return Promise.resolve(cliente);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

    async findByCedula(cedula: string | null): Promise<Cliente | null > {
        try {
            if(cedula=== "" || cedula ===  undefined )
                return null;
                  
            const client = await this.getConectionDataBase();
            let cliente = await client.findOne({ cedula: cedula}) as Cliente | null;
            return Promise.resolve(cliente);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }
      
    async  getConectionDataBase(){
        return await this.monggoConecction.getConectionDataBase(this.document); 
    }

    disconnect(){
        this.monggoConecction.disconnect();
    }
}