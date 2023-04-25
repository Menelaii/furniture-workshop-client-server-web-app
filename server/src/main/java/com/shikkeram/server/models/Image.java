package com.shikkeram.server.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Images")
@Getter
@Setter
@NoArgsConstructor
public class Image extends AbstractEntity {
    @Column(name = "link")
    private String link;
    @Column(name = "is_thumbnail", columnDefinition = "BOOLEAN DEFAULT false")
    private boolean isThumbnail;
    @ManyToOne
    @JoinColumn(name = "furniture_id", referencedColumnName = "id")
    private Furniture furniture;

    public Image(String link, boolean isThumbnail, Furniture furniture) {
        this.link = link;
        this.isThumbnail = isThumbnail;
        this.furniture = furniture;
    }
}
