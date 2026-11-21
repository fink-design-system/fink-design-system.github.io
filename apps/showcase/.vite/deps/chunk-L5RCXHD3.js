// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/ariaCurrentService-YoLNpD5S.js
var currentLocation;
var subscribers = [];
var setCurrentLocation = (location) => {
  currentLocation = location;
  subscribers.forEach((subscriber) => {
    subscriber(location);
  });
};
var onLocationChange = (callback, eager = true) => {
  if (eager && typeof currentLocation === "string") {
    callback(currentLocation);
  }
  subscribers.push(callback);
  return () => {
    const index = subscribers.indexOf(callback);
    if (index >= 0) {
      subscribers.splice(index, 1);
    }
  };
};

export {
  setCurrentLocation,
  onLocationChange
};
//# sourceMappingURL=chunk-L5RCXHD3.js.map
