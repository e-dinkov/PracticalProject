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
function like(req, res, next) {
    const { playerId } = req.params;
    const { _id: userId } = req.user;
    playerModel.updateOne({ _id: playerId }, { $addToSet: { likes: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Liked successful!' }))
        .catch(next);
}

module.exports = { getPlayers, newPlayer , like};