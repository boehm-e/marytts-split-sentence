var fs = require('fs');
var dir = fs.readdirSync('./audio_input');

for (var i=0;i<dir.length; i++) {
    require('child_process').execSync(`python -m aeneas.tools.execute_task audio_input/${dir[i]} texte.txt "task_language=fr|os_task_file_format=json|is_text_type=plain" output.json`)
    var json = JSON.parse(fs.readFileSync('output.json')).fragments;

    for (var j=0;j<json.length;j++) {
	var filename = `${dir[i].split('.')[0]}_${json[j].id}`;
	console.log(filename);
	var phrase = json[j].lines[0];
	var begin = json[j].begin
	var end = json[j].end;
	require('child_process').execSync(`sox audio_input/${dir[i]} audio_output/${filename}.wav trim ${begin}  =${end} `);
	fs.appendFileSync('txt.done.data', `(${filename} "${phrase}")\n`);

    }
}
