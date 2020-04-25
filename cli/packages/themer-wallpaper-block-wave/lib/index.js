const {
  getSizesFromOptOrDefault,
  colorSets: getColorSets,
  deepFlatten,
  listOutputFiles,
} = require('@themer/utils');
const weightedRandom = require('./weighted-random');

const render = (colors, options) => {

  try {
    var sizes = getSizesFromOptOrDefault(options['themer-wallpaper-block-wave-size'], 36);
  }
  catch(e) {
    return [Promise.reject(e.message)];
  }

  const colorWeights = new Map([
    ['accent0', 1],
    ['accent1', 1],
    ['accent2', 1],
    ['accent3', 1],
    ['accent4', 1],
    ['accent5', 1],
    ['accent6', 1],
    ['accent7', 1],
    ['shade0', 0],
    ['shade1', 8],
    ['shade2', 6],
    ['shade3', 4],
    ['shade4', 3],
    ['shade5', 2],
    ['shade6', 1],
    ['shade7', 1],
  ]);

  const colorSets = getColorSets(colors);

  return deepFlatten(
    colorSets.map(colorSet => sizes.map(size => {
      let blockMaxSize = size.s / 3;
      let blockMinSize = blockMaxSize * 2/3;
      let blocks = [];
      for (let i = 0; i < size.w; i += size.s) {
        for (let j = 0; j < size.h; j += size.s) {
          let color = colorSet.colors[weightedRandom(colorWeights)];
          let xPosition = (i + size.s / 2) / size.w;
          let yPosition = (j + size.s / 2) / size.h;
          let positionScaleFactor = Math.abs(xPosition - yPosition);
          let blockSize = blockMaxSize - (blockMaxSize - blockMinSize) * positionScaleFactor;
          let padding = (size.s - blockSize) / 2;
          blocks.push({
            x: i + padding,
            y: j + padding,
            w: blockSize,
            h: blockSize,
            c: color,
            g: Math.random() < 0.01,
          });
        }
      }
      return { size: size, blocks: blocks };
    }).map(svgData => Promise.resolve({
      name: `themer-wallpaper-block-wave-${colorSet.name}-${svgData.size.w}x${svgData.size.h}.svg`,
      contents: Buffer.from(`
        <svg xmlns="http://www.w3.org/2000/svg" width="${svgData.size.w}" height="${svgData.size.h}" viewBox="0 0 ${svgData.size.w} ${svgData.size.h}">
          <defs>
            <linearGradient id="overlay" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${colorSet.colors.shade0}"/>
              <stop offset="50%" stop-color="${colorSet.colors.shade0}" stop-opacity="0"/>
              <stop offset="100%" stop-color="${colorSet.colors.shade0}"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect x="0" y="0" width="${svgData.size.w}" height="${svgData.size.h}" fill="${colorSet.colors.shade0}" />
          ${svgData.blocks.map(block => `<rect x="${block.x}" y="${block.y}" width="${block.w}" height="${block.h}" fill="${block.c}" rx="2" ry="2" ${block.g ? 'filter="url(#glow)"' : ''} />`).join('\n')}
          <rect x="0" y="0" width="${svgData.size.w}" height="${svgData.size.h}" fill="url(#overlay)"/>
        </svg>
      `, 'utf8'),
    })))
  );

};

module.exports = {
  render,
  renderInstructions: listOutputFiles
};
