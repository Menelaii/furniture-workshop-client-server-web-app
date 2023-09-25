package com.shikkeram.server.controllers;

import com.shikkeram.server.services.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {
    private final ImageService imageService;

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeImage(@PathVariable("id") Integer id) {
        imageService.delete(id);
        return ResponseEntity.ok().build();
    }
}
