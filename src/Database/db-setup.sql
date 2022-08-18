CREATE TABLE bookings (
 booking_id INT NOT NULL AUTO_INCREMENT,
 server_id VARCHAR(255) NOT NULL,
 user_id VARCHAR(255) NOT NULL,
 date_booked VARCHAR(255) NOT NULL,
 time_booked VARCHAR(255) NOT NULL,
 created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (booking_id),
 CONSTRAINT uc_user_date_time UNIQUE (user_id, date_booked, time_booked));
