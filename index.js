/**
 * Created by marlonchavarria on 12/26/15.
 */

"use strict";

var log4js = require('log4js');
var request = require("request");


var consoleLog = console.log.bind(console);

function httpRequestAppender(config) {
    return function (loggingEvent) {
        var options = { method: config.httpRequest.method,
            url: config.httpRequest.endpoint,
            headers: { 'content-type': config.httpRequest.contentType}
        };

        if (config.httpRequest.contentType === 'application/x-www-form-urlencoded') {
            options.form = config.params
            options.form[config.paramUsedToSendLoggingEvent] = loggingEvent;

        } else if (config.httpRequest.contentType === 'application/json') {
            options.body = config.params;
            options.body[config.paramUsedToSendLoggingEvent] = loggingEvent;
        } else {
            consoleLog("ContentType: ".concat(config.httpRequest.contentType, " is not supported"));
        }



        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
        });


    };
}

function configure(config) {
    return httpRequestAppender(config);
}
exports.name = 'httpRequestAppender';
exports.appender = httpRequestAppender;
exports.configure = configure;