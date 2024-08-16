package com.planejamentoviagem.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "viagens")
public class Viagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_viagem")
    private Long idViagem;

    @Column(nullable = false)
    private Long idUser; // Alterado para Long, supondo que o ID do usuário seja numérico.

    @Column(nullable = false)
    private String localViagem;

    @Column(nullable = false)
    private String localHospedagem;

    @Column(nullable = false)
    private LocalDate dataInicio;  // Mantido como LocalDate

    @Column(nullable = false)
    private LocalDate dataFim;  // Mantido como LocalDate

    @Column(nullable = false)
    private BigDecimal valorPassagem;  // Mantido como BigDecimal

    @Column(nullable = false)
    private BigDecimal valorHospedagem;  // Mantido como BigDecimal

    @Column(nullable = false)
    private BigDecimal valorConsumo;  // Mantido como BigDecimal

    @Column(nullable = false)
    private BigDecimal valorTotal;  // Mantido como BigDecimal

    // Getters e Setters.

    public Long getIdViagem() {
        return idViagem;
    }

    public void setIdViagem(Long idViagem) {
        this.idViagem = idViagem;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
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

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return dataFim;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public BigDecimal getValorPassagem() {
        return valorPassagem;
    }

    public void setValorPassagem(BigDecimal valorPassagem) {
        this.valorPassagem = valorPassagem;
    }

    public BigDecimal getValorHospedagem() {
        return valorHospedagem;
    }

    public void setValorHospedagem(BigDecimal valorHospedagem) {
        this.valorHospedagem = valorHospedagem;
    }

    public BigDecimal getValorConsumo() {
        return valorConsumo;
    }

    public void setValorConsumo(BigDecimal valorConsumo) {
        this.valorConsumo = valorConsumo;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }
}
