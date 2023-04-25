package com.shikkeram.server.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FurnitureRichDTO extends FurnitureDTO {
    private List<ImageDTO> images;
}
