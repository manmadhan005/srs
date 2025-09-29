package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import com.examly.springapp.model.Leave;
import com.examly.springapp.repository.LeaveRepository;

@Service
public class LeaveServiceImpl implements LeaveService {

    @Autowired
    private LeaveRepository leaveRepository;

    @Override
    public Leave createLeave(Leave leave) {
        return leaveRepository.save(leave);
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
            return leaveRepository.save(l);
        }
        return null;
    }

    @Override
    public boolean deleteLeave(Long id) {
        if (leaveRepository.existsById(id)) {
            leaveRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Page<Leave> getLeavesPaginated(int page, int size) {
        return leaveRepository.findAll(PageRequest.of(page, size));
    }
}
