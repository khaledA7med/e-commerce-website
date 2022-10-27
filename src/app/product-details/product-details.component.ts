import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id:any;
  data:any = {};
  loading:boolean = false;
  constructor(private _ActivatedRoute:ActivatedRoute, private _ServiceService:ServiceService) { 
    this.id = this._ActivatedRoute.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct(){
    this.loading = true;
    this._ServiceService.getProductById(this.id).subscribe({
      next:(res)=>{
        this.loading = false;
        this.data = res;
      },
      error: err =>{
        this.loading = false;
        alert(err);
      }
    })
  }

}
