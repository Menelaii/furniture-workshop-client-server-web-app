package com.shikkeram.server.services;

import com.shikkeram.server.exceptions.EntityNotFoundException;
import com.shikkeram.server.models.Furniture;
import com.shikkeram.server.models.Image;
import com.shikkeram.server.repositories.FurnitureCriteriaRepository;
import com.shikkeram.server.repositories.FurnitureRepository;
import com.shikkeram.server.repositories.ImagesRepository;
import com.shikkeram.server.searchCriterias.FurniturePage;
import com.shikkeram.server.searchCriterias.FurnitureSearchCriteria;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class FurnitureService {
    private final FurnitureRepository repository;
    private final ImagesRepository imagesRepository;
    private final FurnitureCriteriaRepository criteriaRepository;


    public List<Furniture> findAll() {
        return repository.findAll();
    }

    public Page<Furniture> findWithFilters(FurniturePage page,
                                           FurnitureSearchCriteria furnitureSearchCriteria) {
        return criteriaRepository.findAllWithFilters(page, furnitureSearchCriteria);
    }

    public Furniture findById(int id) {
        return repository
                .findById(id)
                .orElseThrow(EntityNotFoundException::new);
    }

    @Transactional
    public void save(Furniture furniture) {
        List<Image> images = furniture.getImages();
        repository.save(furniture);

        images.forEach(i -> i.setFurniture(furniture));
        imagesRepository.saveAll(images);
    }

    @Transactional
    public void delete(int id) {
        throwNotFoundIfNotExists(id);
        repository.deleteById(id);
    }

    @Transactional
    public void update(int id, Furniture updated) {
        throwNotFoundIfNotExists(id);

        updated.setId(id);
        repository.save(updated);
    }

    private void throwNotFoundIfNotExists(int id) {
        if(repository.existsById(id))
            throw new EntityNotFoundException();
    }
}
