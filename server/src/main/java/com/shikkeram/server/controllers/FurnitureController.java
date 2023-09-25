package com.shikkeram.server.controllers;

import com.shikkeram.server.dto.*;
import com.shikkeram.server.models.Furniture;
import com.shikkeram.server.searchCriterias.FurniturePage;
import com.shikkeram.server.searchCriterias.FurnitureSearchCriteria;
import com.shikkeram.server.services.FurnitureService;
import com.shikkeram.server.services.ImageService;
import com.shikkeram.server.utils.FurnitureMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/furniture")
@RequiredArgsConstructor
public class FurnitureController {
    private final FurnitureService service;
    private final ImageService imageService;
    private final FurnitureMapper furnitureMapper;

    @GetMapping
    public ResponseEntity<FurniturePageDTO> find(FurnitureSearchCriteria searchCriteria, FurniturePage page) {
        Page<FurnitureRichDTO> dtos =
                service.findWithFilters(page, searchCriteria).map(furnitureMapper::entityToRichDTO);

        return ResponseEntity.ok(new FurniturePageDTO(
                dtos.getContent(),
                dtos.getTotalPages()
        ));
    }

    @GetMapping("/{id}")
    public FurnitureRichDTO show(@PathVariable("id") Integer id) {
        return furnitureMapper.entityToRichDTO(service.findById(id));
    }

    @PostMapping(consumes = { "multipart/form-data" })
    public ResponseEntity<Void> create(@RequestPart("preview") MultipartFile preview,
                                       @RequestPart("images") List<MultipartFile> images,
                                       @RequestPart("furniture") FurnitureUploadDTO uploadDTO) {

        Furniture furniture = furnitureMapper.uploadDTOToEntity(uploadDTO);
        service.save(furniture, preview, images);

        return new ResponseEntity<>(null, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable("id") Integer id,
                                       @RequestBody FurnitureDTO furnitureDTO) {
        service.update(id, furnitureMapper.dtoToEntity(furnitureDTO));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/preview")
    public ResponseEntity<Void> updatePreview(@PathVariable("id") Integer id,
                                              @RequestBody UpdatePreviewDTO updatePreviewDTO) {
        imageService.changePreview(id, updatePreviewDTO.getNewPreviewId());
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/{id}/images", consumes = "multipart/form-data")
    public ResponseEntity<Void> addImage(@PathVariable("id") Integer id,
                                         @RequestParam("isThumbnail") boolean isThumbnail,
                                         @RequestPart("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        imageService.addImage(id, isThumbnail, file);
        return ResponseEntity.ok().build();
    }
}
