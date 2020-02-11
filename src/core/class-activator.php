<?php

namespace Joeee_Booking\Core;

use Joeee_Booking\Plugin_Data as Plugin_Data;
use Joeee_Booking\Common\Utilities\Country as Country;

// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( Activator::class ) ) {
	/**
	 * Fired during plugin activation
	 *
	 * This class defines all code necessary to run during the plugin's activation.
	 **/
	class Activator {

		/**
		 * Creates all the tables that are necessary for the plugin logic.
		 *
		 * 
		 */
		public static function activate() {
			global $joeee_db_version;
			$joeee_db_version = Plugin_Data::plugin_db_version();

			global $wpdb;
			$charset_collate = $wpdb->get_charset_collate() . ' ENGINE=innoDB';

			$table_users = $wpdb->prefix . "users";
			$table_person = $wpdb->prefix . "joeee_person";
			$table_address = $wpdb->prefix . "joeee_address";
			$table_fellow = $wpdb->prefix . "joeee_fellow_traveler";
			$table_country = $wpdb->prefix . "joeee_country";
			$table_room = $wpdb->prefix . "joeee_room";
			$table_reservation = $wpdb->prefix . "joeee_reservation";
			$table_booked = $wpdb->prefix . "joeee_room_booked";

			$sql_person = "CREATE TABLE $table_person (
				id int(10) NOT NULL AUTO_INCREMENT,
				user_id bigint(20) unsigned,
				first_name varchar(255) NOT NULL,
				last_name varchar(255) NOT NULL,
				gender boolean,
				address_id int(10),
				birth date,
				nationality_id int(10),
				CONSTRAINT person_foreign PRIMARY KEY  (id),
				FOREIGN KEY  (user_id) REFERENCES $table_users (id),
				FOREIGN KEY  (address_id) REFERENCES $table_address (id),
				FOREIGN KEY  (nationality_id) REFERENCES $table_country (id)
				) $charset_collate;";

			$sql_address = "CREATE TABLE IF NOT EXISTS $table_address (
				id int(10) NOT NULL AUTO_INCREMENT,
				user_id bigint(20) unsigned,
				street varchar(255),
				zip varchar(255),
				city varchar(255),
				state_id int(10),
				CONSTRAINT address_foreign PRIMARY KEY  (id),
				FOREIGN KEY  (state_id) REFERENCES $table_country (id) 
				) $charset_collate;";

			$sql_fellow = "CREATE TABLE IF NOT EXISTS $table_fellow (
				reservation_id int(10),
				person_id int(10),
				CONSTRAINT fellow_foreign PRIMARY KEY  (reservation_id, person_id),
				FOREIGN KEY  (person_id) REFERENCES $table_person (id),
				FOREIGN KEY  (reservation_id) REFERENCES $table_reservation (id) 
				) $charset_collate;";

			$sql_country = "CREATE TABLE $table_country (
				id int(10) NOT NULL,
				alpha2_code char(2) NOT NULL,
				en_name varchar(64) NOT NULL,
				de_name varchar(64) NOT NULL,
				PRIMARY KEY  (id)
				) $charset_collate;";

			$sql_room = "CREATE TABLE $table_room (
				id int(10) NOT NULL AUTO_INCREMENT,
				number varchar(255) NOT NULL,
  				capacity smallint(5) NOT NULL,
				floor smallint(5) NOT NULL,
				price float(10) NOT NULL,
				active boolean NOT NULL,
				created timestamp,
				PRIMARY KEY  (id)
				) $charset_collate;";

			$sql_reservation = "CREATE TABLE IF NOT EXISTS $table_reservation (
				id int(10) NOT NULL AUTO_INCREMENT,
				person_id int(10) NOT NULL,
				created timestamp,
				CONSTRAINT reservation_foreign PRIMARY KEY  (id),
				FOREIGN KEY  (person_id) REFERENCES $table_person (id)
				) $charset_collate;";

			$sql_booked = "CREATE TABLE IF NOT EXISTS $table_booked (
				room_id int(10) NOT NULL AUTO_INCREMENT,
				reservation_id int(10) NOT NULL,
				booked_from datetime NOT NULL,
				booked_to datetime NOT NULL,
				price float(10) NOT NULL,
				confirmation tinyint(3),
				CONSTRAINT booked_foreign PRIMARY KEY  (room_id, reservation_id),
				FOREIGN KEY  (room_id) REFERENCES $table_room (id)
				) $charset_collate;";

			
			$sql = [$sql_country, $sql_room];
			require_once( ABSPATH . 'wp-admin/includes/upgrade.php');
			
			foreach($sql as $query) {
				dbDelta( $query );
			}

			$sql_foreign = [$sql_address, $sql_booked, $sql_person, $sql_reservation, $sql_fellow];
			
			foreach($sql_foreign as $query) {
				$wpdb->query( $query );
			}
			
			$Country = new Country();
			$country_en = $Country->get_en_countries();
			$country_de = $Country->get_de_countries();
			$alpha2 = array_keys($country_en);
			$i = 1;
			foreach($alpha2 as $iso) {
				$wpdb->replace(
					$table_country,
					array(
						'id' => $i,
						'alpha2_code' => $iso,
						'en_name' => $country_en[$iso]['name'],
						'de_name' => $country_de[$iso]['name'],
					),
					array('%d', '%s', '%s', '%s')
				);
				$i++;
			}
			



			add_option( 'joeee_booking_db_version', $joeee_db_version );

		}

	}
}