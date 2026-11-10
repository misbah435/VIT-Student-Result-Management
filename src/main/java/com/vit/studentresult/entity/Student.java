
package com.vit.studentresult.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String prn;

    @Column(nullable = false)
    private String name;

    private String branch;
    private Integer semester;

    private Integer subject1Internal;
    private Integer subject1External;

    private Integer subject2Internal;
    private Integer subject2External;

    private Integer subject3Internal;
    private Integer subject3External;

    private Integer subject4Internal;
    private Integer subject4External;

    private Integer subject5Internal;
    private Integer subject5External;

    public Student() {
    }

    // Getters and Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPrn() { return prn; }
    public void setPrn(String prn) { this.prn = prn; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public Integer getSemester() { return semester; }
    public void setSemester(Integer semester) { this.semester = semester; }

    public Integer getSubject1Internal() { return subject1Internal; }
    public void setSubject1Internal(Integer value) { subject1Internal = value; }

    public Integer getSubject1External() { return subject1External; }
    public void setSubject1External(Integer value) { subject1External = value; }

    public Integer getSubject2Internal() { return subject2Internal; }
    public void setSubject2Internal(Integer value) { subject2Internal = value; }

    public Integer getSubject2External() { return subject2External; }
    public void setSubject2External(Integer value) { subject2External = value; }

    public Integer getSubject3Internal() { return subject3Internal; }
    public void setSubject3Internal(Integer value) { subject3Internal = value; }

    public Integer getSubject3External() { return subject3External; }
    public void setSubject3External(Integer value) { subject3External = value; }

    public Integer getSubject4Internal() { return subject4Internal; }
    public void setSubject4Internal(Integer value) { subject4Internal = value; }

    public Integer getSubject4External() { return subject4External; }
    public void setSubject4External(Integer value) { subject4External = value; }

    public Integer getSubject5Internal() { return subject5Internal; }
    public void setSubject5Internal(Integer value) { subject5Internal = value; }

    public Integer getSubject5External() { return subject5External; }
    public void setSubject5External(Integer value) { subject5External = value; }

    // Calculate total marks out of 500
    @Transient
    public int getTotalMarks() {
        return value(subject1Internal) + value(subject1External)
             + value(subject2Internal) + value(subject2External)
             + value(subject3Internal) + value(subject3External)
             + value(subject4Internal) + value(subject4External)
             + value(subject5Internal) + value(subject5External);
    }

    // Calculate percentage
    @Transient
    public double getPercentage() {
        return getTotalMarks() / 5.0;
    }

    // Convert null marks to zero
    private int value(Integer marks) {
        return marks == null ? 0 : marks;
    }
}
