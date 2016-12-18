"use strict";
const express_1 = require("express");
const config_1 = require("../utils/config");
const DeviceController_1 = require("../controllers/DeviceController");
const auth_1 = require("../utils/auth");
var router = express_1.Router();
var url = config_1.default('service_url');
router.get(url + 'device/find', auth_1.default, (req, res) => {
    DeviceController_1.default.find(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.get(url + 'device/findAll', auth_1.default, (req, res) => {
    var query = JSON.parse(req.query.query);
    DeviceController_1.default.findAll(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.get(url + 'device/findAllAndCount', auth_1.default, (req, res) => {
    var query = JSON.parse(req.query.query);
    DeviceController_1.default.findAllAndCount(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.post(url + 'device/save', auth_1.default, (req, res) => {
    DeviceController_1.default.save(req.body).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.delete(url + 'device/delete', auth_1.default, (req, res) => {
    DeviceController_1.default.delete(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=DeviceRoutes.js.map