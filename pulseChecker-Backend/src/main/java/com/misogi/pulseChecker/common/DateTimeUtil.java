package com.misogi.pulseChecker.common;

import java.sql.Timestamp;
import java.time.*;
import java.time.format.DateTimeFormatter;

public class DateTimeUtil {

    private static ZoneId zoneId = ZoneId.of("Asia/Kolkata");
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd-MM-yyyy").withZone(zoneId);
    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("hh:mm:ss a").withZone(zoneId);
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm:ss a").withZone(zoneId);

    public static String getDateString(LocalDate date) {
        if (date == null) return null;
        return date.format(DATE_FORMATTER);
    }

    public static LocalDate getLocalDate(String date) {
        if (date == null || date.isBlank()) return null;
        return LocalDate.parse(date, DATE_FORMATTER);
    }

    public static LocalTime getLocalTime(String time) {
        if (time == null || time.isBlank()) return null;
        return LocalTime.parse(time, TIME_FORMATTER);
    }

    public static LocalDateTime getLocalDateTime(String dateTime) {
        if (dateTime == null || dateTime.isBlank()) return null;
        return LocalDateTime.parse(dateTime, DATE_TIME_FORMATTER);
    }

    public static String getDateTimeString(LocalDateTime dateTime) {
        if (dateTime == null) return null;
        return dateTime.format(DATE_TIME_FORMATTER);
    }

    public static Timestamp getCurrentTimestamp() {
        return Timestamp.from(Instant.now());
    }

    public static LocalDate getCurrentLocalDate() {
        return LocalDate.now(zoneId);
    }

    public static LocalTime getCurrentLocalTime() {
        return LocalTime.now(zoneId);
    }

    public static LocalDateTime getCurrentLocalDateTime() {
        return LocalDateTime.now(zoneId);
    }
}
