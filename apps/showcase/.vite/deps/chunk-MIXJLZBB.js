// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/tooltip-open-tracking-D3tCiiGP.js
var openTooltips = 0;
var tooltipOpened = () => {
  openTooltips++;
};
var tooltipClosed = () => {
  openTooltips = Math.max(0, openTooltips - 1);
};
var handleCancelOverlay = (event) => {
  if (openTooltips > 0) {
    event.preventDefault();
  }
};
var isTooltipOpen = () => openTooltips > 0;

export {
  tooltipOpened,
  tooltipClosed,
  handleCancelOverlay,
  isTooltipOpen
};
//# sourceMappingURL=chunk-MIXJLZBB.js.map
