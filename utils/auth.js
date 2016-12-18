"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    if (!req.session['identity']) {
        return res.status(401).send('You are not logged in');
    }
    return next();
};
//# sourceMappingURL=auth.js.map