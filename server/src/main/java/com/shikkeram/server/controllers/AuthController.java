package com.shikkeram.server.controllers;

import com.shikkeram.server.dto.AuthDTO;
import com.shikkeram.server.dto.AuthResponseDTO;
import com.shikkeram.server.models.User;
import com.shikkeram.server.security.JWTUtil;
import com.shikkeram.server.services.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final RegistrationService registrationService;
    private final JWTUtil jwtUtil;
    private final ModelMapper modelMapper;
    private final AuthenticationManager authenticationManager;

    @Value("${tokenExpiresIn}")
    private int tokenExpiresIn;

    @PostMapping("/sign-up")
    public ResponseEntity<Void> performRegistration(@RequestBody AuthDTO authDTO) {
        registrationService.register(toEntity(authDTO));
        return new ResponseEntity<>(null, HttpStatus.CREATED);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<AuthResponseDTO> performLogin(@RequestBody AuthDTO authDTO) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(authDTO.getUsername(), authDTO.getPassword());

        try {
            authenticationManager.authenticate(authenticationToken);
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        String token = jwtUtil.generateToken(authDTO.getUsername(), tokenExpiresIn);

        return new ResponseEntity<>(new AuthResponseDTO(token, tokenExpiresIn), HttpStatus.OK);
    }

    private User toEntity(AuthDTO dto) {
        return modelMapper.map(dto, User.class);
    }
}
