export interface Car {
  id: string;
  name: string;
  description: string;
  carType: string;
  tags: string[];
  imageUrl: string;
  createdAt: string;
  engine?: string;
  displacement?: string;
  fuelType?: string;
  mileage?: string;
  topSpeed?: string;
  maxPower?: string;
  emissionStandard?: string;
}