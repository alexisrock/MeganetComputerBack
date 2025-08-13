import { MongoConecction } from "../mongoConnection"

export class BaseRepository {
  private readonly monggoConecction: MongoConecction;

  constructor() {
    this.monggoConecction = new MongoConecction();
  }

  async getConectionDataBase(document: string) {
    return await this.monggoConecction.getConectionDataBase(document);
  }

  disconnect() {
    this.monggoConecction.disconnect();
  }
}