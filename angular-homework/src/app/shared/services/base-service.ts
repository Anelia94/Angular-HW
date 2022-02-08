import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export class BaseService {

    constructor(protected httpClient: HttpClient) { }

    protected url = '';

    get(): Observable<any> {
        return this.httpClient.get<any>(this.url);
    }

    post(object: any): Observable<any> {
        return this.httpClient.post(this.url, object);
    }

    put(object: any): Observable<any> {
        return this.httpClient.put(this.url, object);
    }

    delete() {
        return this.httpClient.delete(this.url);
    }
}

