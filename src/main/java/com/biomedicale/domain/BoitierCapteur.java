package com.biomedicale.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A BoitierCapteur.
 */
@Entity
@Table(name = "boitier_capteur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BoitierCapteur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "branche")
    private String branche;

    @Column(name = "etat")
    private Boolean etat;

    @ManyToOne
    @JsonIgnoreProperties(value = { "boitierCapteurs", "boitierPatients" }, allowSetters = true)
    private Boitier boitiers;

    @ManyToOne
    @JsonIgnoreProperties(value = { "boitierCapteurs" }, allowSetters = true)
    private Capteur capteurs;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public BoitierCapteur id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBranche() {
        return this.branche;
    }

    public BoitierCapteur branche(String branche) {
        this.setBranche(branche);
        return this;
    }

    public void setBranche(String branche) {
        this.branche = branche;
    }

    public Boolean getEtat() {
        return this.etat;
    }

    public BoitierCapteur etat(Boolean etat) {
        this.setEtat(etat);
        return this;
    }

    public void setEtat(Boolean etat) {
        this.etat = etat;
    }

    public Boitier getBoitiers() {
        return this.boitiers;
    }

    public void setBoitiers(Boitier boitier) {
        this.boitiers = boitier;
    }

    public BoitierCapteur boitiers(Boitier boitier) {
        this.setBoitiers(boitier);
        return this;
    }

    public Capteur getCapteurs() {
        return this.capteurs;
    }

    public void setCapteurs(Capteur capteur) {
        this.capteurs = capteur;
    }

    public BoitierCapteur capteurs(Capteur capteur) {
        this.setCapteurs(capteur);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BoitierCapteur)) {
            return false;
        }
        return id != null && id.equals(((BoitierCapteur) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BoitierCapteur{" +
            "id=" + getId() +
            ", branche='" + getBranche() + "'" +
            ", etat='" + getEtat() + "'" +
            "}";
    }
}
