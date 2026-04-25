package com.example.jpademo.entity;

import jakarta.persistence.*;

/**
 * Employee entity — the "Many" side of the One-to-Many relationship.
 *
 * Each Employee belongs to exactly one Department.
 * The @ManyToOne side owns the foreign key column (department_id).
 */
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    /**
     * Many-to-One mapping:
     *  - @JoinColumn defines the FK column in the employees table.
     *  - This is the owning side of the relationship.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    // ─── Constructors ───────────────────────────────────────────

    public Employee() {
    }

    public Employee(String name, String email) {
        this.name = name;
        this.email = email;
    }

    // ─── Getters & Setters ──────────────────────────────────────

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    @Override
    public String toString() {
        return "Employee{id=" + id + ", name='" + name + "', email='" + email + "'}";
    }
}
