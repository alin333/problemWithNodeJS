var fs = require(`fs`);

function mergeValues(values, content){
	//Cycle over the keys
	for (var key in values){
		//Replace all {{key}} with the values from the values object
		content = content.replace('{{'+ key + '}}', values[key]);
	}
	//return merged contents
	return content;
}

function view(templateName, values, res){
	//read from the templaye files
	var fileContents = fs.readFileSync(`./views/${templateName}.html`, {encoding: `utf8`});
	//insert values in to the content
	fileContents = mergeValues(values, fileContents);
	//write out to the respons
		res.write(fileContents);
}

module.exports.view = view;