const hex = (x, y) => {
  // return `<use xlink:href="#pod" transform="translate(${x}, ${y})" />`;
  return `<polygon class="hex" stroke="#000000" stroke-width="0.5" points="5,-9 -5,-9 -10,0 -5,9 5,9 10,0" fill="black" fill-opacity="0" transform="translate(${x}, ${y})" />`;
};

let selectedColor = '#FFFFFF';

//map tab button clicks
document.querySelector('.button_alt').addEventListener('click', () => {
  document.querySelector('.map').classList.remove('biome');
  document.querySelector('.map').classList.add('altitude');
});
document.querySelector('.button_biome').addEventListener('click', () => {
  document.querySelector('.map').classList.remove('altitude');
  document.querySelector('.map').classList.add('biome');
});

document.querySelectorAll('.hex_group').forEach((element) => {
  element.addEventListener('click', (e) => {
    if (e.path[1].classList.contains('selected')) {
      e.path[1].classList.remove('selected');
    } else {
      e.path[1].classList.add('selected');
    }
  });
});

//generate a hex grid for the map
// let out = '';
// for (a = 0, b = 66; a <= b; a++) {
//   for (c = 0, d = 55; c <= d; c++) {
//     out += hex(a * 30, 18 * c);
//   }
// }

// for (a = 0, b = 66; a <= b; a++) {
//   for (c = 0, d = 55; c <= d; c++) {
//     out += hex(a * 30 + 15, 18 * c + 9);
//   }
// }
// document.querySelector('#hexes').innerHTML = out;

//convert hexes to be fixed points (not translated ones)
/* document.querySelectorAll('.hex').forEach((element) => {
  let path = [5, -9, -5, -9, -10, 0, -5, 9, 5, 9, 10, 0];

  let str = element.getAttribute('transform');
  str = str.slice(10);
  str = str.substring(0, str.length - 1);
  str = str.split(',');
  str[0] = str[0] * 1;
  str[1] = str[1] * 1;

  for (a = 0, b = path.length; a < b; a++) {
    if ((a + 1) % 2 == 1) {
      path[a] = path[a] + str[0];
    } else {
      path[a] = path[a] + str[1];
    }
  }

  let out = '';
  for (a = 0, b = path.length; a < b; a++) {
    if ((a + 1) % 2 == 1) {
      out += `${path[a]}, ${path[a + 1]}`;
    } else {
      out += ' ';
    }
  }

  element.setAttribute('transform', '');
  element.setAttribute('points', out);
}); */

// document.querySelector('#hexes').style.display = 'none';

//click to colour
// document.querySelectorAll('.hex').forEach((element) => {
//   element.addEventListener('click', (e) => {
//     // e.path[0].classList.remove('altitude');

//     if (e.path[0].classList.contains('selected')) {
//       e.path[0].classList.remove('selected');
//     } else {
//       e.path[0].classList.add('selected');
//     }

//     e.path[0].style.fill = selectedColor;
//     // e.path[0].style.fillOpacity = '0.5';
//   });
// });

//set up the colours on the buttons
// document.querySelectorAll('.button_color').forEach((color) => {
//   color.style.backgroundColor = color.getAttribute('data-color');
//   color.addEventListener('click', (e) => {
//     selectedColor = e.path[0].getAttribute('data-color');
//   });
// });
