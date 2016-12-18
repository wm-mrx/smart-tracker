"use strict";
const express_1 = require("express");
const config_1 = require("../utils/config");
const UserController_1 = require("../controllers/UserController");
const auth_1 = require("../utils/auth");
var router = express_1.Router();
var url = config_1.default('service_url');
router.get(url + 'user/find', auth_1.default, (req, res) => {
    UserController_1.default.find(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.get(url + 'user/findAll', auth_1.default, (req, res) => {
    var query = JSON.parse(req.query.query);
    UserController_1.default.findAll(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.get(url + 'user/findAllAndCount', auth_1.default, (req, res) => {
    var query = JSON.parse(req.query.query);
    UserController_1.default.findAllAndCount(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.post(url + 'user/save', auth_1.default, (req, res) => {
    UserController_1.default.save(req.body).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.delete(url + 'user/delete', auth_1.default, (req, res) => {
    UserController_1.default.delete(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.post(url + 'user/authenticate', (req, res) => {
    UserController_1.default.authenticate(req.body.userName, req.body.password).then(result => {
        req.session['identity'] = { "id": result.id, "name": result.name, "userName": result.userName };
        res.status(200).send(req.session['identity']);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.get(url + 'user/getIdentity', auth_1.default, (req, res) => {
    res.status(200).send(req.session['identity']);
});
router.get(url + 'user/logout', auth_1.default, (req, res) => {
    req.session.destroy((err) => {
        res.status(200).send('Ok');
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=UserRoutes.js.map