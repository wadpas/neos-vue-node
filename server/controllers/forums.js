const Forum = require('../models/forum')
const asyncWrapper = require('../middleware/async')

const getForums = asyncWrapper(async (req, res) => {
	const forums = await Forum.find({})
	res.status(200).json({ forums })
})

const createForum = asyncWrapper(async (req, res) => {
	const forum = await Forum.create(req.body)
	res.status(201).json({ forum })
})

const getForum = asyncWrapper(async (req, res) => {
	const { id } = req.params
	const forum = await Forum.findById({ _id: id })
	if (!forum) {
		return res.status(404).json(`Forum ${id} not found`)
	}
	res.status(200).json({ forum })
})
const updateForum = asyncWrapper(async (req, res) => {
	const { id } = req.params
	const forum = await Forum.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidation: true })
	if (!forum) {
		return res.status(404).json(`Forum ${forumId} not found`)
	}
	res.status(200).json({ forum })
})

const deleteForum = asyncWrapper(async (req, res, next) => {
	const { id } = req.params
	const forum = await Forum.findOneAndDelete({ _id: id })
	if (!forum) {
		return next(customError(`No forum with id : ${id}`, 404))
	}
	res.status(200).json({ forum })
})
module.exports = {
	getForums,
	createForum,
	getForum,
	updateForum,
	deleteForum,
}
