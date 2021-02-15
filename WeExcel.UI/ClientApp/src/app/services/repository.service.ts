import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EnvironmentService } from "./environment.service";

@Injectable()
export class RepositoryService {

    constructor(
        private httpClient: HttpClient,
        private environmentService: EnvironmentService) {
    }

    public get(route: string): Observable<any> {
        return this.httpClient.get(this.environmentService.baseUrl + route);
    }

    public post(route: string, body: any): Observable<any> {
        return this.httpClient.post(this.environmentService.baseUrl + route, body);
    }

    public put(route: string, body: any): Observable<any> {
        return this.httpClient.put(this.environmentService.baseUrl + route, body);
    }

    public delete(route: string): Observable<any> {
        return this.httpClient.delete(this.environmentService.baseUrl + route);
    }
}