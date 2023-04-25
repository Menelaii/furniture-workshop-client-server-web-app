package com.shikkeram.server.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Optional;

@Component
public class JWTUtil {
    @Value("${secret}")
    private String secret;

    public String generateToken(String username, int expiresIn) {
        Date expirationDate = Date.from(ZonedDateTime.now().plusSeconds(expiresIn).toInstant());
        return JWT.create()
                .withSubject("user details")
                .withClaim("username", username)
                .withIssuedAt(new Date())
                .withIssuer("shik-keram")
                .withExpiresAt(expirationDate)
                .sign(Algorithm.HMAC256(secret));
    }

    public Optional<String> validateTokenAndRetrieveClaim(String token) {
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secret))
                    .withSubject("user details")
                    .withIssuer("shik-keram")
                    .build();

            DecodedJWT decodedJWT = verifier.verify(token);

            return Optional.of(decodedJWT.getClaim("username").asString());
        } catch (JWTVerificationException e) {
            return Optional.empty();
        }
    }
}
