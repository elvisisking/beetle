import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {NewActivity} from '../../../../../models/new-activity';
import {AddActivityFormComponent} from './add-activity-form/add-activity-form.component';
import {ApiService} from '../../../../services/api.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  @ViewChild(AddActivityFormComponent) form: AddActivityFormComponent;

  constructor(private router: Router, private apiService: ApiService) {
  }

  ngOnInit() {
  }

  /**
   * Called when the Add Activity form (component) emits a "add-activity" event.  This is bound to
   * from the add-activity.page.html template.
   * @param {NewActivity} activity
   */
  public onCreateActivity(activity: NewActivity) {
    console.log('[AddActivityComponent] onCreateActivity(): ' + JSON.stringify(activity));
    this.apiService.createActivity(activity);
    const link: string[] = [ '/activities' ];
    console.log('[AddActivityComponent] Navigating to: %o', link);
    this.router.navigate(link);
  }

}
