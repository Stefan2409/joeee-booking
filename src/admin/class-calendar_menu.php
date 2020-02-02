<?php

namespace Joeee_Booking\Admin;
if ( ! class_exists( Calendar_Menu::class ) ) {
	/**
	 * The admin-specific calendar menu.
	 */
	class Calendar_Menu {


		public function add_calendar_menu(): void {
			add_menu_page(
				esc_html__( "Jö's Booking", 'joeee-booking' ),
				esc_html__( 'Booking Calendar', 'joeee-booking' ),
				'manage_options',
				'joeee-booking-calendar',
				[ $this, 'booking_calendar_page'],
				'dashicons-calendar-alt',
				20
			);
		}

				/**
		 * Outputs HTML for the Booking Calendar page.
		 */
		public function booking_calendar_page(): void {
			require_once plugin_dir_path( __FILE__ ) . 'templates/calendar.php';

		}

    }
}