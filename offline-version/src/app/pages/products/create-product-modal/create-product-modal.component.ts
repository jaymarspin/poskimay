import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Product } from "src/app/models/Product";

@Component({
  selector: "app-create-product-modal",
  templateUrl: "./create-product-modal.component.html",
  styleUrls: ["./create-product-modal.component.scss"],
})
export class CreateProductModalComponent implements OnInit {
  product: Product;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit(): void {}

  cancel() {
    console.log(this.product);
    return this.modalCtrl.dismiss(null, "cancel");
  }

  confirm() {}
}
