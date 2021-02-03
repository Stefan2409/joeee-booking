<?php

namespace Joeee_Booking\Common\Utilities;

// Abort if this file is called directly.
if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists(Links::class)) {

    /**
     * Things related to links and URLs.
     */
    class Links
    {
        /**
         * Detect the current URL from the WP Request.
         *
         * @return string
         */
        public function getCurrentUrl(): string
        {
            global $wp;

            $current_url = home_url(add_query_arg([], $wp->request));

            return $current_url;
        }
    }

}
