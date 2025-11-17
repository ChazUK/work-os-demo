import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

interface FinanceMetric {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'flat';
  trendLabel: string;
}

interface CashflowMonth {
  month: string;
  income: number;
  expenses: number;
  net: number;
}

interface PropertyFinance {
  name: string;
  monthlyRent: number;
  expenses: number;
  net: number;
  occupancy: number;
  arrears: number;
}

@Component({
  selector: 'app-finance',
  imports: [CommonModule],
  templateUrl: './finance.html',
  styleUrl: './finance.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Finance {
  financeSummary: FinanceMetric[] = [
    {
      label: 'Monthly Rent',
      value: '£14,500',
      trend: 'up',
      trendLabel: '+5.4% vs last month',
    },
    {
      label: 'Monthly Expenses',
      value: '£4,200',
      trend: 'down',
      trendLabel: '-2.1% vs last month',
    },
    {
      label: 'Net Cashflow',
      value: '£10,300',
      trend: 'up',
      trendLabel: '+7.3% vs last month',
    },
    {
      label: 'Arrears',
      value: '£2,350',
      trend: 'flat',
      trendLabel: 'Unchanged this month',
    },
  ];

  monthlyCashflow: CashflowMonth[] = [
    { month: 'Jan', income: 13200, expenses: 3900, net: 9300 },
    { month: 'Feb', income: 13800, expenses: 4100, net: 9700 },
    { month: 'Mar', income: 14100, expenses: 4200, net: 9900 },
    { month: 'Apr', income: 14300, expenses: 4300, net: 10000 },
    { month: 'May', income: 14450, expenses: 4250, net: 10200 },
    { month: 'Jun', income: 14500, expenses: 4200, net: 10300 },
  ];

  propertyFinance: PropertyFinance[] = [
    {
      name: '24 Maple Street',
      monthlyRent: 1200,
      expenses: 320,
      net: 880,
      occupancy: 100,
      arrears: 0,
    },
    {
      name: '15 Oak Avenue',
      monthlyRent: 1500,
      expenses: 480,
      net: 1020,
      occupancy: 100,
      arrears: 1500,
    },
    {
      name: '8 Park Lane',
      monthlyRent: 850,
      expenses: 260,
      net: 590,
      occupancy: 0,
      arrears: 0,
    },
    {
      name: '91 Station Road',
      monthlyRent: 1400,
      expenses: 410,
      net: 990,
      occupancy: 100,
      arrears: 0,
    },
  ];

  get maxIncome(): number {
    return Math.max(...this.monthlyCashflow.map((m) => m.income));
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  }

  getTrendClass(trend: FinanceMetric['trend']): string {
    const classes: Record<FinanceMetric['trend'], string> = {
      up: 'trend-up',
      down: 'trend-down',
      flat: 'trend-flat',
    };
    return classes[trend] || '';
  }
}
