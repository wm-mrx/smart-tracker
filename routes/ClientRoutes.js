"use strict";
const express_1 = require("express");
const config_1 = require("../utils/config");
const ClientController_1 = require("../controllers/ClientController");
const auth_1 = require("../utils/auth");
var router = express_1.Router();
var url = config_1.default('service_url');
router.get(url + 'client/find', auth_1.default, (req, res) => {
    ClientController_1.default.find(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.get(url + 'client/findByDeviceSerial', auth_1.default, (req, res) => {
    ClientController_1.default.findByDeviceSerial(req.query.serial).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.get(url + 'client/findAll', auth_1.default, (req, res) => {
    var query = JSON.parse(req.query.query);
    ClientController_1.default.findAll(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.get(url + 'client/findAllAndCount', auth_1.default, (req, res) => {
    var query = JSON.parse(req.query.query);
    ClientController_1.default.findAllAndCount(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.post(url + 'client/save', auth_1.default, (req, res) => {
    ClientController_1.default.save(req.body).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.delete(url + 'client/delete', auth_1.default, (req, res) => {
    ClientController_1.default.delete(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=ClientRoutes.js.map