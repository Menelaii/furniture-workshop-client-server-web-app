package com.shikkeram.server.repositories;

import com.shikkeram.server.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImagesRepository extends JpaRepository<Image, Integer> {
}
