package com.shikkeram.server.repositories;

import com.shikkeram.server.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImagesRepository extends JpaRepository<Image, Integer> {

    @Modifying
    @Query(nativeQuery = true, value = "Update images SET is_thumbnail=false " +
            "WHERE furniture_id=?1 AND is_thumbnail=true")
    void unsetThumbnail(Integer furnitureId);
}
