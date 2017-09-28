import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NewConnection} from '../../../../models/new-connection';
import {ApiService} from '../../../services/api.service';
import {AbstractPageComponent} from '../../../components/abstract-page.component';

@Component({
  selector: 'app-edit-connection',
  templateUrl: './edit-connection.component.html',
  styleUrls: ['./edit-connection.component.css']
})
export class EditConnectionComponent extends AbstractPageComponent {

//  @ViewChild(AddConnectionFormComponent) form: AddConnectionFormComponent;

  constructor(private router: Router, route: ActivatedRoute, private apiService: ApiService) {
    super(route);
  }

  /**
   * Called when the Add Connection form (component) emits a "add-connection" event.  This is bound to
   * from the add-connection.page.html template.
   * @param {NewConnection} connection
   */
  /*
  public onCreateConnection(connection: NewConnection) {
    console.log('[AddConnectionComponent] onCreateConnection(): ' + JSON.stringify(connection));
    this.apiService
      .createConnection(connection)
      .subscribe(
        () => {
          this.form.creatingConnection = false;
          const link: string[] = [ '/connections' ];
          console.log('[AddConnectionComponent] Navigating to: %o', link);
          this.router.navigate(link);
        }
      );

  }
  */
}
