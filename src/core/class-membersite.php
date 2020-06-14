<?php

namespace Joeee_Booking\Core;

use \WP_Error;

// Abort if this file is called directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Handles all of the member site creation.
 */

if (!class_exists(MemberSite::class)) {
    /**
     * Handles all the User creation, modification and deletion processes.
     *
     */
    class MemberSite
    {
        public function createMemberSite()
        {
            $new_page_title = 'Members';
            $new_page_content = '<div id="joeee-booking-members"></div>';

            $page_check = get_page_by_title($new_page_title);
            $new_page = array(
                'post_type' => 'page',
                'post_title' => $new_page_title,
                'post_content' => $new_page_content,
                'post_status' => 'publish',
                'post_author' => 1,
            );

            if (!isset($page_check->ID)) {
                $new_page_id = wp_insert_post($new_page, true);
            }

            if (is_wp_error($new_page_id)) {
                return new WP_Error('joeee-booking-activation-error', esc_html__("Members page can't be created!", 'joeee-booking'), array('status' => 400));
            } else {
                $member_site_url = get_page_link($new_page_id);
                return $member_site_url;
            }
        }
    }
}
