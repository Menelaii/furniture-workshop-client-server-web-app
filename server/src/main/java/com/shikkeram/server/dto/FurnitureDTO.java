package com.shikkeram.server.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FurnitureDTO {
    private Integer id;
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
}
