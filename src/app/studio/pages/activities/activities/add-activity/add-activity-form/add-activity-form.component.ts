import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Router} from '@angular/router';
import {NewActivity} from '../../../../../../models/new-activity';

@Component({
  selector: 'app-add-activity-form',
  templateUrl: './add-activity-form.component.html',
  styleUrls: ['./add-activity-form.component.css']
})
export class AddActivityFormComponent implements OnInit {

  @Output() onCreateActivity = new EventEmitter<NewActivity>();

  model = new NewActivity();
  creatingActivity = false;

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  get currentActivity() { return JSON.stringify(this.model); }

  /**
   * Called when the user clicks the "Create Activity" submit button on the form.
   */
  public createActivity(): void {
    const activity: NewActivity = new NewActivity();
    activity.setName(this.model.getName());
    activity.setDescription(this.model.getDescription());
    activity.setSourceConnection(this.model.getSourceConnection());
    activity.setTargetConnection(this.model.getTargetConnection());

    console.log('[AddActivityFormComponent] Firing create-activity event: %o', activity);

    this.creatingActivity = true;
    this.onCreateActivity.emit(activity);
  }

  public cancelAdd(): void {
    const link: string[] = [ '/activities' ];
    this.router.navigate(link);
  }

}
