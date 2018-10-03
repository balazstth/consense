<?php
//////////////////////////////////////////////////////////////////////////////
// Engine independent database handler written by Zsolt Schaefer.
// Based on the original idea of Balazs Toth.
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//
// DBConnector()
//
// resetError()
// setError()
//
// connect()
// open()
// close()
// query()
// getFieldList()
//
// buildSelect()
// buildInsert()
// buildUpdate()
//
// filterJavaScript()
// filterCSV()
// filterXML()
//
// getData()
//
//////////////////////////////////////////////////////////////////////////////

class DBConnector
{
    var $version = "0.13";
    var $moduleName = "DBConnector";

    var $engine;
    var $host;
    var $user;
    var $passwd;
    var $dbName;

    var $connection;

    var $errorMsg;
    var $errorIdentifier;

    //------------------------------------------------------------------------
    // Constructor
    //------------------------------------------------------------------------

    // DBConnector
    // Sets the basic variables to make a connection possible
    function DBConnector($arrayOfSettings)
    {
        $this->engine = $arrayOfSettings["engine"];
        $this->host = $arrayOfSettings["host"];
        $this->user = $arrayOfSettings["user"];
        $this->passwd = $arrayOfSettings["passwd"];
        $this->dbName = $arrayOfSettings["dbName"];

        $this->connect();
        $this->open();
    }

    //------------------------------------------------------------------------
    // Error handling
    //------------------------------------------------------------------------

    // DBConnector
    // Resets error messages
    function resetError()
    {
        $this->errorMsg = "";
        $this->errorIdentifier = "";
    }

    //------------------------------------------------------------------------

    // DBConnector
    // Sets error messages
    function setError($message, $code)
    {
        $this->errorMsg
            = $this->errorMsg
                ? $this->errorMsg
                : $message;
        $this->errorIdentifier
            = $this->errorIdentifier
                ? $this->errorIdentifier
                : "$this->moduleName / $code";
    }

    //------------------------------------------------------------------------
    // DB connection and query methods
    //------------------------------------------------------------------------

    // DBConnector
    // Connects to database server
    function connect()
    {
        switch ($this->engine)
        {
            case "mysql":
                $this->connection
                    = mysql_pconnect($this->host, $this->user, $this->passwd);
                if ($this->connection)
                {
                    $this->resetError();
                    return true;
                }
                else
                {
                    $this->setError(
                        "Could not connect to the database server.",
                        "connect #001"
                    );
                    return false;
                }
                break;
        }
    }

    //------------------------------------------------------------------------

    // DBConnector
    // Opens a database on the server already connected to
    function open()
    {
        switch ($this->engine)
        {
            case "mysql":
                if (mysql_select_db($this->dbName))
                {
                    $this->resetError();
                    return true;
                }
                else
                {
                    $this->setError(
                        "Could not open the database $this->dbName: "
                            . mysql_error(),
                        "open #001"
                    );
                    return false;
                }
                break;
        }
    }

    //------------------------------------------------------------------------

    // DBConnector
    // Closes the connection
    function close()
    {
        switch ($this->engine)
        {
            case "mysql":
                mysql_close($this->connection);
                break;
        }
    }

    //------------------------------------------------------------------------

    // DBConnector
    // Executes an SQL query.
    // Returns:
    //      on Success:
    //          on Select: an array of results
    //          on Insert and Update: true
    //      on Failure:
    //          false
    function query($queryString)
    {
        // Setting default values
        $resultArray = array();
        $queryType = strtolower(strtok($queryString, " "));

        switch ($this->engine)
        {
            case "mysql":
                if ($result = mysql_query($queryString, $this->connection))
                {
                    $this->resetError();
                    if ($queryType == "select" or $queryType == "show")
                    {
                        $nextRow = mysql_fetch_assoc($result);
                        while ($nextRow)
                        {
                            array_push($resultArray, $nextRow);
                            $nextRow = mysql_fetch_assoc($result);
                        }
                        return $resultArray;
                    }
                    else if($queryType == "insert" or $queryType == "update")
                    {
                        return true;
                    }
                }
                else
                {
                    $this->setError('', "query #001");
                    return false;
                }
                break;
        }
    }

