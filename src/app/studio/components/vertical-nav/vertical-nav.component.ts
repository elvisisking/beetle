import { Component, OnInit } from '@angular/core';
import {Router, NavigationStart} from '@angular/router';

/**
 * Models the sub-menus off the main left-hand vertical nav.
 */
enum VerticalNavSubMenuType {
    None, Activities, Connections
}

@Component({
  moduleId: module.id,
  selector: 'app-vertical-nav',
  templateUrl: './vertical-nav.component.html',
  styleUrls: ['./vertical-nav.component.less']
})

export class VerticalNavComponent implements OnInit {

    public subMenuTypes: any = VerticalNavSubMenuType;
    public currentSubMenu: VerticalNavSubMenuType = VerticalNavSubMenuType.None;
    public subMenuOut = false;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
        console.log('Subscribing to router events.');
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.onShadeClick();
            }
        });
    }

    /**
     * Returns true if the currently active route is /activities/*
     * @returns {boolean}
     */
    isActivitiesRoute(): boolean {
        return this.router.isActive('/activities', true);
    }

    /**
     * Returns true if the currently active route is /connections/*
     * @returns {boolean}
     */
    isConnectionsRoute(): boolean {
        return this.router.isActive('/connections', true);
    }

    /**
     * Called when the user clicks the vertical menu shade (the grey shaded area behind the submenu div that
     * is displayed when a sub-menu is selected).  Clicking the shade makes the sub-menu div go away.
     */
    onShadeClick(): void {
        this.subMenuOut = false;
        setTimeout(() => {
            this.currentSubMenu = VerticalNavSubMenuType.None;
        }, 180);
    }

    /**
     * Toggles a sub-menu off the main vertical left-hand menu bar.  If the sub-menu is
     * already selected, it de-selects it.
     * @param subMenu the sub-menu to toggle
     */
    toggleSubMenu(subMenu: VerticalNavSubMenuType): void {
        if (this.subMenuOut && this.currentSubMenu === subMenu) {
            this.onShadeClick();
        } else {
            this.currentSubMenu = subMenu;
            this.subMenuOut = true;
        }
    }

}
