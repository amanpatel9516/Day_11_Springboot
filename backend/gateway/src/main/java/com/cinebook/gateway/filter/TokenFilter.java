package com.cinebook.gateway.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;

@Component
public class TokenFilter extends AbstractGatewayFilterFactory<TokenFilter.Config> {

    @Value("${jwt.secret}")
    private String secretKey;

    public TokenFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String path = exchange.getRequest().getPath().toString();
            if (path.equals("/user/login") || path.equals("/user/register") || path.equals("/users/login")
                    || path.equals("/users/register")) {

                return chain.filter(exchange.mutate().request(r -> r.header("X-Secret-Key", "SECRET")).build());
            }

            org.springframework.http.HttpHeaders header = exchange.getRequest().getHeaders();

            if (!header.containsKey(org.springframework.http.HttpHeaders.AUTHORIZATION)) {
                throw new RuntimeException("Authentication header is missing");
            }
            String authHeader = header.getFirst(org.springframework.http.HttpHeaders.AUTHORIZATION);
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                    throw new RuntimeException("Authorization header is invalid");
            }

            try {
                String token = authHeader.substring(7);

                SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());

                Claims claims = Jwts.parser()
                        .verifyWith(key)
                        .build()
                        .parseSignedClaims(token)
                        .getPayload();

                String userId = String.valueOf(claims.get("id"));
                exchange = exchange.mutate()
                        .request(r -> r.header("X-User-Id", userId).header("X-Secret-Key", "SECRET")).build();
            } catch (Exception e) {
                throw new RuntimeException("Token is invalid");
            }
            return chain.filter(exchange);
        };
    }

    public static class Config {

    }
}