    //------------------------------------------------------------------------

    // DBConnector
    // Returns field name list for existing tables or false on error.
    function getFieldList($tableName)
    {
        $sql = "SHOW TABLES
                FROM $this->dbName
                WHERE tables_in_$this->dbName = '$tableName'";
        $tables = $this->query($sql);

        // If there is one and only one table by the given name
        if (count($tables) == 1)
        {
            $this->resetError();

            // Listing fields
            $sql = "SHOW FIELDS
                    FROM $tableName";
            $tableInfo = $this->query($sql);

            $fieldInfo = reset($tableInfo);
            $fieldList = array();
            while ($fieldInfo)
            {
                array_push($fieldList, $fieldInfo["Field"]);
                $fieldInfo = next($tableInfo);
            }

            return $fieldList;
        }
        else
        {
            $this->setError("Table does not exist in database",
                "getFieldList #001");
            return false;
        }
    }

    //------------------------------------------------------------------------
    // SQL query builders
    //------------------------------------------------------------------------

    // DBConnector
    // Constructs a simple SQL SELECT query from $params:
    //      $params['table']
    //      $params[<any field name>]
    //      $params['where']
    // Invalid field names in $params will be omitted.
    function buildSelect($params)
    {
        // Fetching field list
        $fieldList = $this->getFieldList($params['table']);
        if (!is_array($fieldList))
        {
            return false;
        }

        //--------------------------------------------------------------------

        // Walk through the array of given parameters and if one of them is a
        // field name, include it in the query
        reset($params);
        $fieldSelect = '';
        $whereStatement = '';

        while (key($params))
        {
            if (in_array(key($params), $fieldList))
            {
                $fieldSelect .= key($params) . ", ";
                if (current($params))
                {
                    $whereStatement .= " " . key($params) . " = '"
                        . current($params) . "' AND ";
                }
            }
            next($params);
        }

        //--------------------------------------------------------------------

        // If parameter * is specified or no field name is given at all,
        // build up "SELECT *"
        if (!$fieldSelect || in_array("*", array_keys($params)))
        {
            $fieldSelect = " * ";
        }
        else
        {
            $fieldSelect = preg_replace("/,\s*$/", "", $fieldSelect);
        }

        //--------------------------------------------------------------------

        // Append custom where conditions
        if (isset($params['where']))
        {
            $whereStatement .= $params['where'];
        }
        $whereStatement
            = $whereStatement
                ? " WHERE " . preg_replace("/AND\s*$/", "", $whereStatement)
                : "";

        $result = "SELECT " . $fieldSelect . " FROM " . $params['table']
            . $whereStatement;
        return $result;
    }

    //------------------------------------------------------------------------

    // DBConnector
    // Constructs a simple SQL INSERT query from $params:
    //      $params['table']
    //      $params[<any field name>]
    // All field names must take place in $params.
    // Invalid field names in $params will be omitted.
    // Returns false on error.
    function buildInsert($params)
    {
        $fieldList = $this->getFieldList($params['table']);
        $fieldInsert = '';
        $valueInsert = '';

        reset($fieldList);
        while(current($fieldList))
        {
            if (in_array(current($fieldList), array_keys($params)))
            {
                $fieldInsert .= "`" . current($fieldList) . "`, ";
                $valueInsert .= "'" . $params[current($fieldList)] . "', ";
            }
            else
            {
                $this->setError("", "buildInsert #001");
                return false;
            }
            $fieldInfo = next($fieldList);
        }

        $fieldInsert = preg_replace("/,\s*$/", "", $fieldInsert);
        $valueInsert = preg_replace("/,\s*$/", "", $valueInsert);

        $result = "INSERT INTO `"
                . $params["table"]
                . "` (" . $fieldInsert . ") VALUES (" . $valueInsert . ");";
        return $result;
    }

    //------------------------------------------------------------------------

    // DBConnector
    // Constructs a simple SQL UPDATE query from $params:
    //      $params['table']
    //      $params[<any field name>]
    // Invalid field names in $params will be omitted.
    // Returns false on error.
    function buildUpdate($params)
    {
        $result = '';
        $setStatement = '';
        $fieldList = $this->getFieldList($params['table']);
        reset($fieldList);

        while(current($fieldList))
        {
            if (in_array(current($fieldList), array_keys($params)))
            {
                $setStatement .= "`" . current($fieldList) . "` = '" . $params[current($fieldList)] . "', ";
            }
            else
            {
                $this->setError("", "buildUpdate #001");
                return false;
            }
            $fieldInfo = next($fieldList);
        }

        $setStatement = preg_replace("/,\s*$/", "", $setStatement);

        $result = "UPDATE " . $params["table"] . " SET " . $setStatement;

        if (isset($params['where']))
        {
            $result .= " WHERE " . $params['where'] . ";" ;
        }
        else
        {
            $result .= ";";
        }

        return $result;
    }

    //------------------------------------------------------------------------
    // Converters/formatters
    //------------------------------------------------------------------------

    // DBConnector
    // Creates JS variable definition string from PHP result array in form of:
    //      [0][{coulumn0, column1, ...}]
    //      [1][{coulumn0, column1, ...}]
    //      ...
    function filterJavaScript($data, $variableName)
    {
        $resultingJavaScript = '';

        $resultingJavaScript .= "$variableName = [";
        $dataRow = reset($data);

        // Rows
        while (is_array($dataRow))
        {
            $resultingJavaScript .= "{";

            // Fields
            reset($dataRow);
            while (key($dataRow))
            {
                $resultingJavaScript
                    .= key($dataRow) . ": '" . current($dataRow) . "', ";
                next($dataRow);
            }

            // Replace closing comma with closing curly bracket
            $resultingJavaScript
                = preg_replace("/,\s*$/", "", $resultingJavaScript) . "}, ";

            $dataRow = next($data);
        }

        // Replace closing comma with closing curly bracket
        $resultingJavaScript
            = preg_replace("/,\s*$/", "", $resultingJavaScript) . "];";

        return $resultingJavaScript;
    }

    //------------------------------------------------------------------------

    // DBConnector
    // Creates CSV formatted string from PHP result array
    function filterCSV($data)
    {
        $dataRow = reset($data);
        $resultingCSV .= join(",", array_keys($dataRow)) . "\n";

        foreach ($data as $dataRow)
        {
            $resultingCSV .= join(",", array_values($dataRow)) . "\n";
        }

        return $resultingCSV;
    }

    //------------------------------------------------------------------------

    // DBConnector
    // TODO:
    // Creates XML formatted string from PHP result array
    function filterXML($data)
    {
        $result = '';

        return $result;
    }

    //------------------------------------------------------------------------

    // DBConnector
    // Main result formatter function.
    // Params:
    //      $params: URL parameters
    //      $filterFunction: filter*()
    // Returns:
    //      (Boolean) false on query error
    //      or
    //      Query results in filtered format.
    //      If the format is JavaScript object, its name will be either
    //      $params['resultName'] or "QR" . $resultNameSuffix
    function getData($params, $filterFunction)
    {
        $sql = $this->buildSelect($params);
        $result = $this->query($sql);
        if (!$result)
        {
            // Error
            return false;
        }

		// On success
        $resultName = '';
        if (isset($params['resultName']))
        {
            $resultName = $params['resultName'];
        }
        else
        {
            $resultName = "QR_" . $params['table'];
        }

        return($this->$filterFunction($result, $resultName));
    }

}
?>


