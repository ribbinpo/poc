module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for expo-router
      // https://stackoverflow.com/questions/77869840/how-to-fix-react-native-error-after-updating-expo-to-50-0
      // 'expo-router/babel',
    ],
  };
};
