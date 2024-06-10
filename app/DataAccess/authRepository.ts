import { IRepository } from "./IRespository";
import { MongoConecction } from "./mongoConnection";
import { injectable } from "inversify";



@injectable()
export class AuthRepository implements IRepository{
    
    private monggoConecction : MongoConecction

   constructor() {
      this.monggoConecction = new MongoConecction()
    }
  
   
    async findById(email: string ): Promise< any| undefined> {
        console.log(email)
        if(email=== "" || email ===  undefined )
            return Promise.resolve(undefined);
        // return await this.Cliente.findOne({ email: email}); 
        console.log("paso por aqui dos")
        const client = await this.monggoConecction.getDatabase("Usuario");    
        let cliente =  await client.findOne({ email: email}); 

        return Promise.resolve(cliente);
       
    }




    // ClienteSchema.pre('save', function(next){
    //     if (this.isModified('password')) {
    //         this.password = bcrypt.hashSync(this.password, saltRounds);
    //     }
    //      next();
    // });


}