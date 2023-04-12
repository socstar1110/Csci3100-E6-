const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
//const xml2json = require('xml-js')
//const parseXml = require('xml-js')
//const convert = require('xml-js')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { name } = require('ejs');
const { count } = require('console');

app.post('/timetable', (req, res)=>{
    res.send('Timetable set-up successfully.');
});

module.exports = app;