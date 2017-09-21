import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {Activity} from '../../../../models/activity';
import {NewActivity} from '../../../../models/new-activity';
import {ApiService} from '../../../services/api.service';
import {ArrayUtils} from '../../../util/common';

class Filters {
  nameFilter: string;
  sortDirection: string;
  layout: string;

  constructor(params?: any) {
    this.reset();
    if (params) {
      for (const key in params) {
        const value: string = params[key];
        this[key] = value;
      }
    }
  }

  public accepts(activity: Activity): boolean {
    const name: string = activity.keng__id.toLocaleLowerCase();
    const namef: string = this.nameFilter.toLocaleLowerCase();
    return name.indexOf(namef) >= 0;
  }

  public reset(): void {
    this.nameFilter = '';
    this.sortDirection = 'ASC';
    this.layout = 'card';
  }
}

@Component({
  moduleId: module.id,
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
  providers: [ApiService]
})
export class ActivitiesComponent implements OnInit {

  allActivities: Activity[] = [];
  filteredActivities: Activity[] = [];
  selectedActivities: Activity[] = [];
  filters: Filters = new Filters();
  dataloaded = false;

  activity1 = new Activity();
  activity2 = new Activity();
  activity3 = new Activity();

  constructor(private router: Router, private apiService: ApiService) {

  }

  public ngOnInit() {
    this.allActivities = this.apiService.getAllActivities();
    this.filteredActivities = this.filterActivities();
    this.dataloaded = true;
  }

  /**
   * Filters and sorts the list of activities based on the user input
   */
  private filterActivities(): Activity[] {
    // Clear the array first.
    this.filteredActivities.splice(0, this.filteredActivities.length);
    for (const activity of this.allActivities) {
      if (this.filters.accepts(activity)) {
        this.filteredActivities.push(activity);
      }
    }
    this.filteredActivities.sort( (a1: Activity, a2: Activity) => {
      let rval: number = a1.keng__id.localeCompare(a2.keng__id);
      if (this.filters.sortDirection === 'DESC') {
        rval *= -1;
      }
      return rval;
    });

    this.selectedActivities = ArrayUtils.intersect(this.selectedActivities, this.filteredActivities);

    return this.filteredActivities;
  }

  /**
   * Called to determine whether page data has been loaded yet.
   * @param key
   * @return {boolean}
   */
  public isLoaded(key: string): boolean {
    if (this.dataloaded) {
      return true;
    } else {
      return false;
    }
  }

  public onSelected(activity: Activity): void {
    // console.info("[ActivitiesComponent] Caught the onActivitySelected event!  Data: %o", activity);
    this.selectedActivities.push(activity);
  }

  public onDeselected(activity: Activity): void {
    // console.info("[ActivitiesComponent] Caught the onActivityDeselected event!  Data: %o", activity);
    this.selectedActivities.splice(this.selectedActivities.indexOf(activity), 1);
  }

  public isFiltered(): boolean {
    return this.allActivities.length !== this.filteredActivities.length;
  }

  public toggleSortDirection(): void {
    if (this.filters.sortDirection === 'ASC') {
      this.filters.sortDirection = 'DESC';
    } else {
      this.filters.sortDirection = 'ASC';
    }
    this.filterActivities();
  }

  public clearFilters(): void {
    this.filters.nameFilter = '';
    this.filterActivities();
  }

  public onListLayout(): void {
    this.filters.layout = 'list';
  }

  public onCardLayout(): void {
    this.filters.layout = 'card';
  }

  /**
   * Called to delete all selected APIs.
   */
  public deleteActivity(): void {
    const itemsToDelete: Activity[] = ArrayUtils.intersect(this.selectedActivities, this.filteredActivities);
    const selectedActiv = itemsToDelete[0];

    const activityToDelete: NewActivity = new NewActivity();
    activityToDelete.name = selectedActiv.keng__id;

    // Note: we can only delete selected items that we can see in the UI.
    console.log('[ActivitiesPageComponent] Deleting selected Activity.');
    /*
    this.apiService
      .deleteActivity(activityToDelete)
      .subscribe(
        () => {
          this.removeActivityFromList(selectedActiv);
          const link: string[] = [ '/activities' ];
          console.log('[CreateApiPageComponent] Navigating to: %o', link);
          this.router.navigate(link);
        }
      );
      */
  }

  private removeActivityFromList(activity: Activity) {
    this.allActivities.splice(this.allActivities.indexOf(activity), 1);
    this.filterActivities();
  }
}
