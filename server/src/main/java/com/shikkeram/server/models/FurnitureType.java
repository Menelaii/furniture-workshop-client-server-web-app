package com.shikkeram.server.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "Furniture_Types")
@Getter
@Setter
@NoArgsConstructor
public class FurnitureType extends AbstractEntity {
    private String name;
    @OneToMany(mappedBy = "furnitureType", cascade = CascadeType.PERSIST)
    private List<Furniture> furniture;
}
