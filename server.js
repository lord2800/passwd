var express = require('express'),
	morgan = require('morgan');

var app = module.exports = express();
app.use(morgan('dev'));
app.use(express.static('public'));

app.listen(process.env.PORT || 3000);
