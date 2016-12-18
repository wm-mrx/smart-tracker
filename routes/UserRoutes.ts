import { Router } from 'express';
import config from '../utils/config';
import Controller from '../controllers/UserController';
import auth from '../utils/auth';

var router = Router();
var url = config('service_url');

router.get(url + 'user/find', auth, (req, res) => {
    Controller.find(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.get(url + 'user/findAll', auth, (req, res) => {
    var query = JSON.parse(req.query.query);
    Controller.findAll(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.get(url + 'user/findAllAndCount', auth, (req, res) => {
    var query = JSON.parse(req.query.query);
    Controller.findAllAndCount(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.post(url + 'user/save', auth, (req, res) => {
    Controller.save(req.body).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.delete(url + 'user/delete', auth, (req, res) => {
    Controller.delete(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.post(url + 'user/authenticate', (req, res) => {
    Controller.authenticate(req.body.userName, req.body.password).then(result => {
        req.session['identity'] = { "id": result.id, "name": result.name, "userName": result.userName };
        res.status(200).send(req.session['identity']);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.get(url + 'user/getIdentity', auth, (req, res) => {
    res.status(200).send(req.session['identity']);
});

router.get(url + 'user/logout', auth, (req, res) => {
    req.session.destroy((err) => {
        res.status(200).send('Ok');
    });
});

export default router;