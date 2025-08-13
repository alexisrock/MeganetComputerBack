import { Cliente } from "../../Domain/Entities/Cliente";
import { IRepository } from "../../Domain/Interface/IRespository";
import { injectable } from "inversify";
import { ObjectId, OptionalId } from 'mongodb';
import { BaseRepository } from "./BaseRepository";


@injectable()
export class AuthRepository extends BaseRepository implements IRepository {

    document: string = "Cliente";
   

    constructor() {
        super();
       
    }


    async update(cliente: Cliente): Promise<string | null> {
        try {
            const client = await this.getConectionDataBase(this.document);
            const result = await client.updateOne({ _id: cliente._id },{ $set:  cliente });
            if (result.modifiedCount > 0) {
                return cliente._id!.toString() ?? null;
            }

            return null;
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

    async findAll(): Promise<Cliente[] | null> {
        try {
            const client = await this.getConectionDataBase(this.document);

            let clientes = await client.find().toArray()



            const clientesdb: Cliente[] = clientes.map((doc: any) => ({
                ...doc,
                _id: doc._id?.toString(), // Convierte ObjectId a string
            }));

            return Promise.resolve(clientesdb)
        } catch (error) {
            throw error
        } finally {
            this.disconnect();
        }
    }

    async findById(id: string): Promise<Cliente | null> {
        try {
            const client = await this.getConectionDataBase(this.document);
            let documentId = new ObjectId(id);
            let cliente = await client.findOne({ _id: documentId }) as Cliente | null;;
            return Promise.resolve(cliente);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

    async insert(cliente: Cliente): Promise<string | null> {
        try {
            const client = await this.getConectionDataBase(this.document);
            if (typeof cliente._id === "string") {
                // Convertir string a ObjectId
                (cliente as any)._id = new ObjectId(cliente._id);
            }


            const result = await client.insertOne(cliente as unknown as OptionalId<Document>);
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

    async findByEmail(email: string): Promise<Cliente | null> {
        try {
            if (email === "" || email === undefined)
                return Promise.resolve(null);

            const client = await this.getConectionDataBase(this.document)
            let cliente = await client.findOne({ email: email }) as Cliente | null;
            return Promise.resolve(cliente);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

    async findByCedula(cedula: string | null): Promise<Cliente | null> {
        try {
            if (cedula === "" || cedula === undefined)
                return null;

            const client = await this.getConectionDataBase(this.document);
            let cliente = await client.findOne({ cedula: cedula }) as Cliente | null;
            return Promise.resolve(cliente);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

 
}