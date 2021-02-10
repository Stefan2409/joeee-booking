<?php
namespace Joeee_Booking\Common;

use Monolog\Handler\RotatingFileHandler;
use Monolog\Logger;

final class Log
{

    protected static $instance;

    /**
     * Method to return the Monolog instance
     *
     * @return \Monolog\Logger
     */
    public static function getLogger()
    {
        if (!self::$instance) {
            self::configureInstance();
        }

        return self::$instance;
    }

    /**
     * Configure Monolog to use a rotating files system.
     *
     * @return Logger
     */
    protected static function configureInstance()
    {
        $dir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'log';

        if (!file_exists($dir)) {
            mkdir($dir, 0777, true);
        }

        $logger = new Logger('JoeeeBookingLog');
        $loglevel = Logger::ERROR;
        if (defined('WP_DEBUG') && true === WP_DEBUG) {
            $loglevel = Logger::DEBUG;
        }
        $logger->pushHandler(new RotatingFileHandler($dir . DIRECTORY_SEPARATOR . 'main.log', $loglevel));
        //$logger->pushHandler(new LogglyHandler('eeb5ba83-f0d6-4273-bb1d-523231583855/tag/monolog'));
        self::$instance = $logger;
    }

    public static function debug($message, array $context = [])
    {
        self::getLogger()->addDebug($message, $context);
    }

    public static function info($message, array $context = [])
    {
        self::getLogger()->addInfo($message, $context);
    }

    public static function notice($message, array $context = [])
    {
        self::getLogger()->addNotice($message, $context);
    }

    public static function warning($message, array $context = [])
    {
        self::getLogger()->addWarning($message, $context);
    }

    public static function error($message, array $context = [])
    {
        self::getLogger()->addError($message, $context);
    }

    public static function critical($message, array $context = [])
    {
        self::getLogger()->addCritical($message, $context);
    }

    public static function alert($message, array $context = [])
    {
        self::getLogger()->addAlert($message, $context);
    }

    public static function emergency($message, array $context = [])
    {
        self::getLogger()->addEmergency($message, $context);
    }

}
