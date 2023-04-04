package com.shikkeram.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class FurniturePageDTO {
    private List<FurnitureRichDTO> furniture;
    private Integer totalPages;
}
