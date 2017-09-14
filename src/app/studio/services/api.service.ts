import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Connection } from '../../models/connection';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const KOMODO_WORKSPACE_URL = environment.komodoWorkspaceUrl;

@Injectable()
export class ApiService {

  constructor(
    private http: Http
  ) {
  }

  /**
   * Get the connections from the komodo rest interface
   * @returns {Observable<Connection[]>}
   */
  public getAllConnections(): Observable<Connection[]> {
    return this.http
      .get(KOMODO_WORKSPACE_URL + '/connections', this.getAuthRequestOptions())
      .map(response => {
        const connections = response.json();
        return connections.map((connection) => new Connection(connection));
      })
      .catch(this.handleError);
  }

  /**
   * Get the Auth RequestOptions
   * TODO: User and password are currently hardcoded to the DSB kit server credentials (dsbUser | 1demo-user1)
   * @returns {RequestOptions}
   */
  private getAuthRequestOptions(): RequestOptions {
    const headers = new Headers({ 'Authorization': 'Basic ' +  btoa('dsbUser:1demo-user1') });
    const options = new RequestOptions({ headers: headers });
    return options;
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
