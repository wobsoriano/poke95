import { Howl } from 'howler';

export function titleCase(str) {
  if (!str) return;
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
}

export const roundOff = num => Math.round((num + Number.EPSILON) * 100) / 100;

export const startupSound = () => {
  return new Howl({
    src: [require('../assets/windows95_startup_theme.mp3')],
  });
};
