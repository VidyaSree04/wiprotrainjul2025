package com.wipro.com.product_service.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    private String prodName;
    private String prodDesc;
    private String prodCat;
    private String make;
    private Integer availableQty;
    private Double price;
    private String uom;
    private double prodRating;
    
    @Column(name = "imageurl", columnDefinition = "TEXT")
    private String imageURL;
    private LocalDate dateOfManufacture;

    public Product() {}

    public Product(String prodName, String prodDesc, String prodCat, String make,
                   Integer availableQty, Double price, String uom,
                   double prodRating, String imageURL, LocalDate dateOfManufacture) {
        this.prodName = prodName;
        this.prodDesc = prodDesc;
        this.prodCat = prodCat;
        this.make = make;
        this.availableQty = availableQty;
        this.price = price;
        this.uom = uom;
        this.prodRating = prodRating;
        this.imageURL = imageURL;
        this.dateOfManufacture = dateOfManufacture;
    }

    // Getters & Setters
    public Long getId() { return productId; }
    public void setId(Long productId) { this.productId = productId; }

    public String getProdName() { return prodName; }
    public void setProdName(String prodName) { this.prodName = prodName; }

    public String getProdDesc() { return prodDesc; }
    public void setProdDesc(String prodDesc) { this.prodDesc = prodDesc; }

    public String getProdCat() { return prodCat; }
    public void setProdCat(String prodCat) { this.prodCat = prodCat; }

    public String getMake() { return make; }
    public void setMake(String make) { this.make = make; }

    public Integer getAvailableQty() { return availableQty; }
    public void setAvailableQty(Integer availableQty) { this.availableQty = availableQty; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getUom() { return uom; }
    public void setUom(String uom) { this.uom = uom; }

    public double getProdRating() { return prodRating; }
    public void setProdRating(double prodRating) { this.prodRating = prodRating; }

    public String getImageURL() { return imageURL; }
    public void setImageURL(String imageURL) { this.imageURL = imageURL; }

    public LocalDate getDateOfManufacture() { return dateOfManufacture; }
    public void setDateOfManufacture(LocalDate dateOfManufacture) { this.dateOfManufacture = dateOfManufacture; }
}
