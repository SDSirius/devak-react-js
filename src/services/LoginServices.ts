import { HttpApiServices } from "./HttpApiServices";


export class LoginServices extends HttpApiServices {
    async login(body:any, setToken:any){
        const {data} = await this.post('/auth/login', body);
        console.log(data)

        if (data){
            localStorage.setItem("id", data.id);
            localStorage.setItem("email", data.email);
            localStorage.setItem("token", data.token);

            const userResponse = await this.get(`/user/${data.id}`);
            if (userResponse && userResponse.data){
                const user = userResponse.data;
                
                console.log(user)

                localStorage.setItem("name", user.name);
                
                if (user.avatar){
                    localStorage.setItem("avatar", user.avatar);
                }
            }
            setToken(data.token);
        }
    }

    logout(setToken:any){
        localStorage.clear();
        setToken('');
    }
}