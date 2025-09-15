package com.ecom.productservice.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {
	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(nullable=false)
	    private String name;
	    private String description;
	    private String category;
	    private String imageUrl;

	    @Column(nullable=false)
	    private Double price;

	    @Column(nullable=false)
	    private Integer quantity;

	    @Column(nullable=false)
	    private Boolean active = true;

	    public Product() {}

	    public Product(Long id, String name, String description, String category,
	                   String imageUrl, Double price, Integer quantity, Boolean active) {
	        this.id = id; this.name = name; this.description = description;
	        this.category = category; this.imageUrl = imageUrl;
	        this.price = price; this.quantity = quantity; this.active = active;
	    }

	    // Getters & Setters
	    public Long getId() { return id; }
	    public void setId(Long id) { this.id = id; }
	    public String getName() { return name; }
	    public void setName(String name) { this.name = name; }
	    public String getDescription() { return description; }
	    public void setDescription(String description) { this.description = description; }
	    public String getCategory() { return category; }
	    public void setCategory(String category) { this.category = category; }
	    public String getImageUrl() { return imageUrl; }
	    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
	    public Double getPrice() { return price; }
	    public void setPrice(Double price) { this.price = price; }
	    public Integer getQuantity() { return quantity; }
	    public void setQuantity(Integer quantity) { this.quantity = quantity; }
	    public Boolean getActive() { return active; }
	    public void setActive(Boolean active) { this.active = active; }
}
