package com.shikkeram.server.services;

import com.shikkeram.server.exceptions.EntityNotFoundException;
import com.shikkeram.server.models.Furniture;
import com.shikkeram.server.models.Image;
import com.shikkeram.server.repositories.FurnitureCriteriaRepository;
import com.shikkeram.server.repositories.FurnitureRepository;
import com.shikkeram.server.searchCriterias.FurniturePage;
import com.shikkeram.server.searchCriterias.FurnitureSearchCriteria;
import com.shikkeram.server.utils.Paths;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class FurnitureService {
    private final FurnitureRepository repository;
    private final FurnitureCriteriaRepository criteriaRepository;
    private final FileService fileService;

    @Value("${serverDomain}")
    private String serverDomain;

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
    public void save(Furniture furniture, List<MultipartFile> files) {
        String[] imagePaths;
        try {
            imagePaths = fileService.save(files);
        } catch (IOException e) {
            throw new IllegalStateException();
        }

        List<Image> images = new ArrayList<>(imagePaths.length);
        for (int i = 0; i < imagePaths.length; i++) {
            images.add(new Image(pathToLink(imagePaths[i]),i == 0, furniture));
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
                    .map(path -> linkToPath(path.getLink()))
                    .toList();

            fileService.deleteFiles(paths);

            furniture.get().removeImagesIfExists();
            repository.deleteById(id);
        } else {
            throw new EntityNotFoundException();
        }
    }

//    @Transactional
//    public void update(int id, Furniture updated) {
//        throwNotFoundIfNotExists(id);
//
//        updated.setId(id);
//        repository.save(updated);
//    }

    private String pathToLink(String path) {
        return serverDomain +
                "/images/" +
                Path.of(path).getFileName();
    }

    private String linkToPath(String link) {
        return Paths.UPLOAD_DIRECTORY +
                link.substring(29);
    }
}
