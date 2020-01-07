<?php

namespace Joeee_Booking\Admin;

use Joeee_Booking\Plugin_Data as Plugin_Data;

// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( Assets::class ) ) {
	/**
	 * Enqueues the admin-specific assets.
	 */
	class Assets {

		/**
		 * Register the stylesheets for the admin area.
		 */
		public function enqueue_styles(): void {
			wp_enqueue_style( 'joeee-booking', plugin_dir_url( __FILE__ ) . 'css/style.css', [], Plugin_Data::plugin_version(), 'all' );
		}

		/**
		 * Register the JavaScript for the admin area.
		 */
		public function enqueue_scripts(): void {
			wp_enqueue_script( 'joeee-booking', plugin_dir_url( __FILE__ ) . 'js/script.js', [ 'jquery' ], Plugin_Data::plugin_version(), false );
		}
	}
}