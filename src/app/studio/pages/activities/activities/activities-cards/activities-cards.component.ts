/**
 * @license
 * Copyright 2017 JBoss Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Component, EventEmitter, Output, Input} from '@angular/core';
import {Activity} from '../../../../../models/activity';


@Component({
  moduleId: module.id,
  selector: 'app-activities-cards',
  templateUrl: 'activities-cards.component.html',
  styleUrls: ['activities-cards.component.css']
})
export class ActivitiesCardsComponent {

  @Input() activities: Activity[];
  @Input() selectedActivities: Activity[];
  @Output() onActivitySelected: EventEmitter<Activity> = new EventEmitter<Activity>();
  @Output() onActivityDeselected: EventEmitter<Activity> = new EventEmitter<Activity>();
  @Output() onTagSelected: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Constructor.
   */
  constructor() {}

  public toggleActivitySelected(activity: Activity): void {
    if (this.isSelected(activity)) {
      this.onActivityDeselected.emit(activity);
    } else {
      this.onActivitySelected.emit(activity);
    }
  }

  public isSelected(activity: Activity): boolean {
    return this.selectedActivities.indexOf(activity) !== -1;
  }

  public selectTag(tag: string, event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.onTagSelected.emit(tag);
  }

}

