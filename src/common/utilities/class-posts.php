<?php

namespace Joeee_Booking\Common\Utilities;

use WP_Post;
use WP_Query;

// Abort if this file is called directly.
if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists(Posts::class)) {
    /**
     * The functionality shared between the admin and public-facing areas of the plugin.
     *
     * Useful for things like utilities or hooking into something that affects both back-end and front-end.
     */
    class Posts
    {

        /**
         * Get the Post ID from the current page or from a passed integer or WP_Post object.
         *
         * Helper function for getting Post ID. Accepts null or a Post ID. If no $post object exists, returns false.
         *
         * @param null|int|WP_Post $post
         *
         * @return int|false
         */
        public function postIdHelper($post = null)
        {
            if (!is_null($post) && is_numeric($post) && absint($post) > 0) {
                return (int) $post;
            } elseif (is_object($post) && !empty($post->ID)) {
                return (int) $post->ID;
            } else {
                if (!empty($GLOBALS['post']) && $GLOBALS['post'] instanceof WP_Post) {
                    return get_the_ID();
                } else {
                    return false;
                }
            }
        }

        /**
         * Get all of the "Post" post type's Post IDs that the currently logged-in user has authored.
         *
         * @return false|WP_Post[]|int[] False if user is not logged-in. Array of post objects or post IDs
         *                               (or empty array) if user is logged-in.
         */
        public function getAllCurrentAuthorPostIds()
        {
            $current_user = wp_get_current_user();

            // User is not logged-in
            if (empty($current_user)) {
                return false;
            }

            $args = [
                'fields' => 'ids',
                'posts_per_page' => -1,
                'post_type' => 'post',
                'author' => $current_user->ID,
            ];

            return (new WP_Query($args))->get_posts();
        }

        /**
         * Get all of the "Post" post type's Post IDs.
         *
         * @return WP_Post[]|int[] Array of post objects or post IDs (or empty array).
         */
        public function getAllPostIds(): array
        {
            $args = [
                'fields' => 'ids',
                'posts_per_page' => -1,
                'post_type' => 'post',
            ];

            return (new WP_Query($args))->get_posts();
        }

        /**
         * Get the public Post Types, alpha-sorted by their labels.
         *
         * @see get_post_types()
         *
         * @return array
         */
        public function getPublicPostTypes(): array
        {
            $result = get_post_types(['public' => true], 'object');

            uasort(
                $result, function ($a, $b) {
                    return strcmp($a->label, $b->label);
                }
            );

            return $result;
        }
    }
}
