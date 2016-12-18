export default (req, res, next) => {
    if (!req.session['identity']) {
        return res.status(401).send('You are not logged in');
    }

    return next();
}