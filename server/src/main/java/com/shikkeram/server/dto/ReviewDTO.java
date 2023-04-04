package com.shikkeram.server.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewDTO {
    private Integer id;
    private String reviewer;
    private String text;
    private Integer stars;
}
