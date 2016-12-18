import { Router } from 'express';
import config from '../utils/config';
import Controller from '../controllers/PositionController';
import auth from '../utils/auth';

var router = Router();
var url = config('service_url');

router.get(url + 'position/find', auth, (req, res) => {
    Controller.find(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.get(url + 'position/findByClient', auth, (req, res) => {
    Controller.findByClient(req.query.clientId).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.get(url + 'position/findAll', auth, (req, res) => {
    var query = JSON.parse(req.query.query);
    Controller.findAll(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.get(url + 'position/findAllAndCount', auth, (req, res) => {
    var query = JSON.parse(req.query.query);
    Controller.findAllAndCount(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.post(url + 'position/save', auth, (req, res) => {
    Controller.save(req.body).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.delete(url + 'position/delete', auth, (req, res) => {
    Controller.delete(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

export default router;