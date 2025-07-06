import { Type } from '@sinclair/typebox';

// Schema for creating a user
export const CreateUserSchema = {
  body: Type.Object({
    name: Type.String({ minLength: 1 }),
    email: Type.String({ format: 'email' }),
    password: Type.String({ minLength: 6 })
  }),
  response: {
    201: Type.Object({
      id: Type.String(),
      name: Type.String(),
      email: Type.String(),
      password: Type.String()
    })
  }
};

// Schema for getting a user by ID
export const GetUserByIdSchema = {
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      id: Type.String(),
      name: Type.String(),
      email: Type.String(),
      password: Type.String()
    })
  }
};

// Schema for updating a user
export const UpdateUserSchema = {
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Object({
    name: Type.Optional(Type.String({ minLength: 1 })),
    email: Type.Optional(Type.String({ format: 'email' })),
    password: Type.Optional(Type.String({ minLength: 6 }))
  }),
  response: {
    200: Type.Object({
      id: Type.String(),
      name: Type.String(),
      email: Type.String(),
      password: Type.String()
    })
  }
};

// Schema for deleting a user
export const DeleteUserSchema = {
  params: Type.Object({
    id: Type.String()
  })
};