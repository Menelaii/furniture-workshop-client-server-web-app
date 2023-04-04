package com.shikkeram.server.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FurnitureRichDTO {
    private String title;
    private String description;
    private String form;
    private double price;
    private int priority;
    private Double length;
    private Double width;
    private Double height;
    private Double diameter;
    private FurnitureTypeShortDTO furnitureType;
    private List<ImageDTO> images;
}
