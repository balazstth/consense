<?php
class SimpleUtilities
{
    var $version = '0.2';

    //------------------------------------------------------------------------
    // Constructor
    //------------------------------------------------------------------------

    // SimpleUtilities
    function SimpleUtilities()
    {
    
    }
    
    //------------------------------------------------------------------------

    // SimpleUtilities
    // File uploader parametered by $_FILES['uploadedfile']['name']
    // targetPath have to be of form: some/path/here/
    // Returns uploaded file path on success, 0 on error.
    function upload($targetPath) {
        $target_path = $targetPath . basename( $_FILES['uploadedfile']['name']); 

        if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $target_path)) {
            return $target_path;
        } else{
            return 0;
        }
    }

}
?>
