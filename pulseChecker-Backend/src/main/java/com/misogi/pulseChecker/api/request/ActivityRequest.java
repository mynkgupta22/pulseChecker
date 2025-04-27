package com.misogi.pulseChecker.api.request;

import com.misogi.pulseChecker.model.Activity.ActivityType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityRequest {
    
    @NotNull(message = "Activity type is required")
    private ActivityType type;
    
    @NotBlank(message = "Description is required")
    private String description;
    
    @NotNull(message = "Team ID is required")
    private Long teamId;
    
}
