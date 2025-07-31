import { DetalleFactura } from '../../Domain/Entities/DetalleFactura';
import { IDetalleFactura } from '../../Domain/Interface/IDetalleFactura';
import { MongoConecction } from '../mongoConnection';


export class DetalleFacturaRepository implements IDetalleFactura{


    document: string = "DetalleFactura";
    private readonly monggoConecction: MongoConecction

    constructor() {
        this.monggoConecction = new MongoConecction()
    }


    async create(detalleFactura: DetalleFactura): Promise<string | null> {
        try {
            const facturadb = await this.getConectionDataBase();
            const result = await facturadb.insertOne(detalleFactura);
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

    async createAll(detalleFactura: DetalleFactura[]): Promise<string | null> {
        try {
            const facturadb = await this.getConectionDataBase();
            const result = await facturadb.insertMany(detalleFactura);
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
            const facturadb = await this.getConectionDataBase();            
            let detallesfactura = await facturadb.find({ factura: id }).toArray();
            return Promise.resolve(detallesfactura);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

 

    async delete(id: string | null): Promise<string | null> {
        try {
            const facturadb = await this.getConectionDataBase();
            const result = await facturadb.deleteMany({ factura: id });
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