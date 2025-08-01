import { injectable } from "inversify";
import { Categoria } from "../../Domain/Entities/Categoria";
import { ICategoria } from "../../Domain/Interface/ICategoria";
import { MongoConecction } from "../mongoConnection";
import { ObjectId, OptionalId } from 'mongodb';


@injectable()
export class CategoriaRepository implements ICategoria {

    document: string = "Categoria";
    private readonly monggoConecction: MongoConecction

    constructor() {
        this.monggoConecction = new MongoConecction()
    }

    async findByName(name: string | null): Promise<Categoria | null> {
        try {
            const category = await this.getConectionDataBase();
            let cliente = await category.findOne({ nombreCategoria: name }) as Categoria | null;
            return Promise.resolve(cliente);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }


    async create(categoria: Categoria): Promise<string | null> {
        try {
            const category = await this.getConectionDataBase();
            const result = await category.insertOne(categoria as unknown as OptionalId<Document>);
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

    async findById(id: string): Promise<Categoria | null> {
        try {
            const category = await this.getConectionDataBase();
            let documentId = new ObjectId(id);
            let cliente = await category.findOne({ _id: documentId }) as Categoria | null;
            return Promise.resolve(cliente);
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

    async findAll(): Promise<Categoria[] | null> {
        try {
            const category = await this.getConectionDataBase();
            let cliente = await category.find().toArray();
            if (!cliente) return null;

            const categorias: Categoria[] = cliente.map((doc: any) => ({
                ...doc,
                _id: doc._id?.toString(), // Convierte ObjectId a string
            }));

            return categorias;
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

    async update(categoria: Categoria): Promise<string | null> {
        try {
            const category = await this.getConectionDataBase();
            const result = await category.updateOne({ _id: new ObjectId(categoria._id) },  // Asegúrate de convertir el string a ObjectId
                { $set: { nombreCategoria: categoria.nombreCategoria } });
            if (result.modifiedCount > 0) {
                return categoria._id ?? null;
            }

            return null;
        } catch (error) {
            throw error;
        } finally {
            this.disconnect();
        }
    }

    async delete(id: string | null): Promise<string | null> {
        if (!id) return null; // Validación temprana

        try {
            const category = await this.getConectionDataBase();

            const result = await category.deleteOne({ _id: new ObjectId(id) });

            if (result.deletedCount > 0) {
                return id; // Eliminación exitosa
            }

            return null; // No se eliminó ningún documento
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