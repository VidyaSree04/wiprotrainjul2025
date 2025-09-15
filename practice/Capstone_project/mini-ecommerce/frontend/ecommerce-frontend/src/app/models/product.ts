export interface Product {
  id: number;
  prodName: string;
  prodDesc: string;
  prodCat: string;
  make: string;
  availableQty: number;
  price: number;
  uom: string;
  prodRating: number;
  imageURL: string;
  dateOfManufacture: string; // or Date if you want to parse
}
