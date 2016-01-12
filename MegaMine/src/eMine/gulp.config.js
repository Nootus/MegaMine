module.exports = function() {
    var webroot = "./wwwroot/";
	var config = {

		allTs: webroot+'app/**/*.ts',
        typings:'./typings/**/*/d/ts',
        
		tsOutputPath: webroot+'app/' 	//Type Script Output path
	};
	
	return config;
}