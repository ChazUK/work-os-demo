import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Property {
  id: string;
  address: string;
  type: string;
  bedrooms: number;
  monthlyRent: number;
  tenant: string | null;
  tenancyStatus: 'occupied' | 'vacant' | 'notice';
  nextInspection: Date | null;
  complianceStatus: 'compliant' | 'expiring-soon' | 'expired';
  arrears: number;
}

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
  metrics: DashboardMetrics = {
    totalProperties: 12,
    occupiedProperties: 10,
    vacantProperties: 2,
    activeTenancies: 10,
    totalMonthlyRent: 14500,
    totalArrears: 2350,
    expiringCertificates: 3,
    maintenanceIssues: 5,
  };

  properties: Property[] = [
    {
      id: '1',
      address: '24 Maple Street, Manchester, M1 2AB',
      type: '2-bed Flat',
      bedrooms: 2,
      monthlyRent: 1200,
      tenant: 'John Smith',
      tenancyStatus: 'occupied',
      nextInspection: new Date('2024-12-15'),
      complianceStatus: 'compliant',
      arrears: 0,
    },
    {
      id: '2',
      address: '15 Oak Avenue, Birmingham, B2 4QA',
      type: '3-bed House',
      bedrooms: 3,
      monthlyRent: 1500,
      tenant: 'Sarah Johnson',
      tenancyStatus: 'occupied',
      nextInspection: new Date('2024-11-20'),
      complianceStatus: 'expiring-soon',
      arrears: 1500,
    },
    {
      id: '3',
      address: '8 Park Lane, Leeds, LS1 5JG',
      type: '1-bed Studio',
      bedrooms: 1,
      monthlyRent: 850,
      tenant: null,
      tenancyStatus: 'vacant',
      nextInspection: null,
      complianceStatus: 'compliant',
      arrears: 0,
    },
    {
      id: '4',
      address: '42 High Street, Liverpool, L1 9DQ',
      type: '2-bed Flat',
      bedrooms: 2,
      monthlyRent: 1100,
      tenant: 'Michael Brown',
      tenancyStatus: 'occupied',
      nextInspection: new Date('2024-12-01'),
      complianceStatus: 'compliant',
      arrears: 0,
    },
    {
      id: '5',
      address: '67 Victoria Road, Sheffield, S1 2GH',
      type: '4-bed House',
      bedrooms: 4,
      monthlyRent: 1800,
      tenant: 'Emma Wilson',
      tenancyStatus: 'occupied',
      nextInspection: new Date('2025-01-10'),
      complianceStatus: 'compliant',
      arrears: 0,
    },
    {
      id: '6',
      address: '33 Church Street, Bristol, BS1 5PF',
      type: '2-bed Flat',
      bedrooms: 2,
      monthlyRent: 1250,
      tenant: 'David Taylor',
      tenancyStatus: 'notice',
      nextInspection: new Date('2024-11-25'),
      complianceStatus: 'compliant',
      arrears: 850,
    },
    {
      id: '7',
      address: '91 Station Road, Newcastle, NE1 4ST',
      type: '3-bed House',
      bedrooms: 3,
      monthlyRent: 1400,
      tenant: 'Lisa Anderson',
      tenancyStatus: 'occupied',
      nextInspection: new Date('2024-12-20'),
      complianceStatus: 'expired',
      arrears: 0,
    },
    {
      id: '8',
      address: '12 Mill Lane, Nottingham, NG1 3AA',
      type: '1-bed Flat',
      bedrooms: 1,
      monthlyRent: 900,
      tenant: null,
      tenancyStatus: 'vacant',
      nextInspection: null,
      complianceStatus: 'compliant',
      arrears: 0,
    },
    {
      id: '9',
      address: '56 Bridge Road, Leicester, LE1 6ZH',
      type: '2-bed Flat',
      bedrooms: 2,
      monthlyRent: 1150,
      tenant: 'James Martin',
      tenancyStatus: 'occupied',
      nextInspection: new Date('2024-11-30'),
      complianceStatus: 'compliant',
      arrears: 0,
    },
    {
      id: '10',
      address: '78 Green Lane, Southampton, SO14 0AA',
      type: '3-bed House',
      bedrooms: 3,
      monthlyRent: 1600,
      tenant: 'Rachel White',
      tenancyStatus: 'occupied',
      nextInspection: new Date('2024-12-05'),
      complianceStatus: 'expiring-soon',
      arrears: 0,
    },
    {
      id: '11',
      address: '29 Castle Street, Edinburgh, EH1 2DP',
      type: '2-bed Flat',
      bedrooms: 2,
      monthlyRent: 1300,
      tenant: 'Tom Harris',
      tenancyStatus: 'occupied',
      nextInspection: new Date('2025-01-15'),
      complianceStatus: 'compliant',
      arrears: 0,
    },
    {
      id: '12',
      address: '45 Market Square, Cardiff, CF10 1BH',
      type: '3-bed House',
      bedrooms: 3,
      monthlyRent: 1450,
      tenant: 'Sophie Clark',
      tenancyStatus: 'occupied',
      nextInspection: new Date('2024-12-10'),
      complianceStatus: 'expiring-soon',
      arrears: 0,
    },
  ];

  get occupancyRate(): number {
    return Math.round(
      (this.metrics.occupiedProperties / this.metrics.totalProperties) * 100,
    );
  }

  get propertiesWithArrears(): Property[] {
    return this.properties.filter((p) => p.arrears > 0);
  }

  get upcomingInspections(): Property[] {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    return this.properties
      .filter((p) => p.nextInspection && p.nextInspection <= thirtyDaysFromNow)
      .sort(
        (a, b) =>
          (a.nextInspection?.getTime() || 0) -
          (b.nextInspection?.getTime() || 0),
      );
  }

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
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }
}
