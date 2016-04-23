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

    it('should return a resolved promise', function(done){
        var app = express(), server;
        app.use(pdf);
        app.get('/test/3', function(req, res){
            var promise = res.pdf(path.resolve(__dirname, './fixture/test.pdf'));

            expect(promise).not.toBeUndefined();
            expect(promise).toEqual(jasmine.any(Promise));
            promise.then(function(){
                expect(true).toEqual(true);
                finish();
            }, function(){
                expect('should not call catch').toBe(true);
                finish();
            });
        });
        server = app.listen(8888);

        function finish(){
            done();
            server.close();
        }
        http.get('http://127.0.0.1:8888/test/3', function(res){
        });
    });

    it('should return a resolved promise', function(done){
        var app = express(), server;
        app.use(pdf);
        app.get('/test/4', function(req, res){
            var promise = res.pdfFromHTML({
                filename: 'file.pdf',
                html: path.resolve(__dirname, './fixture/test.html')
            });

            expect(promise).not.toBeUndefined();
            expect(promise).toEqual(jasmine.any(Promise));

            promise.then(function(){
                expect(true).toEqual(true);
                finish();
            }, function(){
                expect('should not call catch').toBe(true);
                finish();
            });
        });
        server = app.listen(8888);

        function finish(){
            done();
            server.close();
        }
        http.get('http://127.0.0.1:8888/test/4', function(res){
        });
    });

    it('should return a rejected promise', function(done){
        var app = express(), server;
        app.use(pdf);
        app.get('/test/6', function(req, res){
            var promise = res.pdf(path.resolve(__dirname, './fixture/missing.pdf'));
            expect(promise).not.toBeUndefined();
            expect(promise).toEqual(jasmine.any(Promise));

            promise.then(function(){
                expect('then should not be called').toBe(true);
                finish();
            }, function(error){
                expect(true).toBe(true);
                expect(error).not.toBeUndefined();
                expect(error).toMatch(/missing\.pdf does not exists$/);
                finish();
            });
        });
        server = app.listen(8888);

        function finish(){
            done();
            server.close();
        }
        http.get('http://127.0.0.1:8888/test/6', function(res){
        });
    });

    it('should return a rejected promise', function(done){
        var app = express(), server;
        app.use(pdf);
        app.get('/test/7', function(req, res){
            var promise = res.pdfFromHTML({
                filename: 'file.pdf',
                html: path.resolve(__dirname, './fixture/missing.html')
            });
            expect(promise).not.toBeUndefined();
            expect(promise).toEqual(jasmine.any(Promise));

            promise.then(function(){
                expect('then should not be called').toBe(true);
                finish();
            }, function(error){
                expect(true).toBe(true);
                expect(error).not.toBeUndefined();
                expect(error).toMatch(/missing\.html does not exists$/);
                finish();
            });
        });
        server = app.listen(8888);

        function finish(){
            done();
            server.close();
        }
        http.get('http://127.0.0.1:8888/test/7', function(res){
        });
    });

    it('should return a rejected promise', function(done){
        var app = express(), server;
        app.use(pdf);
        app.get('/test/7', function(req, res){
            var promise = res.pdfFromHTML({
                filename: 'file.pdf',
            });
            expect(promise).not.toBeUndefined();
            expect(promise).toEqual(jasmine.any(Promise));

            promise.then(function(){
                expect('then should not be called').toBe(true);
                finish();
            }, function(error){
                expect(true).toBe(true);
                expect(error).not.toBeUndefined();
                expect(error).toMatch(/^html and htmlContent not set$/);
                finish();
            });
        });
        server = app.listen(8888);

        function finish(){
            done();
            server.close();
        }
        http.get('http://127.0.0.1:8888/test/7', function(res){
        });
    });
});
