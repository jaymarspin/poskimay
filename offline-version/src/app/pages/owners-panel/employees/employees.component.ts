import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { Router } from "@angular/router";
import { EmployeeActionsComponent } from "../employee-actions/employee-actions.component";
import { GlobalService } from "../../services/global.service";
import { HttpService } from "../../services/http.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.scss"],
})
export class EmployeesComponent implements OnInit {
  employee: any;
  employeescount: any;

  page: number;
  limit: number;
  pagebtntmp: any;
  pagebtn: any;
  searchVal: string;
  constructor(
    public global: GlobalService,
    public http: HttpService,
    private router: Router,
    public popoverController: PopoverController
  ) {
    this.employee = new Array();
    this.pagebtn = new Array();

    this.page = 1;
    this.limit = 10;
    this.searchVal = "";
  }

  async presentPopover(ev: any, id, disabled) {
    const popover = await this.popoverController.create({
      component: EmployeeActionsComponent,
      cssClass: "my-custom-class",
      event: ev,
      translucent: true,
      componentProps: {
        id,
        disabled,
      },
    });
    await popover.present();
    await popover.onDidDismiss();
    this.loadData().then(() => {});
  }

  ngOnInit() {
    this.loadData();
  }

  addemployee() {}

  async loadData() {
    this.global.loading = true;
    let link = `get-employees.php?
    limit=${this.limit}
    &page=${this.page}`;
    if (this.searchVal) {
      link = `get-employees.php?
    limit=${this.limit}
    &page=${this.page}
    &search=${this.searchVal}`;
    }
  }

  pager(page) {
    this.page = page;
    this.loadData();
  }

  gofurther(link) {
    this.router.navigate([link]);
  }
  ionViewDidEnter() {
    this.loadData().then(() => {});
    this.global.adminTeller = new Array();
    this.global.adminTeller.push("Employee");
  }

  async search() {
    await this.loadData();
  }
  refresh() {
    this.searchVal = "";
    this.page = 1;
    this.loadData();
  }
}
