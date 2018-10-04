Eatee
=====================

Mobile app for consumers to swipe on food deals and restaurants to make advertisements.

### Final Product

!["Eatee UI"](https://github.com/zhouism/eatee-app/blob/master/docs/eatee-restaurant.gif)
!["Eatee Swipe"](https://github.com/zhouism/eatee-app/blob/master/docs/swipe_deck_ios.gif)
!["Eatee Redeem"](https://github.com/zhouism/eatee-app/blob/master/docs/redeem_ios.gif)

## Built With

React Native, Expo, Redux, Yelp API, FacebookAU, AWS S3, Express, Node, Knex and PSQL

## Getting Started

1. Clone this repository
2. Clone the eatee-server here: https://github.com/tienhoah/eatee-server
3. Navigate to eatee-app and install all dependencies by running ``npm install``
4. Navigate to eatee-server and install all dependencies by running ``npm install``
5. In a .env file in the root directory of the eatee-app repository add your AWS S3 credentials and your local IP address
6. In the eatee-server repository intiate a psql database called eatee, run knex migrate:rollback, knex migrate:latest and knex seed:run to seed the database on psql
7. Download Expo Client on your cellphone and get ready to start eatee!

## Run the servers

1. In a terminal window, navigate to eatee-app and run ``expo start``
2. In a separate terminal window, navigate to eatee-server and run ``PORT=3001 npm start``
3. Android Users - scan the QR code and start the application
4. iOS Users - press ``e`` in the terminal window of the eatee-app and send a link to your cellphone - then run the application
5. Congratulations you can now start swiping on food deals or make ads!

### Dependencies

  "dependencies": {
    "@expo/samples": "2.1.1",
    "aws-sdk": "^2.322.0",
    "axios": "^0.18.0",
    "expo": "^30.0.1",
    "lodash": "^4.17.11",
    "moment": "^2.22.2",
    "react": "16.3.1",
    "react-native": "https://github.com/expo/react-native/archive/sdk-30.0.0.tar.gz",
    "react-native-aws3": "0.0.8",
    "react-native-card-stack-swiper": "^1.0.8",
    "react-native-deck-swiper": "^1.5.18",
    "react-native-elements": "^0.19.1",
    "react-native-image-crop-picker": "^0.21.2",
    "react-native-image-picker-form": "^0.2.5",
    "react-native-masked-text": "^1.9.1",
    "react-native-material-cards": "^1.0.9",
    "react-native-progress": "^3.5.0",
    "react-native-search-bar": "^3.4.2",
    "react-native-search-box": "0.0.19",
    "react-native-swipe-cards": "^0.1.1",
    "react-native-swiper-animated": "^1.5.1",
    "react-native-tinder-navigator": "^0.1.2",
    "react-native-typography": "^1.4.0",
    "react-native-vector-icons": "^5.0.0",
    "react-navigation": "^2.16.0",
    "react-redux": "^5.0.7",
    "redux": "^4.0.0",
    "redux-thunk": "^2.3.0",
    "tcomb-form-native": "^0.6.18"
  },
  "devDependencies": {
    "jest-expo": "30.0.0",
    "react-native-dotenv": "^0.2.0"
  }
