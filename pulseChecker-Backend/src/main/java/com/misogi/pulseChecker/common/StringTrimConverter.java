package com.misogi.pulseChecker.common;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class StringTrimConverter implements AttributeConverter<String, String> {
    @Override
    public String convertToDatabaseColumn(String attribute) {
        return attribute;
    }

    @Override
    public String convertToEntityAttribute(String dbData) {

        if (dbData != null)
            return dbData.trim();
        else
            return dbData;
    }

}
