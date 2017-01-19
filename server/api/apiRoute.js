/**
 * apiRoute.js
 * API结构路由
 */

import express from 'express';
import moment from 'moment';
import * as CONSTANT from '../../constants/api';
import HTTP_RESULT from '../../constants/protocol';
import REPLY_DATA from '../../constants/replyData';
import request from './middleware';

// 创建路由节点
const apiRoute = new express.Router();

/**
 * 错误处理
 * @param  {string} error 错误信息
 * @return {object}       约定的格式对象
 */
function handleError(error) {
    let errorText = error ? error.toString() : '未知错误';

    console.log(`出现错误: ${errorText},出现时间: ${moment().format()}`);

    return Object.assign({}, REPLY_DATA, {
        code: HTTP_RESULT.FAILURE,
        data: {
            message: errorText
        }
    });
}

/**
 * 获取区县
 */
apiRoute.post('/*', (req, res) => {
    let url = `${CONSTANT.HOST}/api${req.url}`;
    request(url, req.body)
        .then((result) => {
            res.json(result);
        });
});

export default apiRoute;
