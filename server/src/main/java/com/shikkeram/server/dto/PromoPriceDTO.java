package com.shikkeram.server.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PromoPriceDTO {
    private Integer id;
    private String productCode;
    private Integer price;
}
