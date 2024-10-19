import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserValidations } from './user.validation';

const router = express.Router();

router.get("/", UserControllers.getAllUsers);

router.get("/:userId", UserControllers.getUserById);

router.put("/:userId", auth('user', 'admin'), validateRequest(UserValidations.updateUserValidationSchema), UserControllers.updateUser);

router.delete("/:userId", auth('user', 'admin'), UserControllers.deleteUser);

router.put("/:userId/follow", auth('user', 'admin'), UserControllers.followUser);

// unfollow a user
router.put("/:userId/unfollow", auth('user', 'admin'), UserControllers.unfollowUser);

// make user admin

export const UserRoutes = router;