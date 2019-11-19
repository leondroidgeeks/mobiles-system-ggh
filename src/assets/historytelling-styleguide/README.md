# Historytelling Styleguide

This project contains the styleguide sourcecode for the Historytelling system. The styleguide is based on Bootstrap and uses [SCSS](http://sass-lang.com) as a preprocessor. The preprocessor is run by a webpack project.

## Use the styleguide

Include this styleguide into your own project simply by running

`npm install histoytelling-styleguide --save`

in your project. If your are using a module loader like webpack with a SCSS preprocessor you can just include the `index.scss` file located in `/src/index.scss`. The index file loads bootstrap, adjusted variables and the custom histoytelling styles.  
If you aren't using a preprocessor you can also include the preprocessed CSS file `styles.css` from `/dist`.

## Extend the Styleguide

It may be possible that future projects are going to extend the styleguide. In this case the new styles have to be included into the styleguide project.

The folder `/src/historytelling` includes the custom historytelling styles. All styles for each component are located in one SCSS file. One SCSS file starts with an underscore and is named unique (preferebly with the name of the component where the styles come from).  
Each CSS class inside a component file starts with a unique identifier like `read`. This prevents overwriting other styles. CSS classes are written in [**delimiter-seperated words**](https://en.wikipedia.org/wiki/Naming_convention_%28programming%29#Multiple-word_identifiers). Look through the code for examples.

After new SCSS files have been added these have to be added to the imports at the bottom of the `index.scss` file.

If you want to use the preprocessed `styles.css` make sure to run `npm run dist` in your command line.

Reach out to the IMIS staff at the university to publish the extended styleguide so other project can make use of it.
