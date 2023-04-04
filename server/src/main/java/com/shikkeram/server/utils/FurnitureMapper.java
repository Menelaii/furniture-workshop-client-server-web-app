package com.shikkeram.server.utils;

import com.shikkeram.server.dto.FurnitureRichDTO;
import com.shikkeram.server.models.Furniture;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FurnitureMapper {
    private final ModelMapper mapper;

    @Autowired
    public FurnitureMapper(ModelMapper modelMapper) {
        this.mapper = modelMapper;
    }

    public Furniture richDTOToEntity(FurnitureRichDTO furnitureRichDTO) {
        Furniture furniture = mapper.map(furnitureRichDTO, Furniture.class);
        return furniture;
    }

    public FurnitureRichDTO entityToRichDTO(Furniture furniture) {
        FurnitureRichDTO furnitureRichDTO = mapper.map(furniture, FurnitureRichDTO.class);
        return furnitureRichDTO;
    }
}
