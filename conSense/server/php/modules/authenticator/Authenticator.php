<?php
//////////////////////////////////////////////////////////////////////////////
// Class of authetication and login tasks.
//////////////////////////////////////////////////////////////////////////////
//
// Requires simpleClasses/SimpleCryptography.php
//
//////////////////////////////////////////////////////////////////////////////

class Authenticator
{
    var $version = "0.8";

    var $tableNameOfUserData = 'deadbeef';
    var $fieldNameOfPassword = 'deadbeef';
    var $fieldNameOfUserId = 'deadbeef';
    var $fieldNameOfUserType = 'deadbeef';
    var $tableNameOfAccessRights = 'deadbeef';
    var $fieldNameOfAccessRight = 'deadbeef';
    var $fieldNameOfTableToCheck = 'deadbeef';

    var $database;
    var $crypto;

    var $errorIdentifier;
    var $errorMsg;

    var $validatedUserID = 'deadbeef';
    var $validatedPassword = 'deadbeef';

    //------------------------------------------------------------------------
    // Constructor
    //------------------------------------------------------------------------

    // Authenticator
    function Authenticator($settings, $databaseConnection)
    {
        $this->tableNameOfUserData
            = $settings->authenticationSettings["tableNameOfUserData"];
        $this->fieldNameOfUserId
            = $settings->authenticationSettings["fieldNameOfUserId"];
        $this->fieldNameOfPassword
            = $settings->authenticationSettings["fieldNameOfPassword"];
        $this->fieldNameOfUserType
            = $settings->authenticationSettings["fieldNameOfUserType"];

        $this->tableNameOfAccessRights
            = $settings->authenticationSettings["tableNameOfAccessRights"];
        $this->fieldNameOfAccessRight
            = $settings->authenticationSettings["fieldNameOfAccessRight"];
        $this->fieldNameOfTableToCheck
            = $settings->authenticationSettings["fieldNameOfTableToCheck"];

        $this->database = $databaseConnection;

        $this->crypto = new SimpleCryptography();
    }

    //------------------------------------------------------------------------
    // Methods
    //------------------------------------------------------------------------

    // Authenticator
    // Validates the given username and password.
    // Returns (Boolean) false and sets error messages on error.
    // Returns userType on success.
    function validatePassword($userId, $credentials)
    {
        $sql =
            "SELECT $this->fieldNameOfUserId, $this->fieldNameOfPassword, $this->fieldNameOfUserType
            FROM $this->tableNameOfUserData
            WHERE $this->fieldNameOfUserId = '$userId';";

        $user = $this->database->query($sql);

        if (count($user) < 1)
        {
            $this->errorIdentifier = "validatePassword #001";
            $this->errorMsg = "";
            return false;
        }
        else
        {
            if (count($user) > 1)
            {
                $this->errorIdentifier = "validatePassword #002";
                $this->errorMsg = "";
                return false;
            }
            else
            {
                $credentials = str_replace(array('-','_','.'), array('+','/','='), $credentials);
                $credentials = base64_decode($credentials);

                $passwordHash
                    = substr(
                        $this->crypto->RC4Decrypt($user[0][$this->fieldNameOfPassword],
                        $credentials), 0, 40);

                if ($passwordHash == $user[0][$this->fieldNameOfPassword])
                {
                    $this->validatedUserID
                        = $user[0][$this->fieldNameOfUserId];
                    $this->validatedPasswordHash
                        = $user[0][$this->fieldNameOfPassword];

                    // Return userType on success
                    return $user[0][$this->fieldNameOfUserType];
                }
                else
                {
                    $this->errorIdentifier = "validatePassword #003";
                    $this->errorMsg = "";
                    return false;
                }
            }
        }
    }

    //------------------------------------------------------------------------

    // Authenticator
    // Changes the given user's password.
    // Returns a boolean and sets error messages if necessary.
    function changePassword($userId, $newCredentials)
    {
        $sql =
            "SELECT $this->fieldNameOfUserId, $this->fieldNameOfPassword
            FROM $this->tableNameOfUserData
            WHERE $this->fieldNameOfUserId = '$userId';";

        $user = $this->database->query($sql);

        if (count($user) < 1)
        {
            $this->errorIdentifier = "changePassword #001";
            $this->errorMsg = "";
            return false;
        }
        else
        {
            if (count($user) > 1)
            {
                $this->errorIdentifier = "changePassword #002";
                $this->errorMsg = "";
                return false;
            }
            else
            {
                $newCredentials = str_replace(array('-','_','.'), array('+','/','='), $newCredentials);
                $newCredentials = base64_decode($newCredentials);

                $newPasswordHash
                    = substr(
                        $this->crypto->RC4Decrypt($user[0][$this->fieldNameOfPassword],
                        $newCredentials), 0, 40);

                $sql =
                    "UPDATE $this->tableNameOfUserData
                    SET $this->fieldNameOfPassword = '$newPasswordHash'
                    WHERE $this->fieldNameOfUserId = '$userId';";

                $result = $this->database->query($sql);

                if ($result === false)
                {
                    $this->errorIdentifier = "changePassword #003";
                    $this->errorMsg = "";
                    return false;
                }
                else {
                    return true;
                }
            }
        }
    }

    //------------------------------------------------------------------------

    // Authenticator
    // Checks if the user has access to the table
    function validateAccessToDatabase($userId, $tableName, $accesType)
    {
        $sql =
            "SELECT *
            FROM $this->tableNameOfAccessRights
            WHERE $this->fieldNameOfUserId = '$userId'
            AND $this->fieldNameOfTableToCheck = '$tableName'
            AND $this->fieldNameOfAccessRight = '$accesType'";

        $rights = $this->database->query($sql);

        if (count($rights) > 0)
        {
            return true;
        }
        else
        {
            $this->errorIdentifier = "validateAccessToDatabase #001";
            return false;
        }

    }
}
?>
