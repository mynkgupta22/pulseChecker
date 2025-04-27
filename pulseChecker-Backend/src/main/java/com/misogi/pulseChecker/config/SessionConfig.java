package com.misogi.pulseChecker.config;

import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SessionConfig {

    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory> disableTomcatSession() {
        return factory -> factory.addContextCustomizers(context -> {
            context.setSessionTimeout(0);  // Disable session timeout
            context.setUseHttpOnly(true);  // Extra security
            context.setCookies(false);     // <-- Prevent Set-Cookie: JSESSIONID
        });
    }
}
