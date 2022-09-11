import { Component, OnInit } from "@angular/core";
import { GlobalService } from "../../services/global.service";
import { HttpService } from "../../services/http.service";
import { PopoverController } from "@ionic/angular";
import { Category } from "src/app/models/category";
import { categoryRepository } from "src/app/repositories/category/category.repository";
@Component({
  selector: "app-add-category",
  templateUrl: "./add-category.component.html",
  styleUrls: ["./add-category.component.scss"],
})
export class AddCategoryComponent implements OnInit {
  category: any;
  constructor(
    public global: GlobalService,
    public http: HttpService,
    private popoverController: PopoverController,
    private categoryRepository: categoryRepository
  ) {}

  ngOnInit() {}

  async submit() {
    if (this.category) {
      this.global.loading = true;
      const data: Category = {
        category: this.category,
      };
      await this.categoryRepository.create(data).then((res) => {
        this.popoverController.dismiss();
      });
    }

    // this.http.addPerson().subscribe(res =>{
    //   console.log(res)
    // })
  }
}
