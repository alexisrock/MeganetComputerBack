import { injectable } from 'inversify';
import { Vendedor } from '../../Domain/Entities/Vendedor';
import { IVendedor } from '../../Domain/Interface/IVendedor';
import { MongoConecction } from '../mongoConnection';
import {  ObjectId } from 'mongodb';


@injectable()
export class VendedorRepository implements IVendedor{

    document: string = "Vendedor";
    private readonly monggoConecction : MongoConecction

    constructor() {
       this.monggoConecction = new MongoConecction()
     }
    

    async create(vendedor: Vendedor): Promise<string | null> {
        try {
            const vendor = await this.getConectionDataBase();         
            const result = await vendor.insertOne(vendedor);
            if (result.insertedId.toHexString()== null || result.insertedId.toHexString() !== undefined) {
                return Promise.resolve(result.insertedId.toHexString());  
            }
            return Promise.resolve(null);
        } finally {
            this.disconnect();
        }
    }

    async findById(id: string ): Promise<Vendedor | null> {
        try {
            const vendor = await this.getConectionDataBase();   
            let documentId = new ObjectId(id);
            let cliente = await vendor.findOne({ _id: documentId}); 
            return Promise.resolve(cliente);
        } finally {
            this.disconnect();
        }
    }

    async findByName(name: string | null): Promise<Vendedor | null> {
        try {
            const vendor = await this.getConectionDataBase();       
            let cliente = await vendor.findOne({ nombre: name}); 
            return Promise.resolve(cliente);
        } finally {
            this.disconnect();
        }
    }

    async findAll(): Promise<Vendedor[] | null> {
           try {
            const vendor = await this.getConectionDataBase();         
            let vendedores = await vendor.find().toArray(); 
            return Promise.resolve(vendedores);
        } finally {
            this.disconnect();
        }
    }

    async update(vendedor: Vendedor): Promise<string | null> {
        try {
            const vendor = await this.getConectionDataBase();        
            const result = await vendor.updateOne(vendedor);
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
    
    async delete(id: string | null): Promise<string | null> {
        try {
            const vendor = await this.getConectionDataBase();   
            const result = await vendor.deleteOne({ _id: id});
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
    
    async getConectionDataBase(){
        return await this.monggoConecction.getConectionDataBase(this.document);  
    }


    disconnect(){
        this.monggoConecction.disconnect();
    }
}