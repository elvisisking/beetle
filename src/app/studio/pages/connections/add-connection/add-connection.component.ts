import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {NewConnection} from '../../../../models/new-connection';
import {AddConnectionFormComponent} from './add-connection-form/add-connection-form.component';
import {ApiService} from '../../../services/api.service';

@Component({
  selector: 'app-add-connection',
  templateUrl: './add-connection.component.html',
  styleUrls: ['./add-connection.component.css']
})
export class AddConnectionComponent implements OnInit {

  @ViewChild(AddConnectionFormComponent) form: AddConnectionFormComponent;

  constructor(private router: Router, private apiService: ApiService) {
  }

  ngOnInit() {
  }

  /**
   * Called when the Add Connection form (component) emits a "add-connection" event.  This is bound to
   * from the add-connection.page.html template.
   * @param {NewConnection} connection
   */
  public onCreateConnection(connection: NewConnection) {
    console.log('[AddConnectionComponent] onCreateConnection(): ' + JSON.stringify(connection));
    this.apiService
      .createConnection(connection)
      .subscribe(
      () => {
        this.form.creatingConnection = false;
        const link: string[] = [ '/connections' ];
        console.log('[CreateApiPageComponent] Navigating to: %o', link);
        this.router.navigate(link);
      }
    );

  }

}
