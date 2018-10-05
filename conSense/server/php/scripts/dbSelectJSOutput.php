<?php
//////////////////////////////////////////////////////////////////////////////
// DB select script
// v0.5
//////////////////////////////////////////////////////////////////////////////
//
// Parameters:
//      <userIdentifier>
//      <credentials> (see RedSandUtils.generateCredentials())
//      <table>
//      [column names with conditions] eg. &userId=guest or &*
//      [where]
//      [resultName] resulting JavaScript variable name
//
// Return value:
//      (Object) Desired JS object on success
//      (String) "false" on failure
//
// Checks integrated:
//      User authentication
//      DB table access authorization
//
// Oneliner examples:
//      var callback = new Function("content", "write(content); eval(content); write(QR_User);"); load(redSandUtils.formAuthenticatedURI("./server/scripts/DBSelectJSOutput.php", { table: "RSUser", resultName: "QR_User" }, "admin", "admin"), callback);
//      var callback = new Function("content", "write(content); eval(content); write(QR_Test);"); load(simpleUtils.formURI("./server/scripts/DBSelectJSOutput.php", { table: "RSUser", resultName: "QR_User", userIdentifier: "guest" }), callback);
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

// Guest user
if ($_GET['userIdentifier'] == 'guest'
    && $authenticator->validateAccessToDatabase(
        $_GET['userIdentifier'], $_GET['table'], 'select'))
{
    // Query
    $result = $dbConnector->getData($_GET, 'filterJavaScript');
    if (!$result)
    {
        // Query error
        print("false");
    }
    else
    {
        // Success
        print($result);
    }
}
// General user authentication for non-guests
else if (
    $authenticator->validatePassword(
        $_GET['userIdentifier'], $_GET['credentials'])
    && $authenticator->validateAccessToDatabase(
        $_GET['userIdentifier'], $_GET['table'], 'select'))
{
    // Query
    $result = $dbConnector->getData($_GET, 'filterJavaScript');
    if (!$result)
    {
        // Query error
        print("false");
    }
    else
    {
        // Success
        print($result);
    }
}
else
{
    // Authorization error
    print("false");
}

?>
