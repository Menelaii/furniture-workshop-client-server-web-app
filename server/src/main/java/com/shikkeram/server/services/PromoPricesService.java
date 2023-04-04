package com.shikkeram.server.services;

import com.shikkeram.server.models.PromoPrice;
import com.shikkeram.server.repositories.PromoPricesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class PromoPricesService {
    private final PromoPricesRepository repository;

    @Autowired
    public PromoPricesService(PromoPricesRepository repository) {
        this.repository = repository;
    }

    public List<PromoPrice> getAll() {
        return repository.findAll();
    }

    @Transactional
    public void save(PromoPrice promoPrice) {
        repository.save(promoPrice);
    }

    @Transactional
    public void update(int id, PromoPrice updated) {
        updated.setId(id);
        repository.save(updated);
    }
}
