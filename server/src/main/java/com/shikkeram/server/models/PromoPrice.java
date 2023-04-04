package com.shikkeram.server.models;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "Promo_prices")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class PromoPrice extends AbstractEntity {
    private String productCode;
    private Integer price;
}
