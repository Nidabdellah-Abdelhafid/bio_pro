package com.biomedicale.repository;

import com.biomedicale.domain.Boitier;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Boitier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BoitierRepository extends JpaRepository<Boitier, Long> {}
