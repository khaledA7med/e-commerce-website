import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:any[] = [];
  categories:any[] = [];
  cartProducts:any[] = [];
  loading:boolean = false;

  constructor(private _ServiceService:ServiceService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts(){
    this.loading = true;
    this._ServiceService.getAllProducts().subscribe({
      next:(res)=>{
        this.products = res;
        this.loading = false;
      }, error:(err)=>{
        this.loading = false;
        alert(err.message);
      }
    })
  }

  getAllCategories(){
    this.loading = true;
    this._ServiceService.getAllCategories().subscribe({
      next:(res)=>{
        this.categories = res;
        this.loading = false;
      }, error:(err)=>{
        this.loading = false;
        alert(err.message);
      }
    })
  }

  filterCategory(event:any){
    let value = event.target.value;
    (value == "All") ? this.getAllProducts() : this.getProductsCategory(value);
  }

  getProductsCategory(key:string){
    this.loading = true;
    this._ServiceService.getProductsByCategory(key).subscribe({
      next:(res)=>{
        this.loading = false;
        this.products = res;
      }
    })
  }

  

  addToCart(event: any){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProducts.find(item => item.item.id == event.item.id)
      if(exist){
        alert("This product is already in your cart !")
      } else {
        this.cartProducts.push(event);
        localStorage.setItem("cart", JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    }
  }
}
