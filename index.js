var express = require('express'),
         fs = require('fs'),
       path = require('path'),
      clean = require('var-clean').clean,
        pdf = require('html-pdf'),
    Promise = require('es6-promise').Promise;

(function PDF(res){
    function setHeader(res, filename){
        res.header('Content-Type', 'application/pdf');
        res.header('Content-Disposition', 'inline; filename="' + filename + '"');
        res.header('Content-Transfer-Encoding', 'binary');
    }
    function sendHTMLPDF(res, filename, content, options, reject, resolve){
        setHeader(res, filename);
        pdf.create(content, options).toStream(function(err, stream){
            if(err){
                reject(err);
            }else{
                stream.pipe(res);
                stream.on('end', function(){
                    res.end();
                    resolve();
                })
            }
        });
    }
    res.pdf = function(filename){
        var _this = this;
        return new Promise(function(resolve, reject){
            try{
                fs.statSync(filename);
            }catch(e){
                reject(filename + ' does not exists');
                return;
            }
            setHeader(_this, path.basename(filename));
            var stream = fs.createReadStream(filename);
            stream.pipe(_this);
            stream.on('end', function(){
                _this.end();
                resolve();
            });
            stream.on('error', function(error){
                reject(error);
            });
        });
    };
    res.pdfFromHTML = function(opt) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            opt = opt || {};
            opt.filename = clean.cleanOnlyString(opt.filename) || "file.pdf";
            opt.html = clean.cleanOnlyString(opt.html);
            opt.htmlContent = clean.cleanOnlyString(opt.htmlContent);
            opt.options = opt.options || {};

            if(opt.html !== undefined){
                sendHTMLPDF(_this, opt.filename, fs.readFileSync(opt.html, 'utf-8'), opt.options, reject, resolve);
            }else if(opt.htmlContent !== undefined){
                sendHTMLPDF(_this, opt.filename, opt.htmlContent, opt.options, reject, resolve);
            }else{
                reject('html and htmlContent not set');
            }
        });
    };
})(express.response);

exports = module.exports = function(){ return function(req, res, next){ next(); } };
