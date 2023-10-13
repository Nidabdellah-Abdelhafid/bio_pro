package com.biomedicale.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Capteur.
 */
@Entity
@Table(name = "capteur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Capteur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "type")
    private String type;

    @Column(name = "reference")
    private String reference;

    @Column(name = "resolution")
    private String resolution;

    @Lob
    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "photo_content_type")
    private String photoContentType;

    @Column(name = "valeur_min")
    private Double valeurMin;

    @Column(name = "valeur_max")
    private Double valeurMax;

    @OneToMany(mappedBy = "capteurs")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "boitiers", "capteurs" }, allowSetters = true)
    private Set<BoitierCapteur> boitierCapteurs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Capteur id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return this.type;
    }

    public Capteur type(String type) {
        this.setType(type);
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getReference() {
        return this.reference;
    }

    public Capteur reference(String reference) {
        this.setReference(reference);
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getResolution() {
        return this.resolution;
    }

    public Capteur resolution(String resolution) {
        this.setResolution(resolution);
        return this;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }

    public byte[] getPhoto() {
        return this.photo;
    }

    public Capteur photo(byte[] photo) {
        this.setPhoto(photo);
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return this.photoContentType;
    }

    public Capteur photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public Double getValeurMin() {
        return this.valeurMin;
    }

    public Capteur valeurMin(Double valeurMin) {
        this.setValeurMin(valeurMin);
        return this;
    }

    public void setValeurMin(Double valeurMin) {
        this.valeurMin = valeurMin;
    }

    public Double getValeurMax() {
        return this.valeurMax;
    }

    public Capteur valeurMax(Double valeurMax) {
        this.setValeurMax(valeurMax);
        return this;
    }

    public void setValeurMax(Double valeurMax) {
        this.valeurMax = valeurMax;
    }

    public Set<BoitierCapteur> getBoitierCapteurs() {
        return this.boitierCapteurs;
    }

    public void setBoitierCapteurs(Set<BoitierCapteur> boitierCapteurs) {
        if (this.boitierCapteurs != null) {
            this.boitierCapteurs.forEach(i -> i.setCapteurs(null));
        }
        if (boitierCapteurs != null) {
            boitierCapteurs.forEach(i -> i.setCapteurs(this));
        }
        this.boitierCapteurs = boitierCapteurs;
    }

    public Capteur boitierCapteurs(Set<BoitierCapteur> boitierCapteurs) {
        this.setBoitierCapteurs(boitierCapteurs);
        return this;
    }

    public Capteur addBoitierCapteurs(BoitierCapteur boitierCapteur) {
        this.boitierCapteurs.add(boitierCapteur);
        boitierCapteur.setCapteurs(this);
        return this;
    }

    public Capteur removeBoitierCapteurs(BoitierCapteur boitierCapteur) {
        this.boitierCapteurs.remove(boitierCapteur);
        boitierCapteur.setCapteurs(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Capteur)) {
            return false;
        }
        return id != null && id.equals(((Capteur) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Capteur{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", reference='" + getReference() + "'" +
            ", resolution='" + getResolution() + "'" +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            ", valeurMin=" + getValeurMin() +
            ", valeurMax=" + getValeurMax() +
            "}";
    }
}
