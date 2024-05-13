

export interface IRepository{
    findById(email: String): Promise<any| undefined>;    
}