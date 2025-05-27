# Jekyll Static Website

This project is a Jekyll static website designed to showcase different sets of thumbnails of images organized into separate tabs. The website includes sections for "wmata," "portraits," "plants," and "mtv," with clickable thumbnails that zoom in on images or animations. The front end is styled using Material UI for a modern and responsive design.

## Project Structure

- **_data/thumbnails.yml**: Configuration for the thumbnails, including paths and metadata for images in each section.
- **_includes/**: Contains reusable HTML components such as the header, footer, and tab navigation.
- **_layouts/**: Layout files for the website, including a default layout and a gallery-specific layout.
- **_posts/**: Directory for Jekyll posts (currently empty).
- **_sass/material-ui.scss**: Imports Material UI styles and customizes them for the website.
- **assets/images/**: Contains images organized into directories for each section.
- **assets/styles/main.scss**: Main styles for the website, complementing Material UI.
- **index.html**: Main entry point of the website, linking to different sections.
- **Gemfile**: Specifies the gems required for the Jekyll site.
- **_config.yml**: Configuration file for Jekyll, defining site settings.
- **README.md**: Documentation for the project.

## Setup Instructions

1. **Clone the Repository**: 
   ```
   git clone <repository-url>
   cd jekyll-website
   ```

2. **Install Dependencies**: 
   Ensure you have Ruby and Bundler installed, then run:
   ```
   bundle install
   ```

3. **Run the Jekyll Server**: 
   Start the Jekyll server to view the website locally:
   ```
   bundle exec jekyll serve
   ```

4. **Access the Website**: 
   Open your web browser and navigate to `http://localhost:4000` to view the website.

## Usage Guidelines

- Add images to the respective directories under `assets/images/` for each section.
- Update `_data/thumbnails.yml` to include metadata and paths for the new images.
- Customize styles in `assets/styles/main.scss` and `_sass/material-ui.scss` as needed.
- Use the `_posts/` directory for any blog entries or updates you wish to include in the site.

## Contributing

Feel free to submit issues or pull requests to improve the website or add new features.