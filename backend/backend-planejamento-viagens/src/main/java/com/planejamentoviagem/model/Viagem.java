package com.planejamentoviagem.model;

import jakarta.persistence.*;

@Entity
@Table(name = "viagens")
public class Viagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String idUser;

    @Column(nullable = false)
    private String localViagem;

    @Column(nullable = false)
    private String localHospedagem;

    @Column(nullable = false)
    private String dataInicio;

    @Column(nullable = false)
    private String dataFim;

    @Column(nullable = false)
    private String valorPassagem;

    @Column(nullable = false)
    private String valorHospedagem;

    @Column(nullable = false)
    private String valorConsumo;

    @Column(nullable = false)
    private String valorTotal;

    // Getters e Setters.
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdUser() {
        return idUser;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }

    public String getLocalViagem() {
        return localViagem;
    }

    public void setLocalViagem(String localViagem) {
        this.localViagem = localViagem;
    }

    public String getLocalHospedagem() {
        return localHospedagem;
    }

    public void setLocalHospedagem(String localHospedagem) {
        this.localHospedagem = localHospedagem;
    }

    public String getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(String dataInicio) {
        this.dataInicio = dataInicio;
    }

    public String getDataFim() {
        return dataFim;
    }

    public void setDataFim(String dataFim) {
        this.dataFim = dataFim;
    }

    public String getValorPassagem() {
        return valorPassagem;
    }

    public void setValorPassagem(String valorPassagem) {
        this.valorPassagem = valorPassagem;
    }

    public String getValorHospedagem() {
        return valorHospedagem;
    }

    public void setValorHospedagem(String valorHospedagem) {
        this.valorHospedagem = valorHospedagem;
    }

    public String getValorConsumo() {
        return valorConsumo;
    }

    public void setValorConsumo(String valorConsumo) {
        this.valorConsumo = valorConsumo;
    }

    public String getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(String valorTotal) {
        this.valorTotal = valorTotal;
    }
}
