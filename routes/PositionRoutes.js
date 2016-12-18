"use strict";
const express_1 = require("express");
const config_1 = require("../utils/config");
const PositionController_1 = require("../controllers/PositionController");
const Auth_1 = require("../utils/Auth");
var router = express_1.Router();
var url = config_1.default('service_url');
router.get(url + 'position/find', Auth_1.default, (req, res) => {
    PositionController_1.default.find(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.get(url + 'position/findByClient', Auth_1.default, (req, res) => {
    PositionController_1.default.findByClient(req.query.clientId).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.get(url + 'position/findAll', Auth_1.default, (req, res) => {
    var query = JSON.parse(req.query.query);
    PositionController_1.default.findAll(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.get(url + 'position/findAllAndCount', Auth_1.default, (req, res) => {
    var query = JSON.parse(req.query.query);
    PositionController_1.default.findAllAndCount(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.post(url + 'position/save', Auth_1.default, (req, res) => {
    PositionController_1.default.save(req.body).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.delete(url + 'position/delete', Auth_1.default, (req, res) => {
    PositionController_1.default.delete(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=PositionRoutes.js.map