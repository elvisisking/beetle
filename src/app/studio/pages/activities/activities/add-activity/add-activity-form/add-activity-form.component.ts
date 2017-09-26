import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
  }

  get currentActivity() { return JSON.stringify(this.model); }

  /**
   * Called when the user clicks the "Create Activity" submit button on the form.
   */
  public createActivity(): void {
    const activity: NewActivity = new NewActivity();
    activity.name = this.model.name;
    activity.description = this.model.description;
    activity.sourceConnection = this.model.sourceConnection;
    activity.targetConnection = this.model.targetConnection;

    console.log('[AddActivityFormComponent] Firing create-activity event: %o', activity);

    this.creatingActivity = true;
    this.onCreateActivity.emit(activity);
  }

}
