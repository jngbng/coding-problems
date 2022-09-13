function paintFill(canvas, i, j, fromColor, toColor) {
  if (i < 0 || i >= canvas.length) {
    return;
  }
  const row = canvas[i];
  if (j < 0 || j >= row.length) {
    return;
  }
  if (row[j] != fromColor) {
    return;
  }
  row[j] = toColor;
  paintFill(canvas, i - 1, j, fromColor, toColor);
  paintFill(canvas, i + 1, j, fromColor, toColor);
  paintFill(canvas, i, j - 1, fromColor, toColor);
  paintFill(canvas, i, j + 1, fromColor, toColor);
}
