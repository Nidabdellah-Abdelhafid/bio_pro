package com.biomedicale.repository;

import com.biomedicale.domain.Capteur;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Capteur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CapteurRepository extends JpaRepository<Capteur, Long> {}
