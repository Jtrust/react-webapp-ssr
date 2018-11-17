const axios = require('axios')
const querystring = require('query-string')

const baseUrl = 'https://cnodejs.org/api/v1'

module.exports = function (req, res) {
  const { path } = req
  const { user = {} } = req.session // 判断是否登录
  const { needAccessToken } = req.query // 是否需要accesstoken

  // 如果请求需要needAccessToken  但是未曾登录
  if (needAccessToken && !user.accessToken) {
    res.status(404).send({
      success: false,
      msg: 'need login',
    })
  }

  const query = Object.assign({}, req.query, {
    accesstoken: needAccessToken && req.method === 'GET' ? user.accessToken : '',
  })
  if (query.needAccessToken) {
    delete query.needAccessToken
  }

  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    data: querystring(Object.assign({}, res.body, {
      accesstoken: needAccessToken && req.method === 'POST' ? user.accessToken : '',
    })),
    hearder: {
      'Content-Type': 'application/x-www-from-urlencoded',
    },
  }).then((resp) => {
    if (resp.status === 200) {
      res.send(resp.data)
    } else {
      res.status(resp.status).send(resp.data)
    }
  }).catch((err) => {
    if (err.response) {
      res.status(500).send(err.response.data)
    } else {
      res.status(500).send({
        success: false,
        msg: '未知错误',
      })
    }
  })
}
