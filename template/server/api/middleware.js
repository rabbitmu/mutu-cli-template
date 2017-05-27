/**
 * 中转请求
 */

import rp from '../requestProxy'

export default function request(url, body) {
    return rp.post(url, body)
}
