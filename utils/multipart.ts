import * as express from 'express';
import * as multer from 'multer';
import * as fs from 'fs';

var storage = multer.diskStorage({

});

export default multer({ storage: storage });