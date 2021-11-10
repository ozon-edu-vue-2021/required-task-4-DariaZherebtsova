export default function debounce(f, ms) {
  let isCooldown = false;
  let lastArgs = null;

  return function (args) {
    if (isCooldown) {
      lastArgs = args;
      return;
    }
    f(args);
    lastArgs = args;
    isCooldown = true;
    setTimeout(() => {
      isCooldown = false;
      f(lastArgs);
    }, ms);
  };
}
