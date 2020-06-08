<?php

namespace Joeee_Booking\Frontend;

use Joeee_Booking\Frontend\Assets as Assets;

if (!class_exists(Login::class)) {
    /**
     * The admin-specific calendar menu.
     */
    class Login {

        public function add_login() {
        add_filter( 'wp_nav_menu_items', function( $items, $args ) {

            // Only used on main menu
/*             if ( 'main_menu' != $args->theme_location ) {
                return $items;
            } */
        
            // Add custom item
            $items .= '<li class="joeee-booking-menu-login">';
        
                // Log-out link
                if ( is_user_logged_in() ) {
        
                    $text            = 'Logout';
                    $logout_redirect = home_url( '/' ); // Change logout redirect URl here
                    $items .= '<a href="#" title="My Bookings" class="joeee-booking-member"><span class="link-inner">My Bookings</span></a>';
                    $items .= '</li>';
                    $items .= '<li class="joeee-booking-menu-member">';
                    $items .= '<a href="'. wp_logout_url( $logout_redirect ) .'" title="'. esc_attr( $text ) .'" class="joeee-booking-logout"><span class="link-inner">'. strip_tags( $text ) .'</span></a>';
                    
                   
        
                }
        
                // Log-in link
                else {
        
                    $text      = 'Login';
                    $login_url = wp_login_url(); // Change if you want a custom login url
        
                    $items .= '<a href="'. esc_url( $login_url ) .'" title="'. esc_attr( $text ) .'"><span class="joeee-booking-login">'. strip_tags( $text ) .'</span></a>';
        
                }
        
            $items .= '</li>';
        
            // Return nav $items
            return $items;
        
        }, 20, 2 );
    }   
    }

}