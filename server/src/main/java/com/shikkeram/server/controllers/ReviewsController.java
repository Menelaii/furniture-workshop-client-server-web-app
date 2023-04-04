package com.shikkeram.server.controllers;

import com.shikkeram.server.dto.ReviewDTO;
import com.shikkeram.server.models.Review;
import com.shikkeram.server.searchCriterias.XPage;
import com.shikkeram.server.services.ReviewsService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reviews")
public class ReviewsController {
    private final ModelMapper modelMapper;
    private final ReviewsService service;

    @GetMapping
    public ResponseEntity<List<ReviewDTO>> find(XPage page) {
        Page<ReviewDTO> result = service.findAll(page)
                .map(this::toDto);
        return ResponseEntity.ok(result.getContent());
    }

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Review review) {
        service.save(review);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable("id") Integer id,
                                         @RequestBody Review review) {
        service.update(id, review);

        return ResponseEntity.ok().build();
    }

    private ReviewDTO toDto(Review review) {
        return modelMapper.map(review, ReviewDTO.class);
    }

    private Review toEntity(ReviewDTO reviewDTO) {
        return modelMapper.map(reviewDTO, Review.class);
    }
}
