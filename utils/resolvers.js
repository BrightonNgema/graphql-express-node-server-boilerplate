const bcrypt = require('bcrypt');
const functions = require("../functions");

module.exports = resolvers = {
  Query: {
    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null
      }
      const user = await User.findOne({ _id: currentUser._id })
      return user
    }
  },
  Mutation: {

    signinUser: async (root, { email, password }, { User }) => {
      email = email.toLowerCase()
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User does not exists')
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid Password')
      }
      return { token: functions.createToken(user, process.env.JWT_SECRET, '1hr') }
    },
    signupUser: async (root, { input }, { User }) => {
      let { firstname, lastname, email, password } = input
      email = email.toLowerCase()
      const user = await User.findOne({ email });
      if (user) {
        throw new Error('User already exists')
      }
      const newUser = await new User({
        ...input,
        password:'password123',
        type:"Admin"
      }).save();

      return { token: functions.createToken(newUser, process.env.JWT_SECRET, '1hr') }
    },
    pay: async (root, { input }) => {
      return await functions.handlePayments(input);
    }
  }
};
