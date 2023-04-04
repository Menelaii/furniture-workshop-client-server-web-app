package com.shikkeram.server.controllers;

import com.shikkeram.server.dto.PromoPriceDTO;
import com.shikkeram.server.models.PromoPrice;
import com.shikkeram.server.services.PromoPricesService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/promo-prices")
@RequiredArgsConstructor
public class PromoPricesController {
    private final PromoPricesService service;
    private final ModelMapper modelMapper;

    @GetMapping
    public List<PromoPriceDTO> getAll() {
        return service.getAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody PromoPriceDTO promoPriceDTO) {
        service.save(toEntity(promoPriceDTO));
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable("id") Integer id,
                                         @RequestBody PromoPriceDTO promoPriceDTO) {
        service.update(id, toEntity(promoPriceDTO));
        return ResponseEntity.ok().build();
    }

    private PromoPriceDTO toDto(PromoPrice promoPrice) {
        return modelMapper.map(promoPrice, PromoPriceDTO.class);
    }

    private PromoPrice toEntity(PromoPriceDTO promoPriceDTO) {
        return modelMapper.map(promoPriceDTO, PromoPrice.class);
    }
}
