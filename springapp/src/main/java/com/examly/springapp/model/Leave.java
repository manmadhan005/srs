package com.examly.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name ="leave_request")
public class Leave {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String employeeName;
  private String startDate;
  private String endDate;
  private String reason;
  private String status;
  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }
  public String getEmployeeName() {
    return employeeName;
  }
  public void setEmployeeName(String employeeName) {
    this.employeeName = employeeName;
  }
  public String getStartDate() {
    return startDate;
  }
  public void setStartDate(String startDate) {
    this.startDate = startDate;
  }
  public String getEndDate() {
    return endDate;
  }
  public void setEndDate(String endDate) {
    this.endDate = endDate;
  }
  public String getReason() {
    return reason;
  }
  public void setReason(String reason) {
    this.reason = reason;
  }
  public String getStatus() {
    return status;
  }
  public void setStatus(String status) {
    this.status = status;
  }
  public Leave(Long id, String employeeName, String startDate, String endDate, String reason, String status) {
    this.id = id;
    this.employeeName = employeeName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.reason = reason;
    this.status = status;
  }
  public Leave() {
  }

  

}

