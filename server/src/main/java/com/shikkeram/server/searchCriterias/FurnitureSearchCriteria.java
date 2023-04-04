package com.shikkeram.server.searchCriterias;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FurnitureSearchCriteria {
    private Double lengthMin;
    private Double lengthMax;
    private Double widthMin;
    private Double widthMax;
    private Double heightMin;
    private Double heightMax;
    private Double diameterMin;
    private Double diameterMax;
    private String[] forms;
    private Integer priceMin;
    private Integer priceMax;
    private Long furnitureTypeId;
}
