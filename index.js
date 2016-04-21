var express = require('express'),
         fs = require('fs'),
       path = require('path'),
      clean = require('var-clean').clean,
        pdf = require('html-pdf'),
    Promise = require('es6-promise').Promise;

function PDF(req, res, next){
    function setHeader(res){
        res.header('Content-Type', 'application/pdf');
        res.header('Content-Disposition', 'inline; filename="' + opt.filename + '"');
        res.header("Content-Transfer-Encoding: binary");
    }
    res.pdf = function(filename){
        setHeader(this);
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
                setHeader(_this);
                var html = fs.readFileSync(opt.html, 'utf-8');
                pdf.create(html).toStream(function(err, stream){
                    if(err){
                        reject(err);
                    }else{
                        stream.pipe(_this);
                        resolve();
                    }
                });
            }else if(opt.htmlContent !== undefined){
                pdf.create(opt.htmlContent).toStream(function(err, stream){
                    if(err){
                        reject(err);
                    }else{
                        stream.pipe(_this);
                        resolve();
                    }
                });
            }else{
                reject('html and htmlContent not set');
            }
        });
    };
    next();
};
exports = module.exports = function(){ return PDF };
