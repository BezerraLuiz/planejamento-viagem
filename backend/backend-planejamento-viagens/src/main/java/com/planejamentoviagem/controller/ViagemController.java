package com.planejamentoviagem.controller;

import com.planejamentoviagem.model.User;
import com.planejamentoviagem.model.Viagem;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/viagens")
@CrossOrigin(origins = "*") // Permite que o front React acesse a API.
public class ViagemController {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    @PostMapping("/iniciar")
    public ResponseEntity<String> iniciarViagem(@RequestBody Viagem viagem) {
        // Lógica para salvar os dados no banco.
        entityManager.persist(viagem);

        System.out.println("Viagem iniciada com sucesso!");
        System.out.println("ID da viagem: " + viagem.getId());

        return new ResponseEntity<>("Viagem iniciada com sucesso!", HttpStatus.OK);
    }
}
