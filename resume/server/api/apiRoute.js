/**
 * apiRoute.js
 * API结构路由
 */

import express from 'express';
import moment from 'moment';
import * as CONSTANT from '../../constants/api';
import request from './middleware';

// 创建路由节点
const apiRoute = new express.Router();

// api中转配置
apiRoute.post('/*', (req, res) => {
    let url = `${CONSTANT.HOST}/api${req.url}`;
    request(url, req.body)
        .then((result) => {
            res.json(result);
        });
});

export default apiRoute;
