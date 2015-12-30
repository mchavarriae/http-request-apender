# http-request-apender

This is a appender for Log4JS this allows you to send the loggingEvent via an http call to the endpoint that you need.



## Installation
```
npm install http-request-appender
```

##Configuration

This appenders needs an httpRequest config with this properties:

* endpoint: URL to send data
* method: http method to use
* contentType: content type to use.

It also allows you to send some params to your endpoint, for this, use the params config (see example)

The last config key ```paramUsedToSendLoggingEvent``` allows you to specify which param from params config must be used to send the ``loggingEvent```

This appender use the logLevelFilter approach so you can define a ```level``` and ```maxLevel``` atributes
###Configuration Example

This example send


```javascript
"log4js": {
            "appenders": [
                {
                    "category": "testHttpRequest",
                    "type": "console"
                },
                {
                    "category": "testHttpRequest",
                    "type": "logLevelFilter",
                    "level": "ERROR",
                    "maxLevel": "FATAL",
                    "appender": {
                        "type": "http-request-appender",
                        "httpRequest": {
                            "endpoint": "http://localhost:3030/api/sendmail",
                            "method": "POST",
                            "contentType": "application/x-www-form-urlencoded"
                        },
                        "params": {
                            "to": "blah@blah.com",
                            "format": "3",
                            "subject": "Test",
                            "metadata": ""
                        },
                        "paramUsedToSendLoggingEvent": "metadata"
                    }
                }
            ],
            "level": "TRACE"
        }
```
