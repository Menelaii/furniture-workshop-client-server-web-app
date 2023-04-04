package com.shikkeram.server.searchCriterias;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Sort;

@Getter
@Setter
public class FurniturePage extends XPage {
    private Sort.Direction sortDirection = Sort.Direction.DESC;
    private String sortBy = "priority";
}
