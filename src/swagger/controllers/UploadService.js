'use strict';
var logger = require('../../logger.js').logger('normal');
var fs = require('fs-extra');
var AdmZip = require('adm-zip');

exports.upload = function(args, res, next) {
	var uuid = args.uuid.value;
	var report = args.report.value;
	var log = args.log.value;

	fs.ensureDirSync(`./report/${uuid}`);
	fs.writeFileSync(`./report/${uuid}/all.log`, log.buffer);
    fs.writeFileSync(`./report/${uuid}/report.zip`, report.buffer);

    var zip = new AdmZip(`./report/${uuid}/report.zip`);
	zip.extractAllTo(`./report/${uuid}`, true);

    res.end(JSON.stringify({
	  errCode: -1,
	}));
} 
