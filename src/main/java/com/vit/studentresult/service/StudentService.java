
package com.vit.studentresult.service;

import com.vit.studentresult.entity.Student;
import com.vit.studentresult.repository.StudentRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Add or update student
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get student by ID
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    // Get student by PRN
    public Optional<Student> getStudentByPrn(String prn) {
        return studentRepository.findByPrn(prn);
    }

    // Check duplicate PRN
    public boolean existsByPrn(String prn) {
        return studentRepository.existsByPrn(prn);
    }

    // Delete student
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}
