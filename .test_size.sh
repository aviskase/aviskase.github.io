#!/bin/bash

check_size()
{
    for FILENAME in $DIR/*.png  #traverse filenames...

        do
        FILESIZE=$(stat -c%s "$FILENAME")

            if [ $FILESIZE -gt $BORDER_SIZE_IN_BYTES ]
            then
                FILESIZE_IN_MB=$((($FILESIZE / 1024) / 1024))
                echo "ERROR: $FILENAME is too large = $FILESIZE_IN_MB MB."
                STATUS=2
            fi

        done
}



DIR=$1
BORDER_SIZE=$2

STATUS=0

if [[ -n "$DIR" ]]; then
    if [[ -n "$BORDER_SIZE" ]]; then
        BORDER_SIZE_IN_BYTES=$(($BORDER_SIZE*1024*1024))
        check_size
    else
        echo "ERROR: No size specified"
        STATUS=1
    fi
else
    echo "ERROR: No dir specified"
    STATUS=1
fi

if [[ "$STATUS" == "0" ]]; then
    echo "SUCCESS: All files are under $BORDER_SIZE MB."
fi


exit $STATUS

