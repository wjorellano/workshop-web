import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService] // Añade ApiService aquí
})
export class AppComponent implements OnInit {
  customers: any[] = [];
  orders: any[] = [];
  totalOrders: number = 0;
  selectedCustomer: any | null = null; // Inicializa como null para evitar posibles errores

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.apiService.getCustomers().subscribe((data: any) => {
      this.customers = data;
    });
  }

  onCustomerChange(customerNumber: string) {
    if (customerNumber) {
      this.apiService.getCustomerById(customerNumber).subscribe((data: any) => {
        this.selectedCustomer = data[0] || null; // Asegurarse de que sea null si no hay datos
      });

      this.loadOrders(customerNumber);
    } else {
      this.selectedCustomer = null;
      this.orders = [];
      this.totalOrders = 0;
    }
  }


  loadOrders(customerNumber: string) {
    this.apiService.getOrdersByCustomer(customerNumber).subscribe((data: any) => {
      this.orders = data;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalOrders = this.orders.reduce((total, order) => total + (order?.total || 0), 0); // Manejo de nulls
  }
}