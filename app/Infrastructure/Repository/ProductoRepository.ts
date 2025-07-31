import { injectable } from "inversify";
import { Producto } from "../../Domain/Entities/Producto";
import { IProducto } from "../../Domain/Interface/IProducto";
import { MongoConecction } from "../mongoConnection";
import { ObjectId } from 'mongodb';

@injectable()
export class ProductoRepository implements IProducto {

    document: string = "Producto";
    private readonly monggoConecction: MongoConecction

    constructor() {
        this.monggoConecction = new MongoConecction()
    }

    async findByName(name: string | null): Promise<Producto | null> {
        try {
            const producto = await this.getConectionDataBase();
            let product = await producto.findOne({ Nombre: name });
            return Promise.resolve(product);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

    async create(producto: Producto): Promise<string | null> {
        try {
            const product = await this.getConectionDataBase();
            const result = await product.insertOne(producto);
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
            const product = await this.getConectionDataBase();
            let documentId = new ObjectId(id);
            let producto = await product.findOne({ _id: documentId });
            return Promise.resolve(producto);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

    async findAll(): Promise<Producto[] | null> {
        try {
            const product = await this.getConectionDataBase();
            let productos = await product.find().toArray();
            return Promise.resolve(productos);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

    async update(producto: Producto): Promise<string | null> {
        try {
            const product = await this.getConectionDataBase();
            const result = await product.updateOne(producto);
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

    async delete(id: string | null): Promise<string | null> {
        try {
            const product = await this.getConectionDataBase();
            const result = await product.deleteOne({ _id: id });
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

    async getConectionDataBase() {
        return await this.monggoConecction.getConectionDataBase(this.document);
    }

    disconnect() {
        this.monggoConecction.disconnect();
    }
}
