package com.planejamentoviagem.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_user;

    @Column(nullable = false, unique = true)
    private  String email;

    @Column(nullable = false)
    private String senha;

    // Getters e Setters
    public Long getId() {
        return id_user;
    }

    public void setId(Long id) {
        this.id_user = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}