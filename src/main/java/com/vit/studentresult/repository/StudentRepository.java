
package com.vit.studentresult.repository;

import com.vit.studentresult.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByPrn(String prn);

    boolean existsByPrn(String prn);
}
