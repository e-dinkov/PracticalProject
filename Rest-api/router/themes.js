const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { themeController, postController, playerController } = require('../controllers');

// middleware that is specific to this router

router.get('/', playerController.getPlayers);
router.post('/', auth(), playerController.newPlayer);
router.put('/:playerId', auth(), playerController.like);
router.delete('/:playerId', auth(), playerController.deletePlayer);
router.patch('/:playerId', auth(), playerController.editPlayer);
//!these are useless
router.get('/:playerId', playerController.getPlayer);
router.post('/:themeId', auth(), postController.createPost);
router.put('/:themeId', auth(), themeController.subscribe);



// router.get('/my-trips/:id/reservations', auth(), themeController.getReservations);

module.exports = router