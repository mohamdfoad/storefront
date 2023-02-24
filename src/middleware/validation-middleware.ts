import { NextFunction, Request, Response } from 'express'
import { body, param, validationResult } from 'express-validator'

//users Validation Rules

export const userBodyValidationRules = [
  body('username')
    .exists()
    .withMessage('username is required!')
    .notEmpty()
    .withMessage('username cannot be empty!')
    .isLength({ max: 25 })
    .withMessage('User`s user name MAX length is 25!'),

  body('password')
    .exists()
    .withMessage('password is required!')
    .notEmpty()
    .withMessage('password cannot be  empty!')
    .isLength({ max: 255 })
    .withMessage('password MAX length is 255!'),

  body('first_name')
    .exists()
    .withMessage('first name is required!')
    .notEmpty()
    .withMessage('first name is empty!')
    .isLength({ max: 50 })
    .withMessage('first name MAX length is 50!'),

  body('last_name')
    .exists()
    .withMessage('last name is required!')
    .notEmpty()
    .withMessage('last name is empty!')
    .isLength({ max: 50 })
    .withMessage('last name MAX length is 50'),
]

export const userAuthenticateBodyValidationRules = [
  body('username')
    .exists()
    .withMessage('User name is required')
    .notEmpty()
    .withMessage('User name is empty')
    .isLength({ max: 25 })
    .withMessage('User name MAX length is 25'),

  body('password')
    .exists()
    .withMessage('User`s password is required')
    .notEmpty()
    .withMessage('User`s password is empty')
    .isLength({ max: 255 })
    .withMessage('User`s password MAX length is 255'),
]

export const userParamsValidationRules = [
  param('userid')
    .isNumeric()
    .withMessage(' user_id must be integer')
    .exists()
    .withMessage(' user_id is required')
    .notEmpty()
    .withMessage(' user_id is empty'),
]

//Product validation Rules
export const productBodyValidationRules = [
  body('product_name')
    .exists()
    .withMessage('Product`s name is required')
    .notEmpty()
    .withMessage('Product`s name is empty')
    .isLength({ max: 255 })
    .withMessage('Product`s name MAX length is 255'),

  body('price')
    .exists()
    .withMessage('Product`s price is required')
    .notEmpty()
    .withMessage('Product`s price is empty')
    .toFloat()
    .isNumeric()
    .withMessage('Product`s price must be a number')
    .isFloat({ min: 0.25 })
    .withMessage('Product`s price MIN value is 0.25 <a quarter>'),
]

export const productParamsValidationRules = [
  param('id')
    .isNumeric()
    .withMessage('Product`s ID is NOT numeric')
    .exists()
    .withMessage('Product`s ID is required')
    .notEmpty()
    .withMessage('Product`s ID is empty'),
]

//Order Validation Rules
export const orderBodyValidationRules = [
  body('user_id')
    .isNumeric()
    .withMessage('Order`s user_id is NOT numeric!')
    .exists()
    .withMessage('Order`s user_id is required!')
    .notEmpty()
    .withMessage('Order`s user_id is empty!'),
]

export const orderStatusBodyValidationRules = [
  body('completed')
    .exists()
    .withMessage('completed status is required')
    .notEmpty()
    .withMessage('completed status cannot be empty')
    .isBoolean()
    .withMessage('completed status must be a boolean (true or false)'),
  body('order_id')
    .exists()
    .withMessage('order_id is required')
    .notEmpty()
    .withMessage('order_id cannot be empty')
    .isNumeric()
    .withMessage('Order_id must be number'),
]

export const orderParamsValidationRules = [
  param('id')
    .exists()
    .withMessage('Order id is required')
    .isNumeric()
    .withMessage(' Order id must be integer')
    .notEmpty()
    .withMessage(' Order id cannot be empty'),
]
export const orderProductBodyValidationRules = [
  body('product_id_fk')
    .isNumeric()
    .withMessage(' product id must be integer')
    .exists()
    .withMessage(' product id is required')
    .notEmpty()
    .withMessage(' product id cannot be empty'),

  body('quantity')
    .exists()
    .withMessage('Product`s quantity is required')
    .notEmpty()
    .withMessage('Product`s quantity is empty')
    .toInt()
    .isNumeric()
    .withMessage('Product`s quantity must be a number')
    .isInt({ min: 1 })
    .withMessage('Product`s quantity must be 1 or greater'),
]
export const order_userParamsValidationRules = [
  param('id')
    .isNumeric()
    .withMessage(' user_id must be integer')
    .exists()
    .withMessage(' user_id is required')
    .notEmpty()
    .withMessage(' user_id is empty'),
]

export const checkFunc = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = validationResult(req).formatWith(({ msg }) => msg)
  const hasError = !error.isEmpty()
  if (hasError) {
    res.status(422)
    res.json({ error: error.array() })
  } else {
    next()
  }
}
