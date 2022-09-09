import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { GlobalService } from "../services/global.service";
import { HttpService } from "../services/http.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { WebcamImage, WebcamInitError, WebcamUtil } from "ngx-webcam";
import { Observable, Subject } from "rxjs";
import { PopoverController } from "@ionic/angular";
import { ChooseEmployeeComponent } from "./choose-employee/choose-employee.component";
import { UserRepository } from "src/app/repositories/users/users.repository";
import { User } from "src/app/models/user";
import { SQLiteService } from "src/app/services/sqlite.service";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.page.html",
  styleUrls: ["./signin.page.scss"],
})
export class SigninPage implements OnInit {
  uname: any;
  password: any;

  accountType: any;
  @Output() getPicture = new EventEmitter<WebcamImage>();
  showWebcam = true;
  isCameraExist = true;

  errors: WebcamInitError[] = [];
  loading: any = false;

  // webcam snapshot trigger
  public trigger: Subject<void> = new Subject<void>();
  public nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();
  myimage: any;
  constructor(
    private router: Router,
    public global: GlobalService,
    public http: HttpService,
    public popoverController: PopoverController,
    public userRespository: UserRepository,
    public sql: SQLiteService
  ) {
    this.accountType = "employee";
  }

  ngOnInit() {
    this.userRespository
      .getUser()
      .then((res) => {
        if (res.length === 0) {
          const user: User = {
            id: 0,
            name: "admin",
            username: "admin",
            password: "admin",
            restrictions: "{}",
          };
          this.userRespository.createUser(user);
        }
      })
      .finally(() => {
        // this.userRespository.getUserById(3).then((res) => {
        //   console.log(res);
        // });
      });

    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.isCameraExist = mediaDevices && mediaDevices.length > 0;
      }
    );
  }

  async setter(id) {
    // localStorage.setItem('accountType', this.accountType);
    return await localStorage.setItem("id", id);
  }
  login() {
    if (this.uname && this.password && this.accountType) {
      const data = {
        username: this.uname,
        password: this.password,
      };
      const user: User = {
        username: this.uname,
        password: this.password,
      };
      this.userRespository.login(user).then((res) => {
        if (res.name) {
          this.setter(res.id).then(() => {
            // this.router.navigate(['splash'], { replaceUrl: true });

            this.router.navigate(["owners-panel"], { replaceUrl: true });
          });
        }
      });

      // this.loading = true;
      // this.http.postData('signin.php', data).subscribe({
      //   next: (datas) => {
      //     console.log(datas.body);
      //     this.loading = false;
      //     if (datas.body.message === 'success') {
      //       Swal.fire('Good job!', 'You clicked the button!', 'success').then(
      //         () => {
      //           this.setter(datas.body.id).then(() => {
      //             if (this.accountType === 'owner') {
      //               this.router.navigate(['splash'], { replaceUrl: true });
      //             } else {
      //               this.router.navigate(['home'], { replaceUrl: true });
      //             }
      //           });
      //         }
      //       );
      //     } else {
      //       Swal.fire({
      //         icon: 'error',
      //         title: 'Oops...',
      //         text: datas.body.message,
      //         footer: ' ',
      //       });
      //     }
      //   },
      //   onerror: (error) => {
      //     console.log(error);
      //     this.loading = false;
      //   },
      // });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Complete the fields",
        footer: " ",
      });
    }
  }
  public takeSnapshot(): void {
    this.trigger.next();
  }

  public onOffWebCame() {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError) {
    this.errors.push(error);
  }

  public changeWebCame(directionOrDeviceId: boolean | string) {
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage) {
    console.log(webcamImage);
    this.myimage = webcamImage.imageAsDataUrl;
    this.getPicture.emit(this.myimage);
    this.showWebcam = false;
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
  change() {
    delete this.myimage;
    this.showWebcam = true;
  }
  submit() {
    this.presentPopover().then(() => {
      delete this.myimage;
      this.showWebcam = true;
    });
  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: ChooseEmployeeComponent,
      cssClass: "my-custom-class",
      translucent: true,
      componentProps: {
        myimage: this.myimage,
      },
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log("onDidDismiss resolved with role", role);
  }
}
