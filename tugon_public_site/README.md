# TUGON Research Website (GitHub Pages)

This directory contains the official research and project website for **TUGON: An Intelligent Municipal Emergency Response, Real-Time Dispatch, and Spatial Decision-Support Framework for Liliw, Laguna**.

It follows the academic showcase requirements of the **Laguna State Polytechnic University (LSPU) - College of Computer Studies (CCS)**.

## Live Deployment on GitHub Pages

1. In your GitHub repository settings, navigate to **Pages**.
2. Under **Build and deployment** -> **Source**, select `Deploy from a branch`.
3. Choose your branch (e.g., `main`), and set the folder to `/tugon_public_site` (or `/` if you make this folder the root of a `gh-pages` branch).
4. Save, and your research website will be live at:
   `https://<your-username>.github.io/<repository-name>/`

## Local Preview

You can open `index.html` directly in any web browser, or serve it locally:

```bash
# Using Python
python -m http.server 8080

# Using Node / npx
npx serve .
```

