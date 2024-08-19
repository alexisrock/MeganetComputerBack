import { MongoClient } from 'mongodb';
 

 
export  class MongoConecction{

   
  private readonly mongoUri: string="mongodb://mongoadmin:secret@192.168.50.27:4545";

 
  private readonly database: string="meganet";


  private client: MongoClient;



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