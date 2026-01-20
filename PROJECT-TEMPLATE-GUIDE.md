# Project Page Template Guide

This template provides a reusable structure for creating individual project detail pages for your portfolio.

## Files Created

- `project-template.html` - The main project page template
- `project-page.css` - Additional styles specific to project pages

## How to Use

1. **Copy the template file**: Create a new file (e.g., `project-dvd-player.html`) based on `project-template.html`
2. **Replace all placeholders**: Find and replace all `[PLACEHOLDER_NAME]` text with your actual content
3. **Add your images**: Place project images in `/public/assets/` and update the filenames
4. **Update links**: Replace placeholder links with actual project resources

## Placeholder Reference

### Branding Placeholders

- `[BRAND_LOGO_TEXT]` - Your logo text (currently shows "DW" in nav)
- `[BRAND_NAME]` - Your brand/name for footer copyright

### Project Information

- `[PROJECT_NAME]` - The main title of your project
- `[PROJECT_SUBTITLE]` - A brief subtitle or tagline for the project
- `[PROJECT_DATE]` - Project completion date (e.g., "2025")
- `[PROJECT_TYPE]` - Type of project (e.g., "Graphic Design", "Web Development")

### Tags

- `[TAG_1]`, `[TAG_2]`, `[TAG_3]` - Project tags/categories (e.g., "Vector Graphics", "Illustrator")
  - Add or remove tags as needed by copying/removing the `<span class="project-tag">` elements

### Images

- `[HERO_IMAGE_FILENAME]` - Main hero image filename (e.g., "Project 1 Work.png")
- `[VISUAL_1_FILENAME]` through `[VISUAL_4_FILENAME]` - Gallery image filenames
- `[VISUAL_1_DESCRIPTION]` through `[VISUAL_4_DESCRIPTION]` - Alt text for images
- `[CAPTION_1]` through `[CAPTION_4]` - Captions for gallery images

### Rationale Content

The rationale section follows a standard format:

- **`[RATIONALE_PARAGRAPH_1]`** - Overview: Describe the project's objectives, context, and what problem it addresses
- **`[RATIONALE_PARAGRAPH_2]`** - Process: Explain the challenges, design decisions, and approach taken
- **`[RATIONALE_PARAGRAPH_3]`** - Outcomes: Discuss results, achievements, and lessons learned

You can add or remove paragraphs as needed by copying/removing the `<p class="rationale-paragraph">` elements.

### Features

- `[FEATURE_1]` through `[FEATURE_4]` - Key features or highlights of the project
  - Add or remove features as needed

### Resource Links

- `[PDF_LINK]` - Link to project PDF (e.g., "/assets/DVD player.pdf")
- `[RAW_FILE_LINK]` - Link to raw source file for download (e.g., "/assets/Donald_Wong_dvd_player.ai")
- `[GITHUB_LINK]` - Link to GitHub repository (if applicable)
- `[LIVE_DEMO_LINK]` - Link to live demo or website (if applicable)

You can remove any resource links you don't need by deleting the entire `<a class="resource-link">` element.

## Example Replacement

Here's an example of how to replace placeholders:

**Before:**
```html
<h1 class="project-page-title">[PROJECT_NAME]</h1>
```

**After:**
```html
<h1 class="project-page-title">DVD Player Design</h1>
```

## Structure Overview

1. **Navigation** - Consistent nav bar linking back to main portfolio
2. **Project Hero** - Large hero image and project title
3. **Project Metadata** - Tags, date, and project type
4. **Rationale Section** - Detailed explanation of the project
5. **Visuals Gallery** - Grid of project images with captions
6. **Resources Section** - Links to PDFs, files, and demos
7. **Footer** - Consistent footer with branding

## Styling

The template uses the existing color scheme:
- Primary Color: `#186775` (Dark Teal)
- Accent Color: `#0081c3` (Blue)
- Accent Hover: `#4abfa1` (Medium Teal)

All branding colors are defined in `styles.css` and will automatically apply to the project page.

## Tips

- Keep rationale paragraphs concise (2-4 sentences each)
- Use high-quality images for the gallery
- Ensure all file paths point to files in `/public/assets/`
- Test all links before publishing
- Remove placeholder sections you don't need (e.g., if you don't have a GitHub link)

## Next Steps

After creating your project page:
1. Link to it from your main portfolio page (`index.html`)
2. Update the breadcrumb link if your file structure changes
3. Test responsiveness on different devices
4. Ensure all images are optimized for web
