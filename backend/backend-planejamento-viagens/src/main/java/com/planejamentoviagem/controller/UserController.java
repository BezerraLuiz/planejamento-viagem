package com.planejamentoviagem.controller;

import com.planejamentoviagem.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

    @Transactional
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User loginRequest) {
        // Buscar o usu[ario no banco através do e-mail.
        String sqlBuscaUser = "select u from User u where u.email = :email";
        TypedQuery<User> query = entityManager.createQuery(sqlBuscaUser, User.class);
        query.setParameter("email", loginRequest.getEmail());

        List<User> users = query.getResultList();

        if (users.isEmpty()) {
            // Se o usuário não for encontrado, retornar erro.
            return new ResponseEntity<>("Usuário Não Encontrado!", HttpStatus.NOT_FOUND);
        }

        User user = users.get(0);

        if (!user.getSenha().equals(loginRequest.getSenha())) {
            // Se a senha não corresponde, retorna erro.
            return  new ResponseEntity<>("Senha Incorreta!", HttpStatus.UNAUTHORIZED);
        }

        // Se o login for bem-sucedido.
        return new ResponseEntity<>("Login realizado com sucesso!", HttpStatus.OK);
    }
}