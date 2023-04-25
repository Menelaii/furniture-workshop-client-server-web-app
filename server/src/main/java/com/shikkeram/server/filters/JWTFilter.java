package com.shikkeram.server.filters;


import com.auth0.jwt.exceptions.JWTVerificationException;
import com.shikkeram.server.security.JWTUtil;
import com.shikkeram.server.services.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {
    private final JWTUtil jwtUtil;
    private final UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws IOException, ServletException {
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null) {
            String token = authHeader.substring(7);
            Optional<String> username = jwtUtil.validateTokenAndRetrieveClaim(token);

            if (username.isEmpty()) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "INVALID_TOKEN");
            } else {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username.get());

                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(),
                                userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);

                filterChain.doFilter(request, response);
            }
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "TOKEN_NOT_FOUND");
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return request.getMethod().equals("GET")
                || request.getRequestURI().startsWith("/api/auth/");
    }
}
