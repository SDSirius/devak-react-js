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
        return await this.post(`/cars/filters`, filter);
    }

    async insertCar (formData: FormData){
        await this.post(`/cars/upload`,formData);
    }
    
    async updateCar (id:string, formData: FormData){
        await this.put(`/cars/${id}`,formData);
    }

    async deleteCar(id: string) {
        await this.delete(`/cars/${id}`);
    }
}