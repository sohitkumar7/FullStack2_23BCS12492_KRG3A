package com.example.jpademo;

import com.example.jpademo.entity.Department;
import com.example.jpademo.entity.Employee;
import com.example.jpademo.repository.DepartmentRepository;
import com.example.jpademo.repository.EmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

/**
 * Spring Boot main class.
 *
 * The CommandLineRunner bean demonstrates that saving a single Department
 * (with two Employees in its list) persists all three rows thanks to
 * CascadeType.ALL.
 */
@SpringBootApplication
public class JpaOneToManyApplication {

    public static void main(String[] args) {
        SpringApplication.run(JpaOneToManyApplication.class, args);
    }

    /**
     * Runs automatically at startup to demonstrate the cascade persist.
     */
    @Bean
    CommandLineRunner demo(DepartmentRepository departmentRepo,
                           EmployeeRepository employeeRepo) {
        return args -> {

            System.out.println("=============================================================");
            System.out.println("   ONE-TO-MANY JPA RELATIONSHIP DEMO");
            System.out.println("=============================================================\n");

            // ── Step 1: Create a Department ─────────────────────────────
            Department engineering = new Department("Engineering");

            // ── Step 2: Create two Employees ────────────────────────────
            Employee emp1 = new Employee("Alice Johnson", "alice@example.com");
            Employee emp2 = new Employee("Bob Smith", "bob@example.com");

            // ── Step 3: Add employees to the department ─────────────────
            //    The helper method keeps both sides of the relationship in sync.
            engineering.addEmployee(emp1);
            engineering.addEmployee(emp2);

            // ── Step 4: Save ONLY the Department ────────────────────────
            //    CascadeType.ALL ensures the two Employee rows are also persisted.
            System.out.println(">>> Saving Department (with 2 Employees via CascadeType.ALL)...\n");
            departmentRepo.save(engineering);

            // ── Step 5: Verify persistence ──────────────────────────────
            long deptCount = departmentRepo.count();
            long empCount  = employeeRepo.count();

            System.out.println("\n=============================================================");
            System.out.println("   VERIFICATION");
            System.out.println("=============================================================");
            System.out.printf("   Departments in DB : %d  (expected 1)%n", deptCount);
            System.out.printf("   Employees   in DB : %d  (expected 2)%n", empCount);
            System.out.printf("   Total rows        : %d  (expected 3)%n", deptCount + empCount);
            System.out.println("=============================================================\n");

            // ── Step 6: Fetch and display ───────────────────────────────
            departmentRepo.findAll().forEach(dept -> {
                System.out.println("Department: " + dept.getName() + " (id=" + dept.getId() + ")");
                dept.getEmployees().forEach(emp ->
                    System.out.println("   └── Employee: " + emp.getName()
                            + " | " + emp.getEmail()
                            + " (id=" + emp.getId() + ")")
                );
            });

            System.out.println("\n>>> Demo complete. All 3 rows persisted successfully!");
        };
    }
}
