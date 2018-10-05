<?php
//////////////////////////////////////////////////////////////////////////////
// RSUser password change script
// v0.1
//////////////////////////////////////////////////////////////////////////////
//
// Parameters:
//      <userIdentifier>
//      <credentials> (see RedSandUtils.formAuthenticatedURI())
//      <transferCredentials>
//
// Return value:
//      (String) "true" on success
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
if (!$authenticator->validatePassword($_GET['userIdentifier'], $_GET['credentials'])) {
    print('false');
}
else {
    if (!$authenticator->changePassword($_GET['userIdentifier'], $_GET['transferCredentials'])) {
        print('false');
    }
    else {
        print('true');
    }
}

?>
