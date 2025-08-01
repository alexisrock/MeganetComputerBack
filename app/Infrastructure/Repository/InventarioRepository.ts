import { injectable } from "inversify";
import { Inventario } from "../../Domain/Entities/Inventario";
import { IInventario } from "../../Domain/Interface/IInventario";
import { MongoConecction } from "../mongoConnection";
import { ObjectId, OptionalId } from 'mongodb';
import { Collection } from "mongoose";

@injectable()
export class InventarioRepository implements IInventario {

    document: string = "Inventario";
    private readonly monggoConecction: MongoConecction

    constructor() {
        this.monggoConecction = new MongoConecction()
    }

  
    async create(inventario: Inventario): Promise<string | null> {
        try {
            const inventory = await this.getConectionDataBase();
            const result = await inventory.insertOne(inventario  as unknown as OptionalId<Document>);
            if (result.insertedId.toHexString() == null || result.insertedId.toHexString() !== undefined) {
                return Promise.resolve(result.insertedId.toHexString());
            }
            return Promise.resolve(null);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

    async findById(id: string | null): Promise<Inventario | null> {
        try {
            if (!id) {
                return Promise.resolve(null);
            }
            const inventory = await this.getConectionDataBase();
            let documentId = new ObjectId(id);
            let inventario = await inventory.findOne({ _id: documentId }) as Inventario | null;
            return Promise.resolve(inventario);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

    async findAll(): Promise<Inventario[] | null> {
        try {
            const inventory = await this.getConectionDataBase() as Collection;
            let inventarios = await inventory.find().toArray();
            
            const inventariosAll = inventarios.map((doc: any) => ({
                ...doc,
                _id: doc._id?.toString(), 
            }));

            return Promise.resolve(inventariosAll);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

    async update(inventario: Inventario): Promise<string | null> {
        try {
            const inventory = await this.getConectionDataBase();
            const result = await inventory.updateOne({ _id: inventario._id }, inventario);
            if (result.modifiedCount > 0) {
                return inventario._id?.toString() ?? null;
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
            const inventory = await this.getConectionDataBase();
            const result = await inventory.deleteOne({ _id: new ObjectId(id) });
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

    async getConectionDataBase() {
        return await this.monggoConecction.getConectionDataBase(this.document);
    }

    disconnect() {
        this.monggoConecction.disconnect();
    }
}
