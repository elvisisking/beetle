import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Activity } from '../../models/activity';
import { NewActivity } from '../../models/new-activity';
import { Connection } from '../../models/connection';
import { NewConnection } from '../../models/new-connection';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const KOMODO_WORKSPACE_URL = environment.komodoWorkspaceUrl;

@Injectable()
export class ApiService {

  activity1 = new Activity();
  activity2 = new Activity();
  activity3 = new Activity();
  activities: Activity[] = [this.activity1, this.activity2, this.activity3];
  newActivity1 = new NewActivity();

  constructor( private http: Http ) {
    this.activity1.keng__id = 'activity1';
    this.activity1.dv__sourceConnection = 'activity1SrcConn';
    this.activity1.dv__targetConnection = 'activity1TgtConn';
    this.activity2.keng__id = 'activity2';
    this.activity2.dv__sourceConnection = 'activity2SrcConn';
    this.activity2.dv__targetConnection = 'activity2TgtConn';
    this.activity3.keng__id = 'activity3';
    this.activity3.dv__sourceConnection = 'activity3SrcConn';
    this.activity3.dv__targetConnection = 'activity3TgtConn';
    this.newActivity1.name = 'newActivity1';
    this.newActivity1.sourceConnection.name = 'new1Src';
    this.newActivity1.sourceConnection.jdbc = true;
    this.newActivity1.sourceConnection.driverName = 'new1SrcDriver';
    this.newActivity1.sourceConnection.jndiName = 'new1SrcJndi';
    this.newActivity1.targetConnection.name = 'new1Tgt';
    this.newActivity1.targetConnection.jdbc = false;
    this.newActivity1.targetConnection.driverName = 'new1TgtDriver';
    this.newActivity1.targetConnection.jndiName = 'new1TgtJndi';
  }

  /**
   * Get the activities from the komodo rest interface
   * @returns {Activity[]}
   */
  public getAllActivities(): Activity[] {
    return this.activities;
    /*
    return this.http
      .get(KOMODO_WORKSPACE_URL + '/activities', this.getAuthRequestOptions())
      .map(response => {
        const activities = response.json();
        return activities.map((activity) => {const activ = new Activity(); activ.setValues(activity); return activ; });
      })
      .catch(this.handleError);
      */
  }

  /**
   * Create an activity via the komodo rest interface
   * @param {NewActivity} activity
   * @returns {Activity}
   */
  public createActivity(activity: NewActivity): NewActivity {
    return this.newActivity1;
    /*
    return this.http
      .post(KOMODO_WORKSPACE_URL + '/activities/' + activity.name, activity, this.getAuthRequestOptions())
      .map(response => {
        return new Activity();
      })
      .catch(this.handleError);
      */
  }

  /**
   * Delete an activity via the komodo rest interface
   * @param {NewActivity} activity
   */
  public deleteActivity(activity: NewActivity): NewActivity {
    /*
    return this.http
      .delete(KOMODO_WORKSPACE_URL + '/activities/' + activity.name, this.getAuthRequestOptions())
      .map(response => null)
      .catch(this.handleError);
      */
    return null;
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
        return connections.map((connection) => {const conn = new Connection(); conn.setValues(connection); return conn; });
      })
      .catch(this.handleError);
  }

  /**
   * Create a connection via the komodo rest interface
   * @param {NewConnection} connection
   * @returns {Observable<Connection>}
   */
  public createConnection(connection: NewConnection): Observable<NewConnection> {
    return this.http
      .post(KOMODO_WORKSPACE_URL + '/connections/' + connection.name, connection, this.getAuthRequestOptions())
      .map(response => {
        return new Connection();
      })
      .catch(this.handleError);
  }

  /**
   * Delete a connection via the komodo rest interface
   * @param {NewConnection} connection
   * @returns {Observable<Connection>}
   */
  public deleteConnection(connection: NewConnection): Observable<NewConnection> {
    return this.http
      .delete(KOMODO_WORKSPACE_URL + '/connections/' + connection.name, this.getAuthRequestOptions())
      .map(response => null)
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
