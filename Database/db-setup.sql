CREATE DATABASE Bookings;
USE Bookings;

CREATE TABLE Bookings (
 booking_id INT NOT NULL AUTO_INCREMENT,
 server_id VARCHAR(255) NOT NULL,
 user_id VARCHAR(255) NOT NULL,
 date_booked VARCHAR(255) NOT NULL,
 time_booked VARCHAR(255) NOT NULL,
 created date DEFAULT GETDATE()
 PRIMARY KEY (booking_id));