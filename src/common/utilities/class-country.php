<?php

namespace Joeee_Booking\Common\Utilities;

// Abort if this file is called directly.
if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists(Country::class)) {
    /**
     * The functionality shared between the admin and public-facing areas of the plugin.
     *
     * Useful for things like utilities or hooking into something that affects both back-end and front-end.
     */
    class Country
    {

        public function getEnCountries()
        {
            $countries = [];

            $countries['AT'] = ['name' => 'Austria'];
            $countries['BE'] = ['name' => 'Belgium'];
            $countries['BG'] = ['name' => 'Bulgaria'];
            $countries['CY'] = ['name' => 'Cyprus'];
            $countries['CZ'] = ['name' => 'Czech Republic'];
            $countries['DE'] = ['name' => 'Germany'];
            $countries['DK'] = ['name' => 'Denmark'];
            $countries['EE'] = ['name' => 'Estonia'];
            $countries['ES'] = ['name' => 'Spain'];
            $countries['FI'] = ['name' => 'Finland'];
            $countries['FR'] = ['name' => 'France'];
            $countries['GB'] = ['name' => 'United Kingdom'];
            $countries['GR'] = ['name' => 'Greece'];
            $countries['HU'] = ['name' => 'Hungary'];
            $countries['HR'] = ['name' => 'Croatia'];
            $countries['IE'] = ['name' => 'Ireland, Republic of (EIRE)'];
            $countries['IT'] = ['name' => 'Italy'];
            $countries['LT'] = ['name' => 'Lithuania'];
            $countries['LU'] = ['name' => 'Luxembourg'];
            $countries['LV'] = ['name' => 'Latvia'];
            $countries['MT'] = ['name' => 'Malta'];
            $countries['NL'] = ['name' => 'Netherlands'];
            $countries['PL'] = ['name' => 'Poland'];
            $countries['PT'] = ['name' => 'Portugal'];
            $countries['RO'] = ['name' => 'Romania'];
            $countries['SE'] = ['name' => 'Sweden'];
            $countries['SI'] = ['name' => 'Slovenia'];
            $countries['SK'] = ['name' => 'Slovakia'];

            return $countries;
        }

        public function getDeCountries()
        {
            $countries = [];

            $countries['AT'] = ['name' => 'Österreich'];
            $countries['BE'] = ['name' => 'Belgien'];
            $countries['BG'] = ['name' => 'Bulgarien'];
            $countries['CY'] = ['name' => 'Zypern'];
            $countries['CZ'] = ['name' => 'Tschechien'];
            $countries['DE'] = ['name' => 'Deutschland'];
            $countries['DK'] = ['name' => 'Dänemark'];
            $countries['EE'] = ['name' => 'Estland'];
            $countries['ES'] = ['name' => 'Spanien'];
            $countries['FI'] = ['name' => 'Finland'];
            $countries['FR'] = ['name' => 'Frankreich'];
            $countries['GB'] = ['name' => 'England'];
            $countries['GR'] = ['name' => 'Griechenland'];
            $countries['HU'] = ['name' => 'Ungarn'];
            $countries['HR'] = ['name' => 'Kroatien'];
            $countries['IE'] = ['name' => 'Irland'];
            $countries['IT'] = ['name' => 'Italien'];
            $countries['LT'] = ['name' => 'Litauen'];
            $countries['LU'] = ['name' => 'Luxemburg'];
            $countries['LV'] = ['name' => 'Lettland'];
            $countries['MT'] = ['name' => 'Malta'];
            $countries['NL'] = ['name' => 'Holland'];
            $countries['PL'] = ['name' => 'Polen'];
            $countries['PT'] = ['name' => 'Portugal'];
            $countries['RO'] = ['name' => 'Rumänien'];
            $countries['SE'] = ['name' => 'Schweden'];
            $countries['SI'] = ['name' => 'Slowenien'];
            $countries['SK'] = ['name' => 'Slowakei'];

            return $countries;
        }
    }
}
