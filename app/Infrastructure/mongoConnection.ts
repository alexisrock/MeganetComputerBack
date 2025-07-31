import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

export  class MongoConecction{

   
  private readonly mongoUri: string = process.env.MONGODB_URI || "";

 
  private readonly database: string = process.env.MONGODB_DATABASE || "";


  private readonly client: MongoClient;



  constructor() {
    this.client = new MongoClient(this.mongoUri);
  }

  async connect(): Promise<MongoClient> {
    await this.client.connect();
    return this.client;
  }

  async disconnect(): Promise<void> {
    await this.client.close();
  }

  async getDatabase(collection: string): Promise<any> {  
    const database = (await this.connect()).db(this.database);
     return database.collection(collection);
  }


  async getConectionDataBase(document: string) {
    const client = await this.getDatabase(document);   
    return client
 }


}