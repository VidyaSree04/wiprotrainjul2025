package com.ecom.productservice.util;

public class AppConstants {
	public static final String ROLE_ADMIN = "ADMIN";
    public static final String ROLE_USER = "USER";

    public static final String JWT_SECRET = "f8ebc84491296612fa15d13b3cffbc4b";
    public static final long JWT_EXPIRATION_MS = 86400000L;

    public static final String INTERNAL_SERVICE_TOKEN = "product-internal-2025";

    public static final String PASSWORD_SALT = "@ecomSalt2025!";

    public static final String PRODUCT_NOT_FOUND = "Product not found";
    public static final String INSUFFICIENT_STOCK = "Insufficient stock for product";
}
