package com.shikkeram.server.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "Furniture")
@Getter
@Setter
@NoArgsConstructor
public class Furniture extends AbstractEntity {
    private String title;
    @Column(length = 800)
    private String description;
    private Double length;
    private Double width;
    private Double height;
    private Double diameter;
    private String form;
    private Integer price;
    private Integer priority;
    @ManyToOne
    @JoinColumn(name = "furniture_type_id", referencedColumnName = "id")
    private FurnitureType furnitureType;
    @OneToMany(mappedBy = "furniture")
    private List<Image> images;
}
