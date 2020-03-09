import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { IJackpot } from '../../../db-models/jackpot';

const BASE_URL = '/jackpots.php';

export class JackpotService extends ApiService {
    get(): Observable<IJackpot[]> {
        return this.getInternal<IJackpot[]>(BASE_URL);
    }
}
