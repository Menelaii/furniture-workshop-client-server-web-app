package com.shikkeram.server.controllers;

import com.shikkeram.server.dto.FurniturePageDTO;
import com.shikkeram.server.dto.FurnitureRichDTO;
import com.shikkeram.server.dto.FurnitureUploadDTO;
import com.shikkeram.server.models.Furniture;
import com.shikkeram.server.searchCriterias.FurniturePage;
import com.shikkeram.server.searchCriterias.FurnitureSearchCriteria;
import com.shikkeram.server.services.FurnitureService;
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
    public ResponseEntity<Void> create(@RequestPart("images") List<MultipartFile> files,
                                       @RequestPart("furniture") FurnitureUploadDTO uploadDTO) {

        System.out.println("enter");
        System.out.println("size "+ files.size());
        System.out.println("dto "+ uploadDTO.getTitle());

        Furniture furniture = furnitureMapper.uploadDTOToEntity(uploadDTO);
        service.save(furniture, files);

        return new ResponseEntity<>(null, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

//    @PatchMapping("/{id}")
//    public ResponseEntity<Void> update(@PathVariable("id") Integer id,
//                                             @RequestBody FurnitureRichDTO furnitureRichDTO) {
//
//        service.update(id, furnitureMapper.richDTOToEntity(furnitureRichDTO));
//
//        return ResponseEntity.ok().build();
//    }
}
