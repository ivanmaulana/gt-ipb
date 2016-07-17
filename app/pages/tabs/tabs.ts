import {Page, NavParams} from 'ionic-angular';
import {HomePage} from '../home/home';
import {InfoPage} from '../info/info';
import {AboutPage} from '../about/about';
import {RankPage} from '../rank/rank';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = HomePage;
  tab2Root: any = InfoPage;
  tab3Root: any = RankPage;
  tab4Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
