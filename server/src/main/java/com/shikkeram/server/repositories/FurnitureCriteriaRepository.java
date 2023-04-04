package com.shikkeram.server.repositories;

import com.shikkeram.server.models.Furniture;
import com.shikkeram.server.searchCriterias.FurniturePage;
import com.shikkeram.server.searchCriterias.FurnitureSearchCriteria;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Repository
public class FurnitureCriteriaRepository {
    private final EntityManager entityManager;

    public FurnitureCriteriaRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public Page<Furniture> findAllWithFilters(FurniturePage furniturePage,
                                              FurnitureSearchCriteria furnitureSearchCriteria) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Furniture> criteriaQuery = criteriaBuilder.createQuery(Furniture.class);
        Root<Furniture> root = criteriaQuery.from(Furniture.class);
        Predicate predicate = getPredicate(furnitureSearchCriteria, root);
        criteriaQuery.where(predicate);
        setOrder(furniturePage, criteriaQuery, root);

        TypedQuery<Furniture> typedQuery = entityManager.createQuery(criteriaQuery);
        typedQuery.setFirstResult(furniturePage.getPage() * furniturePage.getItemsPerPage());
        typedQuery.setMaxResults(furniturePage.getItemsPerPage());

        Pageable pageable = createPageable(furniturePage);

        long furnitureTotalCount = getFurnitureTotalCountWith(furnitureSearchCriteria);

        return new PageImpl<>(typedQuery.getResultList(), pageable, furnitureTotalCount);
    }

    private long getFurnitureTotalCountWith(FurnitureSearchCriteria furnitureSearchCriteria) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
        Root<Furniture> root = countQuery.from(Furniture.class);
        Predicate predicate = getPredicate(furnitureSearchCriteria, root);


        countQuery.select(criteriaBuilder.count(root)).where(predicate);
        return entityManager.createQuery(countQuery).getSingleResult();
    }

    private void setOrder(FurniturePage furniturePage,
                          CriteriaQuery<Furniture> criteriaQuery, Root<Furniture> root) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        if (furniturePage.getSortDirection().equals(Sort.Direction.DESC)) {
            criteriaQuery.orderBy(criteriaBuilder.desc(root.get(furniturePage.getSortBy())));
        } else {
            criteriaQuery.orderBy(criteriaBuilder.asc(root.get(furniturePage.getSortBy())));
        }
    }

    private Pageable createPageable(FurniturePage furniturePage) {
        Sort sort = Sort.by(furniturePage.getSortDirection(), furniturePage.getSortBy());
        return PageRequest.of(furniturePage.getPage(), furniturePage.getItemsPerPage(), sort);
    }

    public Predicate getPredicate(FurnitureSearchCriteria searchCriteria,
                                  Root<Furniture> root) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

        List<Predicate> predicates = new ArrayList<>();

        if (Objects.nonNull(searchCriteria.getFurnitureTypeId()) && searchCriteria.getFurnitureTypeId() != 0) {
            predicates.add(
                    criteriaBuilder.equal(root.get("furnitureType").get("id"), searchCriteria.getFurnitureTypeId())
            );
        }

        String[] forms = searchCriteria.getForms();
        if (Objects.nonNull(forms) && forms.length > 0) {
            Predicate[] formPredicates = new Predicate[forms.length];
            for (int i = 0; i < forms.length; i++) {
                formPredicates[i] = criteriaBuilder.equal(root.get("form"), forms[i]);
            }

            predicates.add(criteriaBuilder.or(formPredicates));
        }

        if (Objects.nonNull(searchCriteria.getPriceMin())) {
            predicates.add(
               criteriaBuilder.greaterThanOrEqualTo(root.get("price"), searchCriteria.getPriceMin())
            );
        }

        if (Objects.nonNull(searchCriteria.getPriceMax())) {
            predicates.add(
                    criteriaBuilder.lessThanOrEqualTo(root.get("price"), searchCriteria.getPriceMax())
            );
        }

        if (Objects.nonNull(searchCriteria.getLengthMin())) {
            predicates.add(
                    criteriaBuilder.or(
                            criteriaBuilder.greaterThanOrEqualTo(
                                    root.get("length"), searchCriteria.getLengthMin()),
                            criteriaBuilder.equal(root.get("length"), 0)
                    )
            );
        }

        if (Objects.nonNull(searchCriteria.getLengthMax())) {
            predicates.add(
                    criteriaBuilder.or(
                            criteriaBuilder.lessThanOrEqualTo(
                                    root.get("length"), searchCriteria.getLengthMax()),
                            criteriaBuilder.equal(root.get("length"), 0)
                    )
            );
        }

        if (Objects.nonNull(searchCriteria.getWidthMin())) {
            predicates.add(
                    criteriaBuilder.or(
                            criteriaBuilder.greaterThanOrEqualTo(
                                    root.get("width"), searchCriteria.getWidthMin()),
                            criteriaBuilder.equal(root.get("width"), 0)
                    ));
        }

        if (Objects.nonNull(searchCriteria.getWidthMax())) {
            predicates.add(
                    criteriaBuilder.or(
                            criteriaBuilder.lessThanOrEqualTo(
                                    root.get("width"), searchCriteria.getWidthMax()),
                            criteriaBuilder.equal(root.get("width"), 0)
                    ));
        }

        if (Objects.nonNull(searchCriteria.getHeightMin())) {
            predicates.add(
                    criteriaBuilder.greaterThanOrEqualTo(root.get("height"), searchCriteria.getHeightMin())
            );
        }

        if (Objects.nonNull(searchCriteria.getHeightMax())) {
            predicates.add(
                    criteriaBuilder.lessThanOrEqualTo(root.get("height"), searchCriteria.getHeightMax())
            );
        }

        if (Objects.nonNull(searchCriteria.getDiameterMin())) {
            predicates.add(criteriaBuilder.or(
                            criteriaBuilder.greaterThanOrEqualTo(
                                    root.get("diameter"), searchCriteria.getDiameterMin()),
                            criteriaBuilder.equal(root.get("diameter"), 0)
            ));
        }

        if (Objects.nonNull(searchCriteria.getDiameterMax())) {
            predicates.add(criteriaBuilder.or(
                    criteriaBuilder.lessThanOrEqualTo(
                            root.get("diameter"), searchCriteria.getDiameterMax()),
                    criteriaBuilder.equal(root.get("diameter"), 0)
            ));
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}
