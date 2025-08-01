import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

export class MongoConecction {
  private static client: MongoClient;
  private readonly mongoUri = process.env.MONGODB_URI || "";
  private readonly database = process.env.MONGODB_DATABASE || "";

  constructor() {
    if (!MongoConecction.client) {
      MongoConecction.client = new MongoClient(this.mongoUri, {
        connectTimeoutMS: 30000,
        serverSelectionTimeoutMS: 30000,
      });
    }
  }

  async connect(): Promise<MongoClient> {
    try {
      if (!MongoConecction.client) {
        throw new Error("MongoClient no fue inicializado.");
      }

      // Verifica si la conexión aún está viva
      await MongoConecction.client.db("admin").command({ ping: 1 });
      console.log("✅ Ya estaba conectado a MongoDB");
    } catch (err) {
      console.log("🔄 Cliente no conectado, intentando conectar...");
      await MongoConecction.client.connect();
      console.log("✅ Conectado exitosamente");
    }

    return MongoConecction.client;
  }


  async getConectionDataBase(collection: string) {
    console.log("🔌 Intentando obtener conexión");
    const client = await this.connect();
    return client.db(this.database).collection(collection);
  }

  async disconnect() {
    if (MongoConecction.client) {
      await MongoConecction.client.close();
    }
  }
}
