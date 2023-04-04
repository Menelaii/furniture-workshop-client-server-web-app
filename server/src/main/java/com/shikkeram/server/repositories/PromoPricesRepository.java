package com.shikkeram.server.repositories;

import com.shikkeram.server.models.PromoPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromoPricesRepository extends JpaRepository<PromoPrice, Integer> {
}
