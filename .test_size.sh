#!/bin/bash

DIR=$1
BORDER_SIZE=$2

if [ ! -n "$DIR" ]; then
    echo "ERROR: No dir specified"
    exit 1
fi

if [ ! -d "$DIR" ]; then
    echo "ERROR: No such dir present"
    exit 1
fi

if [ ! -n "$BORDER_SIZE" ]; then
    echo "ERROR: No size specified"
    exit 1
fi

if [ ! "$(ls -A $DIR)" ]; then
    echo "INFO: Dir is empty"
    exit 0
fi

BORDER_SIZE_IN_BYTES=$(($BORDER_SIZE*1024*1024))
STATUS=0
for FILENAME in $DIR/*  #traverse filenames...
do
    FILESIZE=$(stat -c%s "$FILENAME")

    if [ $FILESIZE -gt $BORDER_SIZE_IN_BYTES ]; then
        FILESIZE_IN_MB=$((($FILESIZE / 1024) / 1024))
        echo "ERROR: $FILENAME is too large = $FILESIZE_IN_MB MB."
        STATUS=2
    fi
done

if [ "$STATUS" -eq "0" ]; then
    echo "SUCCESS: All files are under $BORDER_SIZE MB."
    exit 0
else
    exit 2
fi

