<?php

namespace Joeee_Booking\Admin;

use Joeee_Booking\Admin\Assets as Assets;

if ( ! class_exists( Admin_Menus::class ) ) {
	/**
	 * The admin-specific calendar menu.
	 */
	class Admin_Menus {


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

			$Assets = new Assets();
			$Assets->enqueue_scripts();

		}


		/**
		 * Adding sub-menu for booking extras like dinner etc.
		 */
		public function add_extras_submenu(): void {
			add_submenu_page(
				'joeee-booking-calendar',
				esc_html__("Reservation Extras", 'joeee-booking'),
				esc_html__( 'Reservation Extras', 'joeee-booking' ),
				'manage_options',
				'joeee-booking-extras',
				[ $this, 'booking_extras_page']
			);
		}

		/**
		 * Outputs HTML for the Extras page.
		 */
		public function booking_extras_page() {
			require_once plugin_dir_path( __FILE__ ) . 'templates/extras.php';
			$Assets = new Assets();

			$Assets->enqueue_scripts_extra();
		}

    }
}