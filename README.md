# (TEM) - Trivago Event Management App

This app is intended to manage the trivago events which can be held in different locations.


## Running Locally

1. Ensure you are in the `tem` working directory.
2. Install packages: `yarn`
3. Start local dev server with hot reloading _(Defaults to [http://localhost:3000])_: `yarn dev`
4. Above mentioned command will execute both client and server.

### Running Tests
1. Ensure you are in the `tem` working directory.
2. Run `npm t`. _This will exit with Code 0 if no tests are written_

### Run Build
1. Ensure you are in the `tem` working directory.
2. Run `yarn build`.

## Add a new icon to 'TEM' font-set

1. Go to [https://icomoon.io/app/#/projects](https://icomoon.io/app/#/projects) to import a new project.
2. Import ```/src/assets/fonts/selection.json``` file into icomoon. This is the backup for the iconset project file. 
3. Load the new project. You should see now all our icons.
4. Import into that set your new exported and uncolored SVG.
5. Select the new font (and the rest if needed) and click on 'Generate Font'.
6. If icomoon doesn't throw any error, hit on download. This process will download a zip.
7. Replace iconfont files and ```selection.json``` in ```/src/assets/fonts``` folder with the new one from zip.
8. Replace content of ```src/assets/base/_iconography.scss``` with content of ```style.scss``` from zip.
9. Update icon variables in ```src/assets/base/_variables.scss``` with values of ```variables.scss``` from zip.

### Acknowledgements
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
