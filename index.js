/**
 * Created by marlonchavarria on 12/26/15.
 */

"use strict";

var log4js = require('log4js');
var request = require("request");


var consoleLog = console.log.bind(console);

function httpRequestAppender(config) {
    return function (loggingEvent) {

        //validate configuration
        if (config != null && config.httpRequest != null && config.httpRequest.endpoint != null &&
            config.httpRequest.method != null && config.httpRequest.contentType != null &&
            config.params != null && config.paramUsedToSendLoggingEvent) {
            var options = {
                method: config.httpRequest.method,
                url: config.httpRequest.endpoint,
                headers: {'content-type': config.httpRequest.contentType}
            };

            if (config.httpRequest.contentType === 'application/x-www-form-urlencoded') {
                options.form = config.params
                options.form.metadata = loggingEvent;

            } else if (config.httpRequest.contentType === 'application/json') {
                options.body = config.params;
                options.body.metadata = loggingEvent;
            } else {
                consoleLog("ContentType: ".concat(config.httpRequest.contentType, " is not supported"));
            }
        } else {
            consoleLog("httpRequestAppender: Invalid Configuration please check");
            return;
        }


        request(options, function (error, response, body) {
            if (error) console.log("Error from httpRequestAppender: ".concat(JSON.stringify(error)));


        });


    };
}

function configure(config) {
    return httpRequestAppender(config);
}
exports.name = 'httpRequestAppender';
exports.appender = httpRequestAppender;
exports.configure = configure;