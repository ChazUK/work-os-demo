import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Property } from '@work-os-demo/types';
import { environment } from '../../../../environments/environment';

interface DashboardMetrics {
  totalProperties: number;
  occupiedProperties: number;
  vacantProperties: number;
  activeTenancies: number;
  totalMonthlyRent: number;
  totalArrears: number;
  expiringCertificates: number;
  maintenanceIssues: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private http = inject(HttpClient);

  public metrics: DashboardMetrics = {
    totalProperties: 12,
    occupiedProperties: 10,
    vacantProperties: 2,
    activeTenancies: 10,
    totalMonthlyRent: 14500,
    totalArrears: 2350,
    expiringCertificates: 3,
    maintenanceIssues: 5,
  };

  public properties = toSignal(
    this.http.get<Property[]>(`${environment.apiUrl}/properties/properties`),
    { initialValue: [] },
  );

  public propertiesWithArrears = computed(() =>
    this.properties().filter((p) => p.arrears > 0),
  );

  get occupancyRate(): number {
    return Math.round(
      (this.metrics.occupiedProperties / this.metrics.totalProperties) * 100,
    );
  }

  public upcomingInspections = computed(() => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    return this.properties()
      .filter((p) => p.nextInspection && p.nextInspection <= thirtyDaysFromNow)
      .sort(
        (a, b) =>
          (a.nextInspection?.getTime() || 0) -
          (b.nextInspection?.getTime() || 0),
      );
  });

  getStatusBadgeClass(status: string): string {
    const classes: { [key: string]: string } = {
      occupied: 'status-occupied',
      vacant: 'status-vacant',
      notice: 'status-notice',
      compliant: 'status-compliant',
      'expiring-soon': 'status-warning',
      expired: 'status-expired',
    };
    return classes[status] || '';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  }

  formatDate(date: Date | null): string {
    if (!date) return 'N/A';

    const _date = typeof date === 'string' ? new Date(date) : date;

    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(_date);
  }
}
