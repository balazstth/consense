<?php
//////////////////////////////////////////////////////////////////////////////
// DB update script
// v0.2
//////////////////////////////////////////////////////////////////////////////
//
// Parameters:
//      <userIdentifier>
//      <credentials> (see RedSandUtils.generateCredentials())
//      <table>
//      [column names with new values] eg. &userId=guest or &*
//
// Return value:
//      (String) "true" on success
//      (String) "false" on failure
//
// Checks integrated:
//      User authentication
//      DB table access authorization
//
//////////////////////////////////////////////////////////////////////////////

require_once('../modules/Settings.php');
require_once('../modules/dbConnector/DBConnector.php');
require_once('../modules/authenticator/Authenticator.php');
require_once('../modules/simpleClasses/SimpleCryptography.php');

$settings = new Settings();
$dbConnector = new DBConnector($settings->connectionSettings);
$authenticator = new Authenticator($settings, $dbConnector);

// General user authentication for non-guests
if ($authenticator->validatePassword(
		$_GET['userIdentifier'], $_GET['credentials'])
    && $authenticator->validateAccessToDatabase(
        $_GET['userIdentifier'], $_GET['table'], 'update'))
{
    // Query
    if (!$dbConnector->query($dbConnector->buildUpdate($_GET)))
    {
        // Query error
        print("false");
    }
    else
    {
        // Success
        print("true");
    }
}
else
{
    // Authorization error
    print("false");
}

?>
