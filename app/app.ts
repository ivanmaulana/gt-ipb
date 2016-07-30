import {ViewChild} from '@angular/core';
import {App, Events, Platform, Nav, MenuController, Storage, LocalStorage} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {UserData} from './providers/user-data';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {TutorialPage} from './pages/tutorial/tutorial';
import {RankPage} from './pages/rank/rank';

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@App({
  templateUrl: 'build/app.html',
  providers: [UserData],
})
class ConferenceApp {
  rootPage = TabsPage;
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageObj[] = [
    { title: 'Schedule', component: TabsPage, icon: 'calendar' },
    { title: 'Speakers', component: TabsPage, index: 1, icon: 'contacts' },
    { title: 'About', component: TabsPage, index: 3, icon: 'information-circle'},
    { title: 'Rank', component: TabsPage, index: 4, icon: 'information-circle'},
  ];
  loggedInPages: PageObj[] = [
    { title: 'Logout', component: TabsPage, icon: 'log-out' }
  ];
  loggedOutPages: PageObj[] = [
    { title: 'Login', component: LoginPage, icon: 'log-in' }
  ];

  status: boolean;
  storage: any;

  constructor(
    private events: Events,
    private userData: UserData,
    private menu: MenuController,
    platform: Platform
  ) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

  }

}
