import { injectable } from 'inversify';
import { Factura } from '../../Domain/Entities/Factura';
import { IFactura } from '../../Domain/Interface/IFactura';

import { MongoConecction } from "../mongoConnection";
import { ObjectId } from 'mongodb';

@injectable()
export class FacturaRepository implements IFactura{


    document: string = "Factura";
    private readonly monggoConecction: MongoConecction

    constructor() {
        this.monggoConecction = new MongoConecction()
    }

    async create(factura: Factura): Promise<string | null> {
        try {
            const facturadb = await this.getConectionDataBase();
            const result = await facturadb.insertOne(factura);
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
    async findById(id: string | null): Promise<Factura | null> {
        try {
            if (!id) {
                return Promise.resolve(null);
            }
            const facturadb = await this.getConectionDataBase();
            let documentId = new ObjectId(id);
            let inventario = await facturadb.findOne({ _id: documentId });
            return Promise.resolve(inventario);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

    async findAll(): Promise<Factura[] | null> {
          try {
            const facturadb = await this.getConectionDataBase();
            let facturas = await facturadb.find().toArray();
            return Promise.resolve(facturas);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }
    async update(factura: Factura): Promise<string | null> {
        try {
            const facturadb = await this.getConectionDataBase();
            const result = await facturadb.updateOne(factura);
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
            const facturadb = await this.getConectionDataBase();
            const result = await facturadb.deleteOne({ _id: id });
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