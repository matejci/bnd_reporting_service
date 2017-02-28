#!/bin/bash/
echo "Watcher service started.\n"
#todo -> adjust directory path
inotifywait -m /home/matejci/bookanddrive/apache-jmeter-3.1/bin/results -e close_write | while read path action file; do
 echo "The file '$file' closed in directory '$path' via '$action'";
done
