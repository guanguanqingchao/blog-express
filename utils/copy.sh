#!bin/sh
cd /Users/didi/projects/DEMO/NODE/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log