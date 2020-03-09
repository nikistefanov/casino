import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { IGame } from '../../../db-models/game';

const BASE_URL = '/games.php';

export class GameService extends ApiService {
    get(): Observable<IGame[]> {
        return this.getInternal<IGame[]>(BASE_URL);
    }
}
