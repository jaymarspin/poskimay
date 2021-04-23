import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../services/global.service'
import {AddCategoryComponent} from '../add-category/add-category.component'
import {HttpService} from '../../services/http.service'
import { PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2'



import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
 
 
 
import { Router } from '@angular/router'
import { WebView } from '@ionic-native/ionic-webview/ngx';
 
 
import { ImagePicker } from '@ionic-native/image-picker/ngx'; 
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
})
export class AddProductsComponent implements OnInit {
  productname:any
  stocks:any
  barcode:any
  category:any
  price:any


  categories


  imgsrc:any
  base64data:any

  
  constructor(public http: HttpService,private popoverController: PopoverController,public global: GlobalService,
    private crop: Crop,
    private file: File,  private imagePicker: ImagePicker,
    private router: Router,private webview: WebView, 
    private camera: Camera,private base64: Base64
    
    ) {
      this.imgsrc = "assets/icon/photo.svg"
    this.barcode = ""
   }

  ngOnInit() {
      this.loadCategory()
  }

  loadCategory(){
    this.global.loading = true
    this.http.getData("get-product-category.php?id="+localStorage.getItem("business_id")).subscribe({
      next: data => {
         
        this.categories = data
        this.global.loading = false
         
      },
      error: error => {
        this.global.loading = false
          console.error('There was an error!', error);
      }
    })
  }

  // loadDepartment(){
  //   this.global.loading = true
  //   this.http.getData("get-department.php?id=1").subscribe({
  //     next: data => {
  //       console.log(data)
  //       this.department = data
  //       this.global.loading = false
         
  //     },
  //     error: error => {
  //       this.global.loading = false
  //         console.error('There was an error!', error);
  //     }
  //   })
  // }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: AddCategoryComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

     await popover.onDidDismiss().then(
      (data: any) => {
       this.loadCategory()
      }) 
  }

  selectIMG(){
    
    let options = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      maximumImagesCount: 1,
      
      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
 
      
      // quality of resized image, defaults to 100
      quality             : 100,
       
      saveToPhotoAlbum    : true,
      correctOrientation  : true,
      encodingType        : this.camera.EncodingType.JPEG,
      targetHeight        : 1000,
      targetWidth         : 1000,
  
      // output type, defaults to FILE_URIs.
      // available options are 
      // window.imagePicker.OutputType.FILE_URI (0) or 
      // window.imagePicker.OutputType.BASE64_STRING (1)
   
  };
    this.imagePicker.getPictures(options).then((results) => {

      console.log(results)
      for (var i = 0; i < results.length; i++) {
        this.cropImage(results[i])
      }
    }, (err) => {
      console.log(err)
     });
  }

  cropImage(fileUrl) {
    this.crop.crop(fileUrl, { quality: 50 })
      .then(
        newPath => {
          this.imgsrc = this.webview.convertFileSrc(newPath)
          this.base64.encodeFile(newPath).then((base64File: string) => {
            this.base64data = base64File;
            console.log(this.base64data)
          }, (err) => {
            console.log(err);
          });
          
        },
        error => {
          console.log(error);
        }
      );
  }


  next(){
    if(this.productname && this.stocks && this.category && this.price){
      this.global.loading = true
      let data = {
        productname: this.productname,
        stocks: this.stocks,
        category: this.category,
        barcode: this.barcode,
        price: this.price,
        business_id: localStorage.getItem("business_id"),
        base64data: this.base64data
        
      }
      console.log(data)
      this.http.postData("add-product.php",data).subscribe({
        next: data =>{
          this.global.loading = false
          if(data.body.message =="success"){
            Swal.fire(
              'Good job!',
              'Successfully Added!',
              'success'
            ).then(() =>{
               delete(this.productname)
               delete(this.stocks)
               delete(this.category)
               delete(this.barcode)
               delete(this.price)
            })
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href>Why do I have this issue?</a>'
            })
          }
  
        },onerror: error =>{
          this.global.loading = false
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
            footer: ' '
          })
        }
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please complete the fields',
        footer: ' '
      })
    }
    
  }
}
