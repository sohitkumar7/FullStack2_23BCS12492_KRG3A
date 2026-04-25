package com.example.jpademo.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Department entity — the "One" side of the One-to-Many relationship.
 *
 * Each Department can have many Employees.
 * - fetchType = LAZY  → employees are loaded on demand, not eagerly.
 * - cascade  = ALL    → persist / merge / remove / refresh / detach
 *                        operations on Department cascade to its Employees.
 */
@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    /**
     * One-to-Many mapping:
     *  - mappedBy  = "department" refers to the field in Employee that owns the FK.
     *  - fetch     = LAZY         → collection is a proxy until accessed.
     *  - cascade   = ALL          → all JPA lifecycle events propagate to children.
     *  - orphanRemoval = true     → removing an Employee from this list deletes the row.
     */
    @OneToMany(mappedBy = "department", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Employee> employees = new ArrayList<>();

    // ─── Constructors ───────────────────────────────────────────

    public Department() {
    }

    public Department(String name) {
        this.name = name;
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

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }

    // ─── Convenience helper ─────────────────────────────────────

    /**
     * Adds an employee and keeps both sides of the relationship in sync.
     */
    public void addEmployee(Employee employee) {
        employees.add(employee);
        employee.setDepartment(this);
    }

    @Override
    public String toString() {
        return "Department{id=" + id + ", name='" + name + "'}";
    }
}
