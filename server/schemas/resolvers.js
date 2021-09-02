const { AuthenticationError } = require('apollo-server-express');
const { User, Requestapp } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('requestapps');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('requestapps');
    },
    requestapps: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Requestapp.find(params).sort({ createdAt: -1 });
    },
    requestapp: async (parent, { requestappId }) => {
      return Requestapp.findOne({ _id: requestappId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('requestapps');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addRequestapp: async (parent, { patientText }, context) => {
      if (context.user) {
        const requestapp = await Requestapp.create({
           patientText,
           patientName: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { requestapps: requestapp._id } }
        );

        return requestapp;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { requestappId, commentText }, context) => {
      if (context.user) {
        return Requestapp.findOneAndUpdate(
          { _id: requestappId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeRequestapp: async (parent, { requestappId }, context) => {
      if (context.user) {
        const requestapp = await Requestapp.findOneAndDelete({
          _id: requestappId,
          patientName: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { requestapps: requestapp._id } }
        );

        return requestapp;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { requestappId, commentId }, context) => {
      if (context.user) {
        return Requestapp.findOneAndUpdate(
          { _id: requestappId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;