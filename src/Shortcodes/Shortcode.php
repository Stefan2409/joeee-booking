<?php

namespace Joeee_Booking\Shortcodes;

use Joeee_Booking\Common\Common as Common;

// Abort if this file is called directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * The scaffolding for creating a new shortcode.
 *
 * @see \Joeee_Booking\Shortcodes\Manage_Shortcodes::$shortcode_classes Manually add your child class name here to get it to load.
 */
abstract class Shortcode
{

    /**
     * The Common instance.
     *
     * @var Common
     */
    public $common;

    /**
     * Initialize the class and set its properties.
     */
    public function __construct()
    {
        $this->common = new Common();
    }

    /**
     * Register the shortcode to WordPress.
     *
     * @see add_shortcode()
     */
    public function register(): void
    {
        $shortcode = new static();

        add_shortcode($this->getTag(), [$shortcode, 'init_shortcode']);
    }

    /**
     * Get the shortcode tag.
     *
     * If `$this->tag` exists, use it, else it will be created dynamically from this class' name.
     * All tags force hyphens to underscores.
     *
     * @see sanitize_key()
     *
     * @return string
     */
    public function getTag(): string
    {
        if (!empty($this->tag) && is_string($this->tag)) {
            $tag = $this->tag;
        } else {
            $tag = $this->buildTagFromClassName();
        }

        $tag = apply_filters(static::class . '::' . __FUNCTION__, $tag);

        $tag = str_replace('-', '_', $tag);

        return sanitize_key($tag);
    }

    /**
     * Get the shortcode tag based on this class' name.
     *
     * @return string
     */
    private function buildTagFromClassName(): string
    {
        $tag = str_replace(__NAMESPACE__, '', static::class);
        $tag = str_replace('\\', '', $tag);

        return strtolower($tag);
    }

    /**
     * Get the error message text allowed to be displayed to the user.
     *
     * @param string $fallback The text to display to an unprivileged user instead of the error message.
     *
     * @return string
     */
    public function getErrorMessage(string $cause = '', string $fallback = ''): string
    {
        if (current_user_can($this->requiredCapability())) {
            $message = $this->getErrorMessageToUserWithCap($cause);
        } else {
            $message = $fallback;
        }

        return $message;
    }

    /**
     * Capability required to access the settings, be shown error messages, etc.
     *
     * By default, 'customize' is mapped to 'edit_theme_options' (Administrator).
     *
     * @link https://developer.wordpress.org/themes/customize-api/advanced-usage/
     */
    public function requiredCapability(): string
    {
        return apply_filters($this->get_tag() . '_required_capability', $this->common->requiredCapability());
    }

    /**
     * Get the error message text that a privileged user should see.
     *
     * @param string $cause The reason this error is displayed. Will go through `esc_html()`.
     *
     * @return string
     */
    public function getErrorMessageToUserWithCap(string $cause): string
    {
        if (!is_string($cause) || '' === $cause) {
            $cause = esc_html_x('Unspecified', 'Shortcode error cause default text', 'joeee-booking');
        }

        $message = sprintf(
            esc_html_x(
                'Your attempt to use the `[%1$s]` shortcode resulted in an error because: %2$s. Please reference the documentation or inspect the code and try again. (Message only shown to users with the `%3$s` capability.)',
                'Shortcode error message',
                'joeee-booking'
            ),
            $this->getTag(),
            $cause,
            $this->requiredCapability()
        );

        $message = sprintf('<p class="%s-shortcode-error shortcode-%s">%s</p>', esc_attr('joeee-booking'), esc_attr($this->getTag()), $message);

        return $message;
    }

    /**
     * Logic for the shortcode.
     *
     * @param array  $atts    The raw attributes from the shortcode.
     * @param string $content The raw value from using an enclosing (not self-closing) shortcode.
     */
    public function initShortcode(array $atts = [], string $content = '')
    {
        return $this->processShortcode($this->getAtts($atts), $content);
    }

    /**
     * Logic for the shortcode.
     *
     * @see shortcodeAtts()
     *
     * @param array  $atts    The processed shortcode attributes after merging with defaults via `shortcode_atts()`.
     * @param string $content The raw value from using an enclosing (not self-closing) shortcode.
     */
    abstract public function processShortcode(array $atts = [], string $content = '');

    /**
     * Get and process the attributes.
     *
     * @see shortcodeAtts()
     *
     * @param array $atts
     *
     * @return array
     */
    public function getAtts(array $atts = []): array
    {
        return shortcodeAtts($this->getDefaults(), $atts, $this->getTag());
    }

    /**
     * An array of all the shortcode's possible attributes and their default values.
     *
     * @return array
     */
    abstract public function getDefaults(): array;
}
