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
        System.out.println("ID da viagem: " + viagem.getIdViagem());

        return new ResponseEntity<>("Viagem iniciada com sucesso!", HttpStatus.OK);
    }

    @Transactional
    @GetMapping("/get-viagens")
    public ResponseEntity<List<Viagem>> dadosViagens(@RequestHeader("User-Id") Long userId) {
        // Ajuste a query para refletir a estrutura correta da tabela
        String sqlBuscaViagens = "select v from Viagem v where v.idUser = :id";
        TypedQuery<Viagem> query = entityManager.createQuery(sqlBuscaViagens, Viagem.class);
        query.setParameter("id", userId);

        List<Viagem> viagens = query.getResultList();

        // Verifica se a lista está vazia e retorna a resposta adequada
        if (viagens.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Status 204 se não houver viagens
        }

        return new ResponseEntity<>(viagens, HttpStatus.OK); // Status 200 se houver viagens
    }
}
