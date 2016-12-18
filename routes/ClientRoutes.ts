import { Router } from 'express';
import config from '../utils/config';
import Controller from '../controllers/ClientController';
import auth from '../utils/Auth';

var router = Router();
var url = config('service_url');

router.get(url + 'client/find', auth, (req, res) => {
    Controller.find(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.get(url + 'client/findByDeviceSerial', auth, (req, res) => {
    Controller.findByDeviceSerial(req.query.serial).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.get(url + 'client/findAll', auth, (req, res) => {
    var query = JSON.parse(req.query.query);
    Controller.findAll(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.get(url + 'client/findAllAndCount', auth, (req, res) => {
    var query = JSON.parse(req.query.query);
    Controller.findAllAndCount(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.post(url + 'client/save', auth, (req, res) => {
    Controller.save(req.body).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.delete(url + 'client/delete', auth, (req, res) => {
    Controller.delete(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

export default router;