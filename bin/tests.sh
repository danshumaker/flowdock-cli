#!/bin/bash -xv

# Test Examples

j='bin/flowdock.js'
$j -h
$j config -c
$j config
$j message "api test"
