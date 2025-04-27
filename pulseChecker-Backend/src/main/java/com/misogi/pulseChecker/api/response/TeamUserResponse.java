package com.misogi.pulseChecker.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamUserResponse {
    private String firstName;
    private String lastName;
    private String email;
}
