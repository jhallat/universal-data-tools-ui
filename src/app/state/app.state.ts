import { ConnectionState } from '../connection/state';
import {ErrorState} from './app.reducer';

export interface State {
    connection: ConnectionState;
    error: ErrorState;
}

