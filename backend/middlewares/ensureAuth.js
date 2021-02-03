const verifyToken = require('jsonwebtoken').verify
const authConfig = require('../config/auth')

module.exports = {
  ensureAuth(req, resp, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return resp.status(401).json({ error: 'Token de autenticação em falta' })
    }
    /** const [type, token] = authHeader.split(' ');
     *javascript permite que o type seja vazio e
     *somente o token possa ser utilizado(caso contrario)
     *o tipo(e.g Bearer) viria junto.
     */
    const [, token] = authHeader.split(' ')

    try {
      // verificar token
      const decodedToken = verifyToken(token, authConfig.jwt.secret)
      // forcando o decodedToken a ser do tipo TokenPayload(ajuda no intellisense)
      const { sub } = decodedToken
      /**
       *
       * passando o sub do user para o request modificado
       * para que todas os outros middlewares tenham acesso
       * ao id do user
       *
       *  */
      req.usuario = {
        id: sub,
      }
      return next()
    } catch (error) {
      return resp.status(401).json({ error: 'Token inválido' })
    }
  },
}
