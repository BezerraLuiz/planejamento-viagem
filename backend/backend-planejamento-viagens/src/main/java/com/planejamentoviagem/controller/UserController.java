package com.planejamentoviagem.controller;

import com.planejamentoviagem.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Permite que o front React acesse a API.
public class UserController {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    @PostMapping("/register")
    public  ResponseEntity<String> registerUser(@RequestBody User user) {
        // Lógica para salvar os dados no banco.
        entityManager.persist(user);

        System.out.println("Email: " + user.getEmail());
        System.out.println("Senha: " + user.getSenha());

        return new ResponseEntity<>("Usuário registrado com sucesso!", HttpStatus.OK);
    }
}