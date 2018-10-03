<?php
//////////////////////////////////////////////////////////////////////////////
// RSUser login script
// v0.3
//////////////////////////////////////////////////////////////////////////////
//
// Parameters:
//      <userIdentifier>
//      <credentials> (see RedSandUtils.formAuthenticatedURI())
//
// Return value:
//      (String) userType on success
//      (String) "false" on failure
//
// Checks integrated:
//      User authentication
//
//////////////////////////////////////////////////////////////////////////////

require_once('../modules/Settings.php');
require_once('../modules/simpleClasses/SimpleUtilities.php');
require_once('../modules/dbConnector/DBConnector.php');
// For Authenticator
require_once('../modules/simpleClasses/SimpleCryptography.php');
require_once('../modules/authenticator/Authenticator.php');

//----------------------------------------------------------------------------
// Init

$settings = new Settings();
$dbConnector = new DBConnector($settings->connectionSettings);
$authenticator = new Authenticator($settings, $dbConnector);
$simpleUtils = new SimpleUtilities();

//----------------------------------------------------------------------------
// Authentication
$result = $authenticator->validatePassword($_GET['userIdentifier'], $_GET['credentials']);
if ($result === false)
{
    // (String) "false0"
    print('false0');
}
else
{
    // Admin cannot be locked out!
    if ($result == "admin") {
        // (String) userType
        print($result);
        exit(0);
    }
    // Others
    $rssys = $dbConnector->query("SELECT * FROM rssystem WHERE `key`='loginOn'");
    if ($rssys)
    {
        if ($rssys[0]['value'] == 'yes')
        {
            // (String) userType
            print($result);
        }
        else
        {
            // (String) "false1"
            print('false1');
        }
    }
    else
    {
        // (String) "false2"
        print('false2');
    }
}

?>
