import {Page, NavController, Loading, Alert, Storage, LocalStorage} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {UserData} from '../../providers/user-data';
import {Http} from '@angular/http';


@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;
  status: any;
  response: any;
  creds: any;
  storage: any;
  nim: any;

  constructor(private nav: NavController, private userData: UserData, private http: Http) {
    this.storage = new Storage(LocalStorage);
    this.status = "";
    http.get("http://210.16.120.17/test.php")
          .subscribe(data => {
                  this.status = data._body;
          })
  }

  alertGagal() {
    let alert = Alert.create({
      title: '<div primary>Login Gagal</div>',
      subTitle: 'Tidah terhubung, cek koneksi kamu',
      buttons: ['OK']
    });
    this.nav.present(alert);
  }

  salah() {
    let alert = Alert.create({
      title: '<div primary>Login Gagal</div>',
      subTitle: 'Username / Password kamu salah',
      buttons: ['OK']
    });
    this.nav.present(alert);
  }

  loadingGagal() {
    let loading = Loading.create({
      content: "Please wait...",
      duration: 3000
    });

    loading.onDismiss(() => {
      this.alertGagal();
    });

    this.nav.present(loading);
  }

  save(){
    this.http.get('http://greentransport.ipb.ac.id/api/get_data_mahasiswa.php?nim='+this.response)
      .map(res => res.json())
        .subscribe(data => {
          this.storage.set("nama", data[0]['mahasiswaNama']);
          this.storage.set("mahasiswastatus", data[0]['mahasiswaStatus']);
          this.storage.set("denda", data[0]['mahasiswaDenda']);
          this.storage.set("qrcode", data[0]['encode']);
          this.storage.set("barcode", data[0]['barcode']);
          this.storage.set("status", true);
    });
  }

  presentLoading() {
    let loading = Loading.create({
      content: "Please wait...",
      duration: 4000
    });

    loading.onDismiss(() => {
        if (!this.status){
          this.alertGagal();
        }
        else if (this.response){
          this.submitted = true;
          this.userData.setNim(this.response);
          this.userData.setStatus(1);
          this.nav.pop();
        }
        else {
          this.salah();
          this.response = '';
        }
    });

    this.nav.present(loading);

  }

  onLogin() {
      this.status = "";
      this.http.get("http://210.16.120.17/test.php")
          .subscribe(data => {
                  this.status = data._body;
          })

      this.creds = JSON.stringify({username: this.login.username, password: this.login.password});
      this.http.post("http://greentransport.ipb.ac.id/api/api.php", this.creds)
              .subscribe(data => {
                      this.response = data._body;
                      this.save();
                      this.submitted = true;
                      this.userData.login(this.login.username);
          });

      this.presentLoading();
  }

  cancel() {
    this.nav.pop();
  }
}
