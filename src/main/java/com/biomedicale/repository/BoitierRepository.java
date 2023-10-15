package com.biomedicale.repository;

import com.biomedicale.domain.Boitier;
import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data JPA repository for the Boitier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BoitierRepository extends JpaRepository<Boitier, Long> {
    @Query("select b from Boitier b where b.id = (select max(id) from Boitier)")
    Optional<Boitier> findMaxId();

}
