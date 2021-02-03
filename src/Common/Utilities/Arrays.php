<?php

namespace Joeee_Booking\Common\Utilities;

// Abort if this file is called directly.
if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists(Arrays::class)) {
    /**
     * The functionality shared between the admin and public-facing areas of the plugin.
     *
     * Useful for things like utilities or hooking into something that affects both back-end and front-end.
     */
    class Arrays
    {

        /**
         * Get all the values from a single or multi-dimensional array.
         *
         * Non-numeric array keys will be preserved but its value may be overwrittern, as per usual with merging arrays.
         *
         * @link https://gist.github.com/SeanCannon/6585889#gistcomment-2823537 Thanks to this collective effort.
         *
         * @param array $array
         *
         * @return array
         */
        public function flattenArray(array $array): array
        {
            $result = [];

            if (!is_array($array)) {
                $array = func_get_args();
            }

            foreach ($array as $key => $value) {
                if (is_array($value)) {
                    $result = array_merge($result, $this->flattenArray($value));
                } else {
                    $result = array_merge($result, [$key => $value]);
                }
            }

            return $result;
        }
    }
}
