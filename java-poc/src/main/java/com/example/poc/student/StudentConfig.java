package com.example.poc.student;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StudentConfig {

  @Bean
  CommandLineRunner commandLineRunner(StudentRepository repository) {
    return args -> {
      Student test = new Student(1L, "Test", "test@gmail.com", LocalDate.of(2000, Month.JANUARY, 5));
      Student john = new Student(2L, "John", "john@gmail.com", LocalDate.of(2001, Month.APRIL, 10));
      repository.saveAll(List.of(test, john));
    };
  }
}
