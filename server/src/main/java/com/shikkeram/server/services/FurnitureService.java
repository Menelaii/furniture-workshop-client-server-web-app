package com.shikkeram.server.services;

import com.shikkeram.server.exceptions.EntityNotFoundException;
import com.shikkeram.server.models.Furniture;
import com.shikkeram.server.models.Image;
import com.shikkeram.server.repositories.FurnitureCriteriaRepository;
import com.shikkeram.server.repositories.FurnitureRepository;
import com.shikkeram.server.searchCriterias.FurniturePage;
import com.shikkeram.server.searchCriterias.FurnitureSearchCriteria;
import com.shikkeram.server.utils.PathConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class FurnitureService {
    private final FurnitureRepository repository;
    private final FurnitureCriteriaRepository criteriaRepository;
    private final FileStorageService fileStorageService;
    private final PathConverter pathConverter;

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
    public void save(Furniture furniture, MultipartFile preview, List<MultipartFile> files) {
        String previewPath;
        String[] imagePaths;

        try {
            previewPath = fileStorageService.save(preview);
            imagePaths = fileStorageService.save(files);
        } catch (IOException e) {
            throw new IllegalStateException();
        }

        List<Image> images = new ArrayList<>(imagePaths.length);
        images.add(new Image(pathConverter.pathToLink(previewPath), true, furniture));
        for (int i = 0; i < imagePaths.length; i++) {
            images.add(new Image(pathConverter.pathToLink(imagePaths[i]),false, furniture));
        }

        furniture.setImages(images);

        repository.save(furniture);
    }

    @Transactional
    public void delete(int id) {
        Optional<Furniture> furniture = repository.findById(id);
        if (furniture.isPresent()) {
            List<String> paths = furniture.get().getImages()
                    .stream()
                    .map(path -> pathConverter.linkToPath(path.getLink()))
                    .toList();

            fileStorageService.deleteFiles(paths);

            furniture.get().removeImagesIfExists();
            repository.deleteById(id);
        } else {
            throw new EntityNotFoundException();
        }
    }

    @Transactional
    public void update(Integer id, Furniture updatedEntity) {
        Furniture entity = repository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        updatedEntity.setId(entity.getId());
        updatedEntity.setImages(entity.getImages());

        repository.save(updatedEntity);
    }
}
