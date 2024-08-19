package com.planejamentoviagem.controller;

import com.planejamentoviagem.model.User;
import com.planejamentoviagem.model.Viagem;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
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

    @Transactional
    @DeleteMapping("/delete-viagem/{viagemId}")
    public ResponseEntity<String> deleteViagem(@PathVariable Long viagemId) {
        // Ajuste a query para refletir a estrutura correta da tabela
        String sqlBuscaViagens = "delete from Viagem v where v.id = :id";
        Query query = entityManager.createQuery(sqlBuscaViagens);
        query.setParameter("id", viagemId);

        int rowsAffected = query.executeUpdate();

        // Verifica se a operação foi bem-sucedida
        if (rowsAffected > 0) {
            return new ResponseEntity<>("Viagem deletada com sucesso", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Viagem não encontrada", HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    @GetMapping("/get-viagem/{viagemId}")
    public ResponseEntity<Viagem> detalheViagem(@PathVariable Long viagemId) {
        // Ajuste a query para refletir a estrutura correta da tabela
        String sqlBuscaViagem = "select v from Viagem v where v.idViagem = :id";
        TypedQuery<Viagem> query = entityManager.createQuery(sqlBuscaViagem, Viagem.class);
        query.setParameter("id", viagemId);

        List<Viagem> viagens = query.getResultList();

        // Verifica se a lista está vazia e retorna a resposta adequada
        if (viagens.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Status 404 se a viagem não for encontrada
        }

        // Considerando que o ID é único, retornamos o primeiro item da lista
        return new ResponseEntity<>(viagens.get(0), HttpStatus.OK); // Status 200 e o objeto da viagem
    }

}
