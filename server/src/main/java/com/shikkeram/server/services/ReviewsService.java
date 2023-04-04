package com.shikkeram.server.services;

import com.shikkeram.server.models.Review;
import com.shikkeram.server.repositories.ReviewsRepository;
import com.shikkeram.server.searchCriterias.XPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ReviewsService {

    private final ReviewsRepository repository;

    @Autowired
    public ReviewsService(ReviewsRepository repository) {
        this.repository = repository;
    }

    public Page<Review> findAll(XPage page) {
        Pageable pageable = PageRequest.of(page.getPage(), page.getItemsPerPage());
        return repository.findAll(pageable);
    }

    @Transactional
    public void save(Review review) {
        repository.save(review);
    }

    @Transactional
    public void delete(int id) {
        repository.deleteById(id);
    }

    @Transactional
    public void update(int id, Review updated) {
        updated.setId(id);
        repository.save(updated);
    }
}
