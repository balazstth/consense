<?php
////////////////////////////////////////////////////////////////////////////////
// basic database settings
////////////////////////////////////////////////////////////////////////////////

class Settings
{

    var $connectionSettings = array();
    var $authenticationSettings = array();

    function Settings() {
        /*
        $this->connectionSettings["engine"] = "mysql";
        $this->connectionSettings["host"] = "flowers-and-pots.com";
        $this->connectionSettings["user"] = "admin2";
        $this->connectionSettings["passwd"] = "kispucorka";
        $this->connectionSettings["dbName"] = "florists";
        */
        $this->connectionSettings["engine"] = "mysql";
        $this->connectionSettings["host"] = "localhost";
        $this->connectionSettings["user"] = "root";
        $this->connectionSettings["passwd"] = "admin";
        $this->connectionSettings["dbName"] = "rsdb";

        $this->authenticationSettings["tableNameOfUserData"] = "rsuser";
        $this->authenticationSettings["fieldNameOfUserId"] = "userId";
        $this->authenticationSettings["fieldNameOfPassword"] = "passwordHash";
        $this->authenticationSettings["fieldNameOfUserType"] = "userType";

        $this->authenticationSettings["tableNameOfAccessRights"] = "rsdbaccessrights";
        $this->authenticationSettings["fieldNameOfAccessRight"] = "accessRight";
        $this->authenticationSettings["fieldNameOfTableToCheck"] = "tableName";
    }

}
?>
