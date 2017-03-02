#!/bin/bash/
echo "\nWatcher service started.\n";

#adjust results_path according to your settings
results_path=/home/matejci/bookanddrive/apache-jmeter-3.1/bin/results;

inotifywait -m $results_path -e close_write | while read path action file; do
 echo "The file '$file' closed in directory '$path' via '$action'";
 echo "Importing data...\n";
 import_path=$results_path/$file;
 curl http://localhost:3000/service/import/jmeterresults?path=$import_path;
done
