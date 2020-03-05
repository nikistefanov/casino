import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://stage.whgstage.com/front-end-test';

export abstract class ApiService {
    constructor(private http: HttpClient) { }

    protected getInternal<T>(relativeUrl: string): Observable<T> {
        return this.http.get<T>(`${API_URL}${relativeUrl}`);
    }
}
