import { HttpApiServices } from "./HttpApiServices";

export class CarServices extends HttpApiServices{
    async find(term: string) {
        return await this.get(`/cars/${term}`);
    }
    
    async findById(id: string) {
        return await this.get(`/cars/id/${id}`);
    }


    async findByUser(userId:string){
        return await this.get(`/cars/user/${userId}`)
    }

    async filters(filter:string){
        return await this.get(`/cars/filters/${filter}`);
    }

    async getFilteredCars (filter:string){
        console.log(filter  )
        return await this.post(`/cars/filters`, filter);
    }

    async insertCar (formData: FormData){
        console.log({formData},formData)
        await this.post(`/cars/upload`,formData);
    }
    
}