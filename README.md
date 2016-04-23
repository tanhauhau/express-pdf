# express-pdf

[![Build Status](https://travis-ci.org/tanhauhau/express-pdf.svg?branch=master)](https://travis-ci.org/tanhauhau/express-pdf)
[![npm version](https://badge.fury.io/js/express-pdf.svg)](https://badge.fury.io/js/express-pdf)
[![Dependency status](https://david-dm.org/tanhauhau/express-pdf.svg)](https://david-dm.org)
[![Downloads](https://img.shields.io/npm/dt/express-pdf.svg)](https://www.npmjs.com/package/express-pdf)
[![Donate](https://img.shields.io/gratipay/user/tanhauhau.svg)](https://gratipay.com/~tanhauhau/)

## Installation

```bash
npm install --save express-pdf
```

```javascript
var express = require('express'),
        app = express(),
        pdf = require('express-pdf');

//previously app.use(pdf())
app.use(pdf); // or you can app.use(require('express-pdf'));

app.use('/pdfFromHTML', function(req, res){
    res.pdfFromHTML({
        filename: 'generated.pdf',
        html: path.resolve(__dirname, './template.html'),
        options: {...}
    });
});

app.use('/pdfFromHTMLString', function(req, res){
    res.pdfFromHTML({
        filename: 'generated.pdf',
        htmlContent: '<html><body>ASDF</body></html>',
        options: {...}
    });
});

app.use('/pdf', function(req, res){
    res.pdf(path.resolve(__dirname, './original.pdf'));
})
```

## Options

This library is built on top of [html-pdf](https://www.npmjs.com/package/html-pdf).

Read [this](https://www.npmjs.com/package/html-pdf#options) for the full list of options available when generating the pdf from html.

## License

The MIT License (MIT)

Copyright (c) 2016 Tan Li Hau

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
