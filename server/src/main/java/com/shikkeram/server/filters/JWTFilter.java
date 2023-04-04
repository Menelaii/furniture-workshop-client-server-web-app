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

@Component
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {
    private final JWTUtil jwtUtil;
    private final UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws IOException, ServletException {
        System.out.println("filter enter");
        System.out.println(request.getMethod());
        System.out.println(request.getRequestURI());
        System.out.println(request.getHeader("Authorization"));

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "INVALID_TOKEN");
        } else {
            String token = authHeader.substring(7);
            String username = jwtUtil.validateTokenAndRetrieveClaim(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(),
                            userDetails.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            filterChain.doFilter(request, response);
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return request.getMethod().equals("GET")
                || request.getRequestURI().startsWith("/api/auth/");
    }
}
