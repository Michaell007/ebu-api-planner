import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { HttpError } from "../error";
import { JWT_SECRET } from "../../config";
import User from "../../models/user";

export const master = () =>
  passport.authenticate('master', { session: false })

export const token = ({ required } = { required }) => (req, res, next) =>
    passport.authenticate('token', { session: false }, (err, user, info) => {
      if (err || (required && !user)) {
          return res.sendHttpError(new HttpError(401, 'Vous n\'êtes pas autorisé à accéder à cette application'))
      }

      // if (admin_super && user.Role.libelle !== 'ADMIN_SUPER') {
      //     return res.sendHttpError(new HttpError(401, 'Vous n\'êtes pas autorisé à accéder à cette application'))
      // }
  
      req.logIn(user, { session: false }, (err) => {
          if (err) return res.status(401).end()
          next()
      })
    })(req, res, next)

    passport.use('token', new JwtStrategy({
        secretOrKey: JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromExtractors([
          ExtractJwt.fromUrlQueryParameter('access_token'),
          ExtractJwt.fromBodyField('access_token'),
          ExtractJwt.fromAuthHeaderWithScheme('Bearer')
        ])
    }, ({ id }, done) => {
      User.findById(id).then((user) => {
        done(null, user)
        return null
      }).catch(done)
    })
)
  
