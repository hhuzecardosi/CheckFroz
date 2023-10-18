import {t} from "elysia"

export const RegisterDto = t.Object({
    email: t.String({format: 'email'}),
    password: t.String({minLength: 8}),
    confirm_password: t.String({minLength: 8})
  },
  {
    description: 'Expected information to register'
  });

export const LoginDto = t.Object({
  email: t.String({format: 'email'}),
  password: t.String()
})

export const AuthSuccessResponseDto = t.Object({});

export const AuthUnauthorizedResponseDto = t.Object({});