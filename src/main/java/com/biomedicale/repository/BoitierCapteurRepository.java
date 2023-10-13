package com.biomedicale.repository;

import com.biomedicale.domain.BoitierCapteur;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the BoitierCapteur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BoitierCapteurRepository extends JpaRepository<BoitierCapteur, Long> {}
