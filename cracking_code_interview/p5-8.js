/*

x1과 x2의 포함 관계는 어떻게 되나? 둘 다 inclusive로 하면 되나?

       x1
  |          |            |
   ----|
    startBitOffset     
*/

function onesFromMSB(bits) {
}

function onesFromLSB(bits) {
  return 0xFF >>> (8 - bits);

}

function oneBits(high, low) {
}

function drawLine(screen, width, x1, x2, y) {
  if (x1 > x2) {
    return;
  }
  const bytesPerLine = width / 8;
  const lineOffset = y * bytesPerLine;

  const offsetFrom = (x1 / 8) | 0;
  const startBitOffset = 7 - (x1 % 8);
  const offsetTo = (x2 / 8) | 0;
  const endBitOffset = 7 - (x2 % 8);

  if (offsetFrom == offsetTo) {
    screen[offsetFrom] |= oneBits(startBitOffset, endBitOffset);
    return;
  }

  screen[offsetFrom] |= oneBits(startBitOffset, 0);
  screen[offsetTo] |= onesFromLSB(7, endBitOffset);
  
  for (let i = offsetFrom + 1; i < offsetTo; ++i) {
    screen[i] = 0xFF;
  }  
}
