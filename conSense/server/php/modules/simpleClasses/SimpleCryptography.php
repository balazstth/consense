<?php
class SimpleCryptography
{
    var $version = '0.1';

    //------------------------------------------------------------------------
    // Constructor
    //------------------------------------------------------------------------

    // SimpleCryptography
    function SimpleCryptography()
    {
    
    }
    
    //------------------------------------------------------------------------
    // Apparently RC4 cipher
    //------------------------------------------------------------------------

    // SimpleCryptography
    function RC4Encrypt($pwd, $data) {
    
        $buf[256] = ''; // 256B cipher buffer
        $cipher = "";
        
        $pwd_length = strlen($pwd);
        $data_length = strlen($data);

        for ($i = 0; $i < 256; $i++) {
            $buf[$i] = $i;
        }

        for ($j = $i = 0; $i < 256; $i++) {
            $j = ($j + $buf[$i] + ord($pwd[$i % $pwd_length])) % 256;
            $tmp = $buf[$i];
            $buf[$i] = $buf[$j];
        	$buf[$j] = $tmp;
        }

        for ($n = $j = $i = 0; $i < $data_length; $i++) {
            $n = ($n + 1) % 256;
            $j = ($j + $buf[$n]) % 256;

            $tmp = $buf[$n];
            $buf[$n] = $buf[$j];
            $buf[$j] = $tmp;

            $k = $buf[(($buf[$n] + $buf[$j]) % 256)];
            $cipher .= chr(ord($data[$i]) ^ $k);
        }

        return $cipher;
    }

    //------------------------------------------------------------------------

    // SimpleCryptography
    function RC4Decrypt($pwd, $data) {
        return $this->RC4Encrypt($pwd, $data);
    }

    //------------------------------------------------------------------------
}
?>
