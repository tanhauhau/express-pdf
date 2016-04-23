var express = require('express'),
       path = require('path'),
       http = require('http'),
    Promise = require('es6-promise').Promise;
        pdf = require('../index.js');

describe("Works perfectly", function(){
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    var server = require('./server.js');

    it('should response valid headers', function(done){
        http.get('http://127.0.0.1:8888/test/1', function(res){
            expect(res.headers['content-type']).toMatch(/^application\/pdf/);
            expect(res.headers['content-disposition']).toMatch(/^inline; filename="test.pdf"/);
            expect(res.headers['content-transfer-encoding']).toMatch(/binary/);
            done();
        });
    });

    it('should response valid headers', function(done){
        http.get('http://127.0.0.1:8888/test/2', function(res){
            expect(res.headers['content-type']).toMatch(/^application\/pdf/);
            expect(res.headers['content-disposition']).toMatch(/^inline; filename="file.pdf"/);
            expect(res.headers['content-transfer-encoding']).toMatch(/binary/);
            done();
        });
    });

    it('should response valid headers', function(done){
        http.get('http://127.0.0.1:8888/test/4', function(res){
            expect(res.headers['content-type']).toMatch(/^application\/pdf/);
            expect(res.headers['content-disposition']).toMatch(/^inline; filename="generated.pdf"/);
            expect(res.headers['content-transfer-encoding']).toMatch(/binary/);
            done();
            server.closeServer();
        });
    });

    it('should return a promise', function(done){
        var app = express(), server;
        app.use(pdf());
        app.get('/test/3', function(req, res){
            var promise = res.pdf(path.resolve(__dirname, './fixture/test.pdf'));

            expect(promise).not.toBeUndefined();
            expect(promise).toEqual(jasmine.any(Promise));

            done();
            server.close();
        });
        server = app.listen(8888);

        http.get('http://127.0.0.1:8888/test/3', function(res){
        });
    });

    it('should return a promise', function(done){
        var app = express(), server;
        app.use(pdf());
        app.get('/test/4', function(req, res){
            var promise = res.pdfFromHTML({
                filename: 'file.pdf',
                html: path.resolve(__dirname, './fixture/test.html')
            });

            expect(promise).not.toBeUndefined();
            expect(promise).toEqual(jasmine.any(Promise));

            done();
            server.close();
        });
        server = app.listen(8888);

        http.get('http://127.0.0.1:8888/test/4', function(res){
        });
    });
});
