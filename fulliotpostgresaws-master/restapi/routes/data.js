var express = require('express');
var router = express.Router();
var DB = require('../db/db').db;
var DB_Sequalize = require('../db/db').sequelize;
var Data = DB.data;
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var QueryTypes = Sequelize.QueryTypes;
require('dotenv').config({ path: "../../.env" });

router.get('/', function(req, res, next) {
    Data.findOne({
        order: [
            ['createdAt', 'DESC']
        ],
    }).then(function(reg) {
        res.status(200).json({
            data: reg,
            limits: {
                tension: [
                    { min: 0, max: 180, color: "#ee1f25" },
                    { min: 180, max: 200, color: "#fdae19" },
                    { min: 200, max: 240, color: "#0f9747" },
                    { min: 240, max: 250, color: "#fdae19" },
                    { min: 250, max: 300, color: "#ee1f25" }
                ],
                current: [
                    { min: 0, max: 80, color: "#0f9747" },
                    { min: 80, max: 100, color: "#ee1f25" }
                ]
            }
        });
    }).catch(error => {
        res.status(500).send(error.message);
    });
});

router.post('/', function(req, res, next) {
    if (!req.get('Authorization') || req.get('Authorization') !== process.env.TOKEN) {
        res.status(403).send('Request header is missing!');
    } else if (!req.body) {
        res.status(400).send('Request body is missing!');
    } else {
        Data.create(req.body).then(function(data) {
            res.status(200).json(data);
        }).catch(error => {
            res.status(500).send(error.message);
        });
    }
});

router.get('/energy', async function(req, res, next) {

    try {
        const query = `(select "Energia_Activa", extract(YEAR from "createdAt") as year from data where extract(MONTH from "createdAt") = ? order by "createdAt" desc limit 1) 
        union (select "Energia_Activa", extract(YEAR from "createdAt") as year from data where extract(MONTH from "createdAt") = ? order by "createdAt" asc limit 1)`;

        var month = new Date().getMonth();
        var energyArray = new Array();
        for (var i = 0; i < 12; i++) {
            var realMonth = (month + 1);
            var realMonthS = realMonth.toString();
            var records = await DB_Sequalize.query(
                query, {
                    replacements: [realMonthS, realMonthS],
                    type: QueryTypes.SELECT
                }
            );
            if (records.length > 0) {
                energyArray.push({
                    month: realMonth,
                    year: records[0].year,
                    energy: records[1].Energia_Activa - records[0].Energia_Activa
                });
            }
            month = (month + 11) % 12;
        }
        res.status(200).json(energyArray.reverse());
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/filter/:startdate/:enddate', async function(req, res, next) {

    try {
        var sti = req.params.startdate;
        var stf = req.params.enddate;

        const query = `select * from data where ("createdAt" between ? and ?) and MOD(extract(MINUTE from "createdAt"), ?) = 0
        and extract(SECOND from "createdAt") between 35 and 50  order by "createdAt"`;

        var records = await DB_Sequalize.query(
            query, {
                replacements: [new Date(parseInt(sti)), new Date(parseInt(stf)), 15],
                type: QueryTypes.SELECT
            }
        );

        res.status(200).json(records);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router;