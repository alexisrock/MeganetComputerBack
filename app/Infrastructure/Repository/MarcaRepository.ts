import { injectable } from "inversify";
import { IMarca } from "../../Domain/Interface/IMarca";
import { Marca } from "../../Domain/Entities/Marca";
import { ObjectId, OptionalId } from 'mongodb';
import { Collection } from "mongoose";
import { BaseRepository } from "./BaseRepository";



@injectable()
export class MarcaRepository  extends BaseRepository implements IMarca {
    document: string = "Producto";
 

    constructor() {
        super()
    }

    async findByName(name: string | null): Promise<Marca | null> {
        try {
            const producto = await this.getConectionDataBase(this.document);
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
            const product = await this.getConectionDataBase(this.document);
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
            const product = await this.getConectionDataBase(this.document);
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
            const product = await this.getConectionDataBase(this.document) as Collection;
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
            const product = await this.getConectionDataBase(this.document);
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
            const product = await this.getConectionDataBase(this.document);
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
    
}