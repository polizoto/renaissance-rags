const { AuthenticationError } = require('apollo-server-express');
const { User, Costume, Category, Order, Vendor } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    vendors: async () => {
      return await Vendor.find();
    },
    costumes: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Costume.find(params).populate('category').populate('vendor');
    },
    costume: async (parent, { _id }) => {
      return await Costume.findById(_id).populate('category').populate('vendor');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.costumes',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.costumes',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ costumes: args.costumes });
      const line_items = [];

      const { costumes } = await order.populate('costumes').execPopulate();

      for (let i = 0; i < costumes.length; i++) {
    
        // problem occurs here
           const costume = await stripe.costumes.create({
            name: costumes[i].name,
            description: costumes[i].description,
            images: [`${url}/images/${costumes[i].image}`]
          });
          

        const price = await stripe.prices.create({
          costume: costume.id,

          unit_amount: costumes[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });
      console.log(session)
      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { costumes }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ costumes });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateCostume: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Costume.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true }.populate('category').populate('vendor'));
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
