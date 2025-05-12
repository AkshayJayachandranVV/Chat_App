import { HttpClient } from "@angular/common/http"
import { EndPoints } from "./endPoints"
import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
  })
export class ApiSerivice {

    constructor(private http : HttpClient) {}
    
    signup(formData : {username : string , email : string , phone : string , password : string}){
        return this.http.post(EndPoints.signup,formData)
    }

    login(formData : {email : string , password : string}){
        return this.http.post(EndPoints.login,formData)
    }

    chatUsers(){
        return this.http.get(EndPoints.chatUsers)
    }


}