#!/bin/bash

function usage() {
    echo "Usage: $0 <command> [args]"
    echo "Commands:"
    echo "  new 'Article title'"
    echo "  preview"
    echo "  build"
    exit 1
}

function new() {
    if [ -z "$1" ]; then
        echo "Usage: $0 new 'Article title'"
        exit 1
    fi

    TITLE="$1"
    SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]')
    SLUG=$(echo "$SLUG" | sed 's/ /-/g')
    SLUG=$(echo "$SLUG" | sed 's/[^a-z0-9-]//g')

    CURRENT_YEAR=$(date +%Y)
    CURRENT_DATE=$(date +%Y-%m-%d)

    export HUGO_TITLE="$TITLE"
    hugo new --kind article "articles/$CURRENT_YEAR/$CURRENT_DATE-$SLUG"
}

function preview() {
    hugo server --buildDrafts --disableFastRender --navigateToChanged --templateMetrics --templateMetricsHints --watch --forceSyncStatic -e production --minify
}

function build() {
    rm -rf ./output
    hugo -e production --minify --logLevel debug --printI18nWarnings --printPathWarnings
}

if [ "$#" -lt 1 ]; then
    usage
fi

case "$1" in
    new)
        shift
        new "$@"
        ;;
    preview)
        preview
        ;;
    build)
        build
        ;;
    *)
        usage
        ;;
esac