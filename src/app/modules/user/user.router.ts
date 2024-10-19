import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserValidations } from './user.validation';

const router = express.Router();

router.get("/", UserControllers.getAllUsers);

router.get("/:userId", UserControllers.getUserById);

router.put("/:userId", auth('user', 'admin'), validateRequest(UserValidations.updateUserValidationSchema), UserControllers.updateUser);

// delete user: Delete user's posts, comments of that posts & user's comments before deleting user.

// follow a user

// unfollow a user

// make user admin

export const UserRoutes = router;