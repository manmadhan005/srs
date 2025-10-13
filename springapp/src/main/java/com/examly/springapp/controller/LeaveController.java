package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.examly.springapp.model.Leave;
import com.examly.springapp.service.LeaveService;

@CrossOrigin(
 origins = "https://8081-bdecbfeafecccdbcbeeaefdcadcfebaceabaa.premiumproject.examly.io",
 allowedHeaders = "*",
 methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}
)

@RestController
@RequestMapping("/leaves")
public class LeaveController {

 @Autowired
 private LeaveService leaveService;

 @GetMapping
 public List<Leave> getAllLeave() {
  return leaveService.getAllLeave();
 }

 @PostMapping
 public Leave createLeave(@RequestBody Leave leave) {
    leave.setStatus("Pending");
  return leaveService.createLeave(leave);
 }

 @PutMapping("/{id}")
 public ResponseEntity<Leave> updateLeave(@PathVariable Long id, @RequestBody Leave leave) {
  Leave updatedLeave = leaveService.updateLeave(id, leave);
  if (updatedLeave == null) {
   return ResponseEntity.notFound().build();
  }
  return ResponseEntity.ok(updatedLeave);
 }

 @DeleteMapping("/{id}")
 public ResponseEntity<Void> deleteLeave(@PathVariable Long id) {
  boolean isDeleted = leaveService.deleteLeave(id);
  if (isDeleted) {
   return ResponseEntity.noContent().build();
  } else {
   return ResponseEntity.notFound().build();
  }
 }

 @GetMapping("/page")
 public Page<Leave> getLeavesPaginated(
   @RequestParam(defaultValue = "0") int page,
   @RequestParam(defaultValue = "5") int size) {
  return leaveService.getLeavesPaginated(page, size);
 } 

 @PutMapping("/{id}/approve")
 public ResponseEntity<Leave> approveLeave(@PathVariable Long id) {
  Leave updatedLeave = leaveService.updateLeaveStatus(id, "Approved");
  if (updatedLeave == null) {
   return ResponseEntity.notFound().build();
  }
  return ResponseEntity.ok(updatedLeave);
 }

 @PutMapping("/{id}/reject")
 public ResponseEntity<Leave> rejectLeave(@PathVariable Long id) {
  Leave updatedLeave = leaveService.updateLeaveStatus(id, "Rejected");
  if (updatedLeave == null) {
   return ResponseEntity.notFound().build();
  }
  return ResponseEntity.ok(updatedLeave);
 }
}


 