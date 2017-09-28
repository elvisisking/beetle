import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Router} from '@angular/router';
import {NewConnection} from '../../../../../models/new-connection';

@Component({
  selector: 'app-add-connection-form',
  templateUrl: './add-connection-form.component.html',
  styleUrls: ['./add-connection-form.component.css']
})
export class AddConnectionFormComponent implements OnInit {

  @Output() onCreateConnection = new EventEmitter<NewConnection>();

  model = new NewConnection();
  creatingConnection = false;

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  get currentConnection() { return JSON.stringify(this.model); }

  /**
   * Called when the user clicks the "Create Connection" submit button on the form.
   */
  public createConnection(): void {
    const connection: NewConnection = new NewConnection();
    connection.setName(this.model.getName());
    connection.setJndiName(this.model.getJndiName());
    connection.setDriverName(this.model.getDriverName());
    connection.setJdbc(this.model.isJdbc());

    console.log('[AddConnectionFormComponent] Firing create-connection event: %o', connection);

    this.creatingConnection = true;
    this.onCreateConnection.emit(connection);
  }

  public cancelAdd(): void {
    const link: string[] = [ '/connections' ];
    this.router.navigate(link);
  }

}
