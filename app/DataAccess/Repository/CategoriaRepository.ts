import { injectable } from "inversify";
import { Categoria } from "../../Domain/Categoria";
import { ICategoria } from "../Interface/ICategoria";
import { MongoConecction } from "../MongoConnection";
import {  ObjectId } from 'mongodb';
@injectable()
export class CategoriaRepository implements ICategoria{

    document: string = "Categoria";
    private monggoConecction : MongoConecction

    constructor() {
       this.monggoConecction = new MongoConecction()
     }
    
     async findByName(name: string | null): Promise<Categoria | null> {
        const category =  await this.getConectionDataBase();       
        let cliente =  await category.findOne({ nombreCategoria: name}); 
        this.disconnect();
        return Promise.resolve(cliente);
    }
    
     
    async create(categoria: Categoria): Promise<string | null> {
        const category = await   this.getConectionDataBase();         
        const result = await category.insertOne(categoria);
        this.disconnect();      
        if (result.insertedId.toHexString()== null || result.insertedId.toHexString() !== undefined) {
            return Promise.resolve(result.insertedId.toHexString());  
        }
        return Promise.resolve(null)
    }
    async findById(id: string ): Promise<Categoria | null> {
        const category =  await this.getConectionDataBase();   
        let documentId = new ObjectId(id);
        let cliente =  await category.findOne({ _id: documentId}); 
        this.disconnect();
        return Promise.resolve(cliente);
    }
    async findAll(): Promise<Categoria[] | null> {
        const category =  await this.getConectionDataBase();         
        let cliente =  await category.find().toArray(); 
        this.disconnect();
        return Promise.resolve(cliente);
    }
    async update(categoria: Categoria): Promise<string | null> {
        const category =   await this.getConectionDataBase();        
        const result = await category.updateOne(categoria);
        this.disconnect();     
        if (result.insertedId.toHexString()== null || result.insertedId.toHexString() !== undefined) {
            return Promise.resolve(result.insertedId.toHexString());  
        }
        return Promise.resolve(null)
    }
    async delete(id: string | null): Promise<string | null> {
        const category = await  this.getConectionDataBase();   
        const result = await category.deleteOne({ _id: id});
        this.disconnect();     
        if (result.insertedId.toHexString()== null || result.insertedId.toHexString() !== undefined) {
            return Promise.resolve(result.insertedId.toHexString());  
        }
        return Promise.resolve(null)
    }


    async getConectionDataBase(){
        return await this.monggoConecction.getConectionDataBase(this.document);  
    }


    disconnect(){
        this.monggoConecction.disconnect();
    }
}