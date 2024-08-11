package com.planejamentoviagem.model;

public class User {
    private String email;
    private String senha;

    // Construtores.
    public User(String email, String senha) {
        this.email = email;
        this.senha = senha;
    }

    // Getters e Setters.
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
        this.email = senha;
    }
}