package com.ecom.userservice.entity;


import jakarta.persistence.*;


import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(nullable = false, unique = true)
	    private String username;

	    @Column(nullable = false)
	    private String password;

	    @Column(unique = true)
	    private String email;

	    private String name;

	    @ElementCollection(fetch = FetchType.EAGER)
	    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
	    @Column(name = "role")
	    private Set<String> roles = new HashSet<>();

	    // Constructors
	    public User() {}

	    public User(String username, String password, String email, String name, Set<String> roles) {
	        this.username = username;
	        this.password = password;
	        this.email = email;
	        this.name = name;
	        this.roles = roles;
	    }

	    // Getters & Setters
	    public Long getId() { return id; }
	    public void setId(Long id) { this.id = id; }

	    public String getUsername() { return username; }
	    public void setUsername(String username) { this.username = username; }

	    public String getPassword() { return password; }
	    public void setPassword(String password) { this.password = password; }

	    public String getEmail() { return email; }
	    public void setEmail(String email) { this.email = email; }

	    public String getName() { return name; }
	    public void setName(String name) { this.name = name; }

	    public Set<String> getRoles() { return roles; }
	    public void setRoles(Set<String> roles) { this.roles = roles; }
}
