<?php
//////////////////////////////////////////////////////////////////////////////
// DB insert script
// v0.3
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
// For Authenticator
require_once('../modules/simpleClasses/SimpleCryptography.php');
require_once('../modules/authenticator/Authenticator.php');

$settings = new Settings();
$dbConnector = new DBConnector($settings->connectionSettings);
$authenticator = new Authenticator($settings, $dbConnector);

// General user authentication for non-guests
if ($authenticator->validatePassword(
        $_GET['userIdentifier'], $_GET['credentials'])
    && $authenticator->validateAccessToDatabase(
        $_GET['userIdentifier'], $_GET['table'], 'insert'))
{
    // Query
    if (!$dbConnector->query($dbConnector->buildInsert($_GET)))
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
