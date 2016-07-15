import {NavController, Page, ActionSheet, Alert, Storage, LocalStorage} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {TabsPage} from '../tabs/tabs';
import {TutorialPage} from '../tutorial/tutorial';
import {UserData} from '../../providers/user-data';

@Page({
  templateUrl: 'build/pages/info/info.html'
})
export class InfoPage {
  storage: any;
  nama: any;
  status: any;

  onPageWillEnter(){
    this.storage.get('hasLoggedIn').then((status) => {
         this.status = status;
    });
  }

  constructor(private nav: NavController, private user: UserData) {
    this.storage = new Storage(LocalStorage);
  }

  login(){
    this.nav.push(LoginPage);
  }

  logout(){
    setTimeout(() => {
      this.user.logout();
      this.nav.push(TabsPage);
    }, 1000);
  }

  logoutIos(){
    setTimeout(() => {
      this.user.logout();
      this.nav.push(TutorialPage);
    }, 1000);
  }

  tutorial(){
    this.nav.push(TutorialPage);
  }

}
