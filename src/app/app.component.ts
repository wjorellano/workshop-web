import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]
})
export class AppComponent implements OnInit {
  customers: any[] = [];
  orders: any[] = [];
  totalOrders: number = 0;
  selectedCustomer: any | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.apiService.getCustomers().subscribe((data: any) => {
      this.customers = data;
    });
  }

  onCustomerChange(event: Event) {
    const target = event.target as HTMLSelectElement; // Convierte el target en HTMLSelectElement
    const customerNumber = target.value;

    if (customerNumber) {
      this.apiService.getCustomerById(customerNumber).subscribe((data: any) => {
        this.selectedCustomer = data[0] || null;
      });

      this.loadOrders(customerNumber);
      console.log("Customer number: ", customerNumber);
    } else {
      this.selectedCustomer = null;
      this.orders = [];
      this.totalOrders = 0;
    }
  }

  loadOrders(customerNumber: string) {
    this.apiService.getOrdersByCustomer(customerNumber).subscribe((data: any) => {
      console.log("Orders: ", data[0].orders);
      this.orders = data[0].orders;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalOrders = this.orders.reduce((total, order) => total + (order?.total || 0), 0);
  }
}
