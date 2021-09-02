const db = require('../config/connection');
const { User, Requestapp } = require('../models');
const userSeeds = require('./userSeeds.json');
const RequestappSeeds = require('./RequestappSeeds.json');

db.once('open', async () => {
  try {
    await Requestapp.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < RequestappSeeds.length; i++) {
      const { _id, patientName } = await Requestapp.create(RequestappSeeds[i]);
      const User = await User.findOneAndUpdate(
        { username: patientName },
        {
          $addToSet: {
            requestapps: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
