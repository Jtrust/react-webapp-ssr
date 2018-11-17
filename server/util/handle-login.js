const router = require('express').Router() // 使用 express.Router 类来创建可安装的模块化路由处理程序
const axios = require('axios')

const baseUrl = 'https://cnodejs.org/api/v1'

router.post('/login', (req, res, next) => {
  axios.post(`${baseUrl}/accesstoken`, {
    accesstoken: req.body.accessToken,
  })
    .then((resp) => {
      if (resp.status === 200 && resp.data.success) {
      // 把登陆信息放入 req.session里，以便下次请求过来能读到
        req.session.user = {
          accessToken: req.body.accessToken,
          loginName: resp.data.loginname,
          id: resp.data.id,
          avatarUrl: resp.data.avatar_url,
        }

        res.json({
          success: true,
          data: resp.data,
        })
      }
    })
    .catch((err) => {
      if (err.response) {
        res.json({
          success: false,
          data: err.response.data,
        })
      } else {
        next(err)
      }
    })
})

module.exports = router
