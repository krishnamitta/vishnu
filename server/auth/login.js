import request from 'request'
import Cookies from 'cookies'
import logger from '../logger'
const HTTP_OK = 200

export default class Login {
 // authenticate user credentials
  static authenticate(req, res) {
    request.post({
      url: process.env.AUTH_URL,
      form: {
        grant_type: 'password',
        username: req.body.email,
        password: req.body.password
      },
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: process.env.AUTH_KEY
      }
    }, (error, httpResponse, body) => {
      console.log('body..', body);
      if (!error && httpResponse.statusCode == HTTP_OK) {
        const jsonBody = JSON.parse(body)
        const maxAge = jsonBody.expires_in * 1000
        const cookies = new Cookies(req, res)
        cookies.set('access_token', jsonBody.access_token, { httpOnly: false, overwrite: true, maxAge })

        /* eslint no-param-reassign: [0] */
        req.session.cookie.maxAge = maxAge
        req.session.user = body

        res.status(httpResponse.statusCode).setHeader('Content-Type', 'application/json; charset=UTF-8')
        return res.send(body)
      } else {
        logger.error(`login error with status code ${error}..`)
        res.status(500).send(body)
      }
    })
  }

}
