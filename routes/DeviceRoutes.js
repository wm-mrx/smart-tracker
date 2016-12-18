"use strict";
const express_1 = require("express");
const config_1 = require("../utils/config");
const DeviceController_1 = require("../controllers/DeviceController");
const Auth_1 = require("../utils/Auth");
var router = express_1.Router();
var url = config_1.default('service_url');
router.get(url + 'device/find', Auth_1.default, (req, res) => {
    DeviceController_1.default.find(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.get(url + 'device/findAll', Auth_1.default, (req, res) => {
    var query = JSON.parse(req.query.query);
    DeviceController_1.default.findAll(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.get(url + 'device/findAllAndCount', Auth_1.default, (req, res) => {
    var query = JSON.parse(req.query.query);
    DeviceController_1.default.findAllAndCount(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.post(url + 'device/save', Auth_1.default, (req, res) => {
    DeviceController_1.default.save(req.body).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.delete(url + 'device/delete', Auth_1.default, (req, res) => {
    DeviceController_1.default.delete(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=DeviceRoutes.js.map