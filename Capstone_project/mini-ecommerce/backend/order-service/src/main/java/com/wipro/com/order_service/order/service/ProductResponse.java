package com.wipro.com.order_service.order.service;

public class ProductResponse {
    private int product_id;
    private int available_qty;
    private String date_of_manufacture;
    private String imageurl;
    private String make;
    private double price;
    private String prod_cat;
    private String prod_desc;
    private String prod_name;
    private double prod_rating;
    private String uom;

    public int getProduct_id() { return product_id; }
    public void setProduct_id(int product_id) { this.product_id = product_id; }

    public int getAvailable_qty() { return available_qty; }
    public void setAvailable_qty(int available_qty) { this.available_qty = available_qty; }

    public String getDate_of_manufacture() { return date_of_manufacture; }
    public void setDate_of_manufacture(String date_of_manufacture) { this.date_of_manufacture = date_of_manufacture; }

    public String getImageurl() { return imageurl; }
    public void setImageurl(String imageurl) { this.imageurl = imageurl; }

    public String getMake() { return make; }
    public void setMake(String make) { this.make = make; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getProd_cat() { return prod_cat; }
    public void setProd_cat(String prod_cat) { this.prod_cat = prod_cat; }

    public String getProd_desc() { return prod_desc; }
    public void setProd_desc(String prod_desc) { this.prod_desc = prod_desc; }

    public String getProd_name() { return prod_name; }
    public void setProd_name(String prod_name) { this.prod_name = prod_name; }

    public double getProd_rating() { return prod_rating; }
    public void setProd_rating(double prod_rating) { this.prod_rating = prod_rating; }

    public String getUom() { return uom; }
    public void setUom(String uom) { this.uom = uom; }
}
