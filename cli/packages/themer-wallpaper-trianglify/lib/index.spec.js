const { colors } = require('../../colors-default'),
  { render, renderInstructions } = require('./index');

describe('themer trianglify wallpaper', () => {
  it('should allow for specifying sizes', async () => {
    const files = await Promise.all(render(colors, {
      'themer-wallpaper-trianglify-size': '200x200',
    }));
    files.forEach(file => {
      expect(/width="200"/.test(file.contents.toString('utf8'))).toBe(true);
      expect(/height="200"/.test(file.contents.toString('utf8'))).toBe(true);
    });
  });
  it('should allow for specifying variances', async () => {
    const files = await Promise.all(render(colors, {
      'themer-wallpaper-trianglify-size': '100x100',
      'themer-wallpaper-trianglify-variance': '0',
    }));
    files.forEach(file => {
      expect(file.contents.toString('utf8')).toMatchSnapshot();
    });
  });
  it('should list output files', async () => {
    const files = await Promise.all(
      render(
        colors,
        {
          'themer-wallpaper-trianglify-size': '1000x1000',
          'themer-wallpaper-trianglify-variance': '0.5',
        },
      )
    );
    const instructions = renderInstructions(files.map(({ name }) => name));
    expect(instructions).toMatchSnapshot();
  });
});
