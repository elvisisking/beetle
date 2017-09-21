import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {NewActivity} from '../../../../../models/new-activity';
import {NewConnection} from '../../../../../models/new-connection';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  activity: NewActivity = new NewActivity();
  srcConn: NewConnection = new NewConnection();
  tgtConn: NewConnection = new NewConnection();

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.activity.setSourceConnection(this.srcConn);
    this.activity.setTargetConnection(this.tgtConn);
    this.activity.name = 'ANewActivity';
    this.activity.sourceConnection.name = 'SourceConnName';
    this.activity.sourceConnection.jndiName = 'java:/srcConn';
    this.activity.sourceConnection.driverName = 'com.srcDriver';
    this.activity.targetConnection.name = 'TargetConnName';
    this.activity.targetConnection.jndiName = 'java:/tgtConn';
    this.activity.targetConnection.driverName = 'com.tgtDriver';
  }

}
