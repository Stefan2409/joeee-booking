CREATE TABLE `wp_users` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `user_email` varchar(255),
  `user_registered` datetime
);

CREATE TABLE `wp_usermeta` (
  `user_id` int,
  `first_name` varchar(255),
  `last_name` varchar(255)
);

CREATE TABLE `joeee_person` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `first_name` varchar(255),
  `last_name` varchar(255),
  `gender` boolean,
  `address_id` int,
  `birth` date,
  `nationality_id` int
);

CREATE TABLE `joeee_address` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `street` varchar(255),
  `zip` varchar(255),
  `city` varchar(255),
  `state_id` int
);

CREATE TABLE `joeee_fellow_traveler` (
  `reservation_id` int,
  `person_id` int,
  PRIMARY KEY ('person_id', 'reservation_id')
);

CREATE TABLE `joeee_country` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `lang` varchar(5),
  `lang_name` varchar(50),
  `country_alpha2_code` char(2),
  `country_alpha3_code` char(3),
  `country_numeric_code` char(3),
  `country_name` varchar(200)
);

CREATE TABLE `joeee_room` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `number` varchar(255),
  `floor` int
);

CREATE TABLE `joeee_reservation` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `person_id` int
);

CREATE TABLE `joeee_rooms_booked` (
  `room_id` int,
  `reservation_id` int,
  `from` date,
  `to` date,
  PRIMARY KEY ('room_id', 'reservation_id')
);

ALTER TABLE `wp_usermeta` ADD FOREIGN KEY (`user_id`) REFERENCES `wp_users` (`user_id`);

ALTER TABLE `joeee_person` ADD FOREIGN KEY (`user_id`) REFERENCES `wp_usermeta` (`user_id`);

ALTER TABLE `joeee_person` ADD FOREIGN KEY (`address_id`) REFERENCES `joeee_address` (`id`);

ALTER TABLE `joeee_person` ADD FOREIGN KEY (`nationality_id`) REFERENCES `joeee_country` (`id`);

ALTER TABLE `joeee_address` ADD FOREIGN KEY (`state_id`) REFERENCES `joeee_country` (`id`);

ALTER TABLE `joeee_reservation` ADD FOREIGN KEY (`id`) REFERENCES `joeee_fellow_traveler` (`reservation_id`);

ALTER TABLE `joeee_person` ADD FOREIGN KEY (`id`) REFERENCES `joeee_fellow_traveler` (`person_id`);

ALTER TABLE `joeee_reservation` ADD FOREIGN KEY (`person_id`) REFERENCES `joeee_person` (`id`);

ALTER TABLE `joeee_rooms_booked` ADD FOREIGN KEY (`room_id`) REFERENCES `joeee_room` (`id`);

ALTER TABLE `joeee_reservation` ADD FOREIGN KEY (`id`) REFERENCES `joeee_rooms_booked` (`reservation_id`);
