node-data-munging
Using Node JS to convert CSV file to JSON and map graph out of the generated JSON data

CSV to JSON Conversion:

Input: Place your CSV(.csv) file inside the /JS folder

Output: The Converted JSON files ( partone.json for male and femle life expectancy rate values of asian countries and parttwo.json for top 5 asian countries with high expectancy rate ) will be created and will be placed inside the /data folder.

Changes: To change the name of the file in the input code, give your modified file name along with the filepath as input to the variable filePath in the /js/json.js file(line:195).

Run the json.js file in the node using the command node gdp_country.js to get convert the input CSV file to desired JSON files

Plotting the Graph:

To view the graph plotted by the generated JSON run the index.html file in the http-server.
