export type Property = {
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
};
