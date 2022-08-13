import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Shared/Services/cart.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  billingForm!: FormGroup;
  eForm!: FormGroup;
  field!: FormGroup;
  payFormm!: FormGroup;

  myAddress: any = [];
  eAddress: any = [];
  fl: any;

  dAddr = ' 25,HSR Layout,Ashok nagar,Bangalore,Karnataka-605001,India.';
  dA: any;

  total: number;
  constructor(private cartService: CartService, private router: Router) {
    this.total = this.cartService.getTotalPrice();
  }

  ngOnInit(): void {
    this.billingForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      mobNo: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      addr1: new FormControl(null, [Validators.required]),
      addr2: new FormControl(null),
      addr3: new FormControl(null),
      addr4: new FormControl(null, [Validators.required]),
      addr5: new FormControl(null, [Validators.required]),
      addr6: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });

    this.payFormm = new FormGroup({
      cardo: new FormControl(null, [Validators.required]),
      cardn: new FormControl(null, [
        Validators.required,
        Validators.minLength(16),
      ]),
      cardm: new FormControl(null, [Validators.required]),
      cardy: new FormControl(null, [Validators.required]),
      cardcv: new FormControl(null, [Validators.required]),
    });

    this.eForm = new FormGroup({
      door: new FormControl(''),
      area: new FormControl(''),
      code: new FormControl(''),
    });
  }

  onPush() {
    const firstName = this.billingForm.get('firstName')?.value;
    const lastName = this.billingForm.get('lastName')?.value;
    const mobNo = this.billingForm.get('mobNo')?.value;
    const addr1 = this.billingForm.get('addr1')?.value;
    const addr2 = this.billingForm.get('addr2')?.value;
    const addr3 = this.billingForm.get('addr3')?.value;
    const addr4 = this.billingForm.get('addr4')?.value;
    const addr5 = this.billingForm.get('addr5')?.value;
    const addr6 = this.billingForm.get('addr6')?.value;

    this.myAddress.push({
      firstName1: firstName,
      lastName1: lastName,
      mobNo1: mobNo,
      addr11: addr1,
      addr22: addr2,
      addr33: addr3,
      addr44: addr4,
      addr55: addr5,
      addr66: addr6,
    });

    let ref = document.getElementById('close');
    ref?.click();
    this.billingForm.reset();
  }

  eSave() {
    const door = this.eForm.get('door')?.value;
    const area = this.eForm.get('area')?.value;
    const code = this.eForm.get('code')?.value;

    this.eAddress.push({
      door1: door,
      area1: area,
      code1: code,
    });
  }
  eShow() {
    const door = this.eForm.get('door')?.value;
    const area = this.eForm.get('area')?.value;
    const code = this.eForm.get('code')?.value;

    this.eAddress.push({
      door2: door,
      area2: area,
      code2: code,
    });
    //console.log(this.eAddress)
  }

  fshow() {
    this.dA = this.dAddr;
  }

  payment() {
    if (this.payFormm.valid) {
      console.log('Your order has been placed');
      this.total = 0;
      this.cartService.removeAllCartItem();
      this.router.navigate(['/dashboard']);
    } else {
      console.log('Please fill out the empty fields');
    }
  }
}
