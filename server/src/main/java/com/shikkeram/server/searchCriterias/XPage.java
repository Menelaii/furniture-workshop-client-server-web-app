package com.shikkeram.server.searchCriterias;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class XPage {
    private Integer page = 0;
    private Integer itemsPerPage = 6;
}
