package com.notes.controller;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test")
@Slf4j
@Hidden
public class TestController {

    @GetMapping("/auth")
    public ResponseEntity<Map<String, Object>> testAuth(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            Authentication authentication) {
        
        Map<String, Object> response = new HashMap<>();
        
        // Vérifier l'en-tête Authorization
        response.put("authHeaderPresent", authHeader != null);
        response.put("authHeaderValue", authHeader != null ? authHeader.substring(0, Math.min(30, authHeader.length())) + "..." : null);
        
        // Vérifier l'authentification Spring Security
        Authentication securityAuth = SecurityContextHolder.getContext().getAuthentication();
        response.put("authenticated", securityAuth != null && securityAuth.isAuthenticated());
        response.put("authType", securityAuth != null ? securityAuth.getClass().getSimpleName() : null);
        response.put("principal", securityAuth != null ? securityAuth.getPrincipal() : null);
        response.put("authorities", securityAuth != null ? securityAuth.getAuthorities() : null);
        
        log.info("Test auth - Header present: {}, Authenticated: {}", 
                authHeader != null, 
                securityAuth != null && securityAuth.isAuthenticated());
        
        return ResponseEntity.ok(response);
    }
}

