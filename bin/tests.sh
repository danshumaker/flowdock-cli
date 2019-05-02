#!/bin/bash -xv

# Test Examples

j='bin/flowdock.js'
$j -h
$j config -c
$j config
$j message -m "api test"
$j message -m "api test" -t "#tag-me"
