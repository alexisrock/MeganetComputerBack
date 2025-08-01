import { Collection } from 'mongoose';
import { DetalleFactura } from '../../Domain/Entities/DetalleFactura';
import { IDetalleFactura } from '../../Domain/Interface/IDetalleFactura';
import { MongoConecction } from '../mongoConnection';
import { ObjectId, OptionalId } from 'mongodb';


export class DetalleFacturaRepository implements IDetalleFactura{


    document: string = "DetalleFactura";
    private readonly monggoConecction: MongoConecction

    constructor() {
        this.monggoConecction = new MongoConecction()
    }

 


    async create(detalleFactura: DetalleFactura): Promise<string | null> {
        try {
            const facturadb = await this.getConectionDataBase();
            const result = await facturadb.insertOne(detalleFactura as unknown as OptionalId<Document>);
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

    
    
    async findByIdFactura(id: string | null): Promise<DetalleFactura[] | null> {
        try {
            if (!id) {
                return Promise.resolve(null);
            }
            const facturadb = await this.getConectionDataBase() as Collection;            
            let detallesfactura = await facturadb.find({ factura: id }).toArray();

            const detallesfacturas: DetalleFactura[] = detallesfactura.map((doc: any) => ({
                ...doc,
                _id: doc._id?.toString(), 
            }));

            return detallesfacturas;             
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

 

    async delete(id: string ): Promise<string | null> {
        try {
            const facturadb = await this.getConectionDataBase();
            const result = await facturadb.deleteMany({ factura: new ObjectId(id) });
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