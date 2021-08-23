import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ClientsService {
    private baseUrl: string = environment.baseUrl
    constructor(private http: HttpClient){}

    getClients(data: any): Observable<any>{
        // data.numsolicitud = Math.random();
        data.numsolicitud = '12345';
        delete data.documentIdName;
        data.documentIdNumber.length > 8 ? data.documentIdType = "1" : data.documentIdType = "2";
        return this.http.post(`${this.baseUrl}/api/rtg`, data)
    }
} 