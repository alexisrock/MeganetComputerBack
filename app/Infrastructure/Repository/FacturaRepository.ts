import { injectable } from 'inversify';
import { Factura } from '../../Domain/Entities/Factura';
import { IFactura } from '../../Domain/Interface/IFactura';
import { ObjectId, OptionalId } from 'mongodb';
import { Collection } from 'mongoose';
import { BaseRepository } from './BaseRepository';
@injectable()
export class FacturaRepository extends BaseRepository  implements IFactura{


    document: string = "Factura";
 

    constructor() {
        super()
    }

    async create(factura: Factura): Promise<string | null> {
        try {
            const facturadb = await this.getConectionDataBase(this.document);
            const result = await facturadb.insertOne(factura as unknown as OptionalId<Document>);
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
            const facturadb = await this.getConectionDataBase(this.document);
            let documentId = new ObjectId(id) ;
            let inventario = await facturadb.findOne({ _id: documentId }) as Factura | null;
            return Promise.resolve(inventario);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

    async findAll(): Promise<Factura[] | null> {
          try {
            const facturadb = await this.getConectionDataBase(this.document) as Collection;
            let facturas = await facturadb.find().toArray();
            const Facturas: Factura[] = facturas.map((doc: any) => ({
                ...doc,
                _id: doc._id?.toString(), // Convierte ObjectId a string
            }));
            return Promise.resolve(Facturas);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }
    async update(factura: Factura): Promise<string | null> {
        try {
            const facturadb = await this.getConectionDataBase(this.document);
            const result = await facturadb.updateOne({  _id: factura._id },  // Asegúrate de convertir el string a ObjectId
            { $set: { factura}});
        if (result.modifiedCount > 0) {
            return factura._id?.toString() ?? null;
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
            const facturadb = await this.getConectionDataBase(this.document);
            const result = await facturadb.deleteOne({ _id: new ObjectId(id) });
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