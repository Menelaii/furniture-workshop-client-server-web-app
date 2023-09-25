package com.shikkeram.server.services;

import com.shikkeram.server.exceptions.EntityNotFoundException;
import com.shikkeram.server.models.Furniture;
import com.shikkeram.server.models.Image;
import com.shikkeram.server.repositories.ImagesRepository;
import com.shikkeram.server.utils.PathConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ImageService {
    private final FileStorageService fileStorageService;
    private final ImagesRepository repository;
    private final PathConverter pathConverter;

    @Transactional
    public void delete(int id) {
        Image image = repository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        String path = pathConverter.linkToPath(image.getLink());
        fileStorageService.deleteFile(path);

        repository.deleteById(id);
    }

    @Transactional
    public void addImage(Integer furnitureId, boolean isThumbnail, MultipartFile multipartFile) {
        try {
            String path = fileStorageService.save(multipartFile);
            String link = pathConverter.pathToLink(path);

            if (isThumbnail) {
                repository.unsetThumbnail(furnitureId);
            }

            Furniture furniture = new Furniture();
            furniture.setId(furnitureId);
            repository.save(new Image(link, isThumbnail, furniture));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public void changePreview(Integer furnitureId, Integer newPreviewId) {
        Image image = repository.findById(newPreviewId)
                .orElseThrow(EntityNotFoundException::new);

        if (!Objects.equals(image.getFurniture().getId(), furnitureId))
            throw new IllegalStateException();

        repository.unsetThumbnail(furnitureId);
        image.setThumbnail(true);
    }
}
