import { injectable } from 'inversify';
import { Vendedor } from '../../Domain/Entities/Vendedor';
import { IVendedor } from '../../Domain/Interface/IVendedor'; 
import {  ObjectId, OptionalId } from 'mongodb';
import { BaseRepository } from './BaseRepository';


@injectable()
export class VendedorRepository extends BaseRepository  implements IVendedor{

    document: string = "Vendedor";
    

    constructor() {
       super()
     }


    async findByUsuario(usuario: string | null): Promise<Vendedor | null> {
        try {
            const vendor = await this.getConectionDataBase(this.document);       
            let cliente = await vendor.findOne({ usuario: usuario})as Vendedor | null; 
            return Promise.resolve(cliente);
        } finally {
            this.disconnect();
        }
    }
    

    async create(vendedor: Vendedor): Promise<string | null> {
        try {
            const vendor = await this.getConectionDataBase(this.document);         
            const result = await vendor.insertOne(vendedor as unknown as OptionalId<Document>);
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
            const vendor = await this.getConectionDataBase(this.document);   
            let documentId = new ObjectId(id);
            let cliente = await vendor.findOne({ _id: documentId}) as Vendedor | null; 
            return Promise.resolve(cliente);
        } finally {
            this.disconnect();
        }
    }

    async findByName(name: string | null): Promise<Vendedor | null> {
        try {
            const vendor = await this.getConectionDataBase(this.document);       
            let cliente = await vendor.findOne({ nombre: name})as Vendedor | null; 
            return Promise.resolve(cliente);
        } finally {
            this.disconnect();
        }
    }

    async findAll(): Promise<Vendedor[] | null> {
           try {
            const vendor = await this.getConectionDataBase(this.document);         
            let vendedores = await vendor.find().toArray(); 

            const vendedoresAll = vendedores.map((doc: any) => ({
                ...doc,
                _id: doc._id?.toString(), 
            }));

            return Promise.resolve(vendedoresAll);
        } finally {
            this.disconnect();
        }
    }

    async update(vendedor: Vendedor): Promise<string | null> {
        try {
            const vendor = await this.getConectionDataBase(this.document);        
            const result = await vendor.updateOne({ _id: vendedor._id },  { $set: vendedor } );
            if (result.modifiedCount > 0) {
                return vendedor._id?.toString() ?? null;
            }
            return Promise.resolve(null);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }
    
    async delete(id: string ): Promise<string | null> {
        try {
            const vendor = await this.getConectionDataBase(this.document);   
            const result = await vendor.deleteOne( {_id: new ObjectId(id) });
            if (result.deletedCount > 0) {
                return id; // Eliminación exitosa
            }
            return Promise.resolve(null);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }    

}