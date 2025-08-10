const playerModel = require("../models/playerModel");

function getPlayers(req, res,next) {
    playerModel.find()
        .populate('userId')
        .then(players => res.json(players))
        .catch(next);
}
function newPlayer(req, res, next) {
    const { name, team, height, weight, description,photo } = req.body;
    const { _id: userId } = req.user;
 playerModel.create({ name, team, height, weight, description,photo, userId })
        .then(player => res.status(200).json(player))
        .catch(next);
}

module.exports = { getPlayers, newPlayer };