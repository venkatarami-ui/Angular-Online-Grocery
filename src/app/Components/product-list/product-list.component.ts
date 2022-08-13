import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Shared/_interfaces/Iproduct';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductCrudService } from 'src/app/Shared/Services/product-crud.service';
import { ProductModel } from 'src/app/Shared/_interfaces/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: ProductModel = new ProductModel();
  keyData: IProduct[] = [];
  productData!: any;
  searchValue!: string;

  date: Date = new Date();

  showAddBtn!: boolean;
  showUpdateBtn!: boolean;

  productForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductCrudService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      id: ['', Validators.required],
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.getProducts();
  }

  clickAddProduct() {
    this.productForm.reset();
    this.showAddBtn = true;
    this.showUpdateBtn = false;
  }

  ////////////////////////////////////////////////////////////////

  // adding Product - post method
  addProduct(productForm: FormGroup) {
    if (productForm.valid) {
      this.productService.postProduct(productForm.value).subscribe(
        (res) => {
          console.log(res);
          console.log('Product Added Successfully');
          let ref = document.getElementById('cancel');
          ref?.click();
          this.productForm.reset();
        },
        (err) => {
          console.log('Something went Wrong');
        }
      );
    } else {
      console.log('Insufficient data Entered');
    }
  }

  ////////////////////////////////////////////////////////

  // Getting Product
  getProducts() {
    this.productService.getProduct().subscribe((res) => {
      // console.log(res);
      this.productData = Object.values(res);

      for (let k in res) {
        // console.log('Key' + key);

        this.keyData.push({ k, ...res[k] });
        this.products = { k, ...res[k] };
      }

      return this.keyData, this.products;
    });
  }

  /////////////////////////////////////////////////////////////////////////

  //edit Product
  editProduct(product: any) {
    this.showAddBtn = false;
    this.showUpdateBtn = true;

    this.products.k = product.k;
    this.productForm.controls['id'].setValue(product.id);
    this.productForm.controls['productName'].setValue(product.productName);
    this.productForm.controls['category'].setValue(product.category);
    this.productForm.controls['price'].setValue(product.price);
    this.productForm.controls['date'].setValue(product.date);
    this.productForm.controls['description'].setValue(product.description);
  }
  // update product
  updateProduct() {
    this.products.productName = this.productForm.value.productName;
    this.products.id = this.productForm.value.id;
    this.products.category = this.productForm.value.category;
    this.products.date = this.productForm.value.date;
    this.products.price = this.productForm.value.price;
    this.products.description = this.productForm.value.description;

    this.productService
      .updateProduct(this.products, this.products.k)
      .subscribe((res) => {
        console.log('Updated Succesfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.productForm.reset();
        // this.getProducts();
      });
  }

  ////////////////////////////////////////////////////////////////

  //Delete Product
  removeProduct(key: any) {
    const Cbox = confirm('Are you sure you want to delete this Product?');

    if (Cbox) {
      return this.productService.deleteProduct(key).subscribe((res) => {});
    } else {
      return null;
    }
  }
}
