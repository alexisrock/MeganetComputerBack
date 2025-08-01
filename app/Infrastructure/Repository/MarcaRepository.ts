import { injectable } from "inversify";
import { IMarca } from "../../Domain/Interface/IMarca";
import { Marca } from "../../Domain/Entities/Marca";
import { MongoConecction } from "../mongoConnection";
import { ObjectId, OptionalId } from 'mongodb';
import { Collection } from "mongoose";



@injectable()
export class MarcaRepository implements IMarca {
    document: string = "Producto";
    private readonly monggoConecction: MongoConecction

    constructor() {
        this.monggoConecction = new MongoConecction()
    }

    async findByName(name: string | null): Promise<Marca | null> {
        try {
            const producto = await this.getConectionDataBase();
            let product = await producto.findOne({ Nombre: name }) as Marca | null;
            return Promise.resolve(product);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

    async create(marca: Marca): Promise<string | null> {
        try {
            const product = await this.getConectionDataBase();
            const result = await product.insertOne(marca as unknown as OptionalId<Document>);
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

    async findById(id: string | null): Promise<Marca | null> {
        try {
            if (!id) {
                return Promise.resolve(null);
            }
            const product = await this.getConectionDataBase();
            let documentId = new ObjectId(id);
            let producto = await product.findOne({ _id: documentId }) as Marca | null;
            return Promise.resolve(producto);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

    async findAll(): Promise<Marca[] | null> {
        try {
            const product = await this.getConectionDataBase() as Collection;
            let marca = await product.find().toArray();

            const marcas = marca.map((doc: any) => ({
                ...doc,
                _id: doc._id?.toString(), 
            }));

            return Promise.resolve(marcas);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

    async update(marca: Marca): Promise<string | null> {
        try {
            const product = await this.getConectionDataBase();
            const result = await product.updateOne({ _id: marca._id }, marca);
            if (result.modifiedCount > 0) {
                return marca._id?.toString() ?? null;
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
            const product = await this.getConectionDataBase();
            const result = await product.deleteOne({ _id: new ObjectId(id) });

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