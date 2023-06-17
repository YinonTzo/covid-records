package com.example.covid.repository;

import com.example.covid.entity.PreviousCondition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreviousConditionRepository extends JpaRepository<PreviousCondition, Long> {
}
