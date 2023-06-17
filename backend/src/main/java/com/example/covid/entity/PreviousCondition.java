package com.example.covid.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "PREVIOUS_CONDITIONS")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PreviousCondition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "PREVIOUS_CONDITION")
    private String previousCondition;
}
