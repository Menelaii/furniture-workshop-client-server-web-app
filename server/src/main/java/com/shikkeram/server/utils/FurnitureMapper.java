package com.shikkeram.server.utils;

import com.shikkeram.server.dto.FurnitureDTO;
import com.shikkeram.server.dto.FurnitureRichDTO;
import com.shikkeram.server.dto.FurnitureUploadDTO;
import com.shikkeram.server.dto.ImageDTO;
import com.shikkeram.server.models.Furniture;
import com.shikkeram.server.models.Image;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class FurnitureMapper {
    private final ModelMapper mapper;

    @Autowired
    public FurnitureMapper(ModelMapper modelMapper) {
        this.mapper = modelMapper;
    }

    public Furniture uploadDTOToEntity(FurnitureUploadDTO uploadDTO) {
        return mapper.map(uploadDTO, Furniture.class);
    }

    public FurnitureRichDTO entityToRichDTO(Furniture furniture) {
        FurnitureRichDTO furnitureRichDTO = mapper.map(furniture, FurnitureRichDTO.class);

        Image thumbnail = furniture.getImages()
                .stream()
                .filter(Image::isThumbnail)
                .findFirst().orElse(null);

        ImageDTO thumbnailDTO = thumbnail != null
                ? mapper.map(thumbnail, ImageDTO.class)
                : null;

        furnitureRichDTO.setThumbnail(thumbnailDTO);

        return furnitureRichDTO;
    }

    public Furniture dtoToEntity(FurnitureDTO furnitureDTO) {
        return mapper.map(furnitureDTO, Furniture.class);
    }
}
