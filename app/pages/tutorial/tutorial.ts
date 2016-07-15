import {Page, NavController, MenuController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';


interface Slide {
  title: string;
  description: string;
  image: string;
}

@Page({
  templateUrl: 'build/pages/tutorial/tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;

  constructor(private nav: NavController, private menu: MenuController) {

    this.slide();

  }

  slide(){
    this.slides = [
      {
        title: "<b>IPB</b> Green Campus",
        description: "Aplikasi ini bertujuan untuk memudahkan civitas IPB mengetahui informasi mengenai <b>Green Campus</b>",
        image: "img/gc.jpg",
      },
      {
        title: "Peminjaman Sepeda",
        description: "Mulai sekarang, kamu bisa meminjam dan mengembalikan sepeda dari shelter <b>dimana saja</b>. Cukup tunjukkan KTM kamu dan atau QR Code aplikasi ini.",
        image: "img/bike.jpg",
      },
      {
        title: "Shelter dan Halte",
        description: "Di aplikasi ini, kamu bisa mengetahui informasi lokasi dan shelter beserta jumlah sepeda, dan juga jadwal bus kampus",
        image: "img/bus.jpg",
      },
      {
        title: "Dan Masih Ada Lagi..",
        description: "Kami sangat menerima saran dan kritik dari semua pihak untuk keberlanjutan aplikasi ini, termasuk ide ataupun tambahan untuk aplikasi ini.",
        image: "img/idea.png",
      }
    ];
  }

  startApp() {
    this.nav.push(TabsPage);
  }

  startIos() {
    this.nav.pop();
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  onPageDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  onPageWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
