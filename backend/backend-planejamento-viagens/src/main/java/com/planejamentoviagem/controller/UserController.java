package com.planejamentoviagem.controller;

import com.planejamentoviagem.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Permite que o front React acesse a API
public class UserController {

    @PostMapping("/register")
    public  ResponseEntity<String> registerUser(@RequestBody User user) {
        // Adicionar lógica para salvar o dado em um banco de dados.



        System.out.println("Email: " + user.getEmail());
        System.out.println("Senha: " + user.getSenha());

        return new ResponseEntity<>("Usuário registrado com sucesso!", HttpStatus.OK);
    }
}