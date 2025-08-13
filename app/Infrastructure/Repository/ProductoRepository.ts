import { injectable } from "inversify";
import { Producto } from "../../Domain/Entities/Producto";
import { IProducto } from "../../Domain/Interface/IProducto";
import { ObjectId, OptionalId } from 'mongodb';
import { Collection } from "mongoose";
import { BaseRepository } from "./BaseRepository";

@injectable()
export class ProductoRepository extends BaseRepository  implements IProducto  {

    document: string = "Producto";
    

    constructor() {
       super()
    }

    async findByName(name: string | null): Promise<Producto | null> {
        try {
            const producto = await this.getConectionDataBase(this.document) ;
            let product = await producto.findOne({ Nombre: name }) as Producto | null;
            return Promise.resolve(product);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

    async create(producto: Producto): Promise<string | null> {
        try {
            const product = await this.getConectionDataBase(this.document);
            const result = await product.insertOne(producto as unknown as OptionalId<Document>);
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

    async findById(id: string | null): Promise<Producto | null> {
        try {
            if (!id) {
                return Promise.resolve(null);
            }
            const product = await this.getConectionDataBase(this.document);
            let documentId = new ObjectId(id);
            let producto = await product.findOne({ _id: documentId }) as Producto | null;
            return Promise.resolve(producto);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

    async findAll(): Promise<Producto[] | null> {
        try {
            const product = await this.getConectionDataBase(this.document) as Collection;
            let productos = await product.find().toArray();

            const productosAll = productos.map((doc: any) => ({
                ...doc,
                _id: doc._id?.toString(), 
            }));
            return Promise.resolve(productosAll);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

    async update(producto: Producto): Promise<string | null> {
        try {
            const product = await this.getConectionDataBase(this.document);
            const result = await product.updateOne({ _id: producto._id }, producto);
            if (result.modifiedCount > 0) {
                return producto._id?.toString() ?? null;
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
