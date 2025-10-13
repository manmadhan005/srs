package com.examly.springapp.service;

import com.examly.springapp.model.Leave;
import com.examly.springapp.repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeaveServiceImpl implements LeaveService {

  @Autowired
  private LeaveRepository leaveRepository;

  @Autowired
  private NotificationService notificationService;

  @Override
  public Leave createLeave(Leave leave) {
    Leave newLeave = leaveRepository.save(leave);
    notificationService.createNotification("New leave request submitted by " + leave.getEmployeeName());
    return newLeave;
  }

  @Override
  public List<Leave> getAllLeave() {
    return leaveRepository.findAll();
  }

  @Override
  public Leave updateLeave(Long id, Leave leave) {
    Optional<Leave> existingLeave = leaveRepository.findById(id);
    if (existingLeave.isPresent()) {
      Leave l = existingLeave.get();
      l.setEmployeeName(leave.getEmployeeName());
      l.setStartDate(leave.getStartDate());
      l.setEndDate(leave.getEndDate());
      l.setReason(leave.getReason());
      l.setStatus(leave.getStatus());
      Leave updatedLeave = leaveRepository.save(l);
      notificationService.createNotification("Leave request " + id + " has been updated. New status: " + leave.getStatus());
      return updatedLeave;
    }
    return null;
  }

  @Override
  public boolean deleteLeave(Long id) {
    if (leaveRepository.existsById(id)) {
      leaveRepository.deleteById(id);
      notificationService.createNotification("Leave request " + id + " has been deleted.");
      return true;
    }
    return false;
  }

  @Override
  public Page<Leave> getLeavesPaginated(int page, int size) {
    return leaveRepository.findAll(PageRequest.of(page, size));
  }

  @Override
  public Leave updateLeaveStatus(Long id, String status) {
    Optional<Leave> existingLeave = leaveRepository.findById(id);
    if (existingLeave.isPresent()) {
      Leave leave = existingLeave.get();
      leave.setStatus(status);
      Leave updatedLeave = leaveRepository.save(leave);
      notificationService.createNotification("Leave request " + id + " has been " + status.toLowerCase() + ".");
      return updatedLeave;
    }
    return null;
  }
}

