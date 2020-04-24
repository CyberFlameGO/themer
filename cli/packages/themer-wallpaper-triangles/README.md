# themer-wallpaper-triangles

A wallpaper template for [themer](https://github.com/mjswensen/themer). Here's a preview using [themer's default color set](https://github.com/mjswensen/themer/tree/master/cli/packages/colors-default):

![dark desktop](https://cdn.jsdelivr.net/gh/mjswensen/themer@399430ac7b58691dc436761b1a03614898df92ba/cli/packages/themer-wallpaper-triangles/assets/desktop-dark.svg)

## Installation & usage

Install this module wherever you have `themer` installed:

    npm install themer-wallpaper-triangles

Then pass `themer-wallpaper-triangles` as a `-t` (`--template`) arg to `themer`:

    themer -c my-colors.js -t themer-wallpaper-triangles -o gen

`themer-wallpaper-triangles` will generate SVG wallpapers to the output directory (`gen/` in this example).

The generated files will be listed in `<output dir>/README.md`.

### Default resolutions

By default, `themer-wallpaper-triangles` will output wallpapers at the following sizes:

* 2880 by 1800 (desktop)
* 750 by 1334 (device)

### Custom resolutions

`themer-wallpaper-triangles` adds the following argument to `themer`:

    --themer-wallpaper-triangles-size

to which you would pass `<width>x<height>`. For example, to forego the default resolutions and generate two wallpapers, one 1024 by 768 and one 320 by 960:

    themer -c my-colors.js -t themer-wallpaper-triangles --themer-wallpaper-triangles-size 1024x768 --themer-wallpaper-triangles-size 320x960 -o gen
