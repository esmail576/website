type Rgba = [number, number, number, number];

export function getShaderColorFromString(
  colorString: string,
  fallback: Rgba = [0, 0, 0, 1],
): Rgba {
  if (typeof colorString !== "string") {
    return fallback;
  }

  if (colorString.startsWith("#")) {
    return hexToRgba(colorString);
  }

  return fallback;
}

function hexToRgba(hex: string): Rgba {
  let value = hex.replace(/^#/, "");
  if (value.length === 3) {
    value = value
      .split("")
      .map((char) => char + char)
      .join("");
  }
  if (value.length === 6) {
    value = `${value}ff`;
  }

  return [
    parseInt(value.slice(0, 2), 16) / 255,
    parseInt(value.slice(2, 4), 16) / 255,
    parseInt(value.slice(4, 6), 16) / 255,
    parseInt(value.slice(6, 8), 16) / 255,
  ];
}
