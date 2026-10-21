# UniDBO Project Page

Standalone static website for **UniDBO: A Unified Dual-Branch One-Step Denoising Framework for Autonomous Driving Scenario Generation**, NeurIPS 2026.

## Local preview

Run from this folder:

```bash
python -m http.server 8000 --bind 127.0.0.1
```

Open <http://localhost:8000>. No build tools or dependencies are required. Press Ctrl+C to stop the server.

## Files

- `index.html`: paper information, abstract, demonstration galleries, and citation.
- `styles.css`: page layout and responsive styles.
- `script.js`: citation copying, navigation, and video playback.
- `assets/`: the supplied framework figure, 9 WOMD videos, 4 INTERACTION videos, 9 OnSite animations, and custom SVG identity elements. No JPG thumbnails are generated or needed.

The interface uses a white background, Arial typography, dark text, and coordinated lavender/mauve accents drawn from the method figure. Body text is 19–20 px on desktop and 18 px on mobile. The page opens with paper information and three representative examples, followed by the abstract, method figure, complete experiment galleries, and citation. The opening examples reuse existing media from the galleries. Section headings have no numeric prefixes. UniDBO is the bold wordmark with a slow left-to-right gradient sheen; the rest of the paper title uses a regular weight. Custom SVG road motifs and branch, simulation, generalization, and testing icons complement the research visuals. The navigation's motion button pauses the title animation and video autoplay, and the system's reduced-motion setting is respected. No external font service, icon library, or animation dependency is needed. The original method figure and case-study media remain unchanged.

On desktop, WOMD and OnSite have three examples per row; INTERACTION has two. Galleries adapt to smaller screens. Videos load directly from the supplied MP4 files, play muted and loop when in view, with native playback controls shown on hover or focus on desktop.

The abstract follows the latest `neurips_2026.tex`, with the final code-availability sentence omitted. It is displayed as one justified paragraph, with a naturally left-aligned final line and automatic English hyphenation where supported. Bold emphasis matches the paper exactly: `UniDBO`, and the `Uni`, `D`, `B`, and `O` in the expanded name. The repository is linked through the Code button instead. Supplementary and poster buttons are disabled until their URLs are available. No DOI, publication page numbers, visitor counts, or new experiment results are invented.

Decorative SVG trajectory pulses, resource-button sheen, a reading-progress line, and pointer-following card borders add lightweight visual feedback. A compact strip introduces the shared scene encoder, two complementary branches with mode-aware activation, and one-step denoising, while a unified preview stage presents the three evaluation settings. Method terminology follows the latest paper: CS is the continuous-scale branch for open-loop evaluation, and DHN is the discrete high-noise branch for closed-loop simulation. Each query activates only its designated branch and requires a single denoiser evaluation; closed-loop simulation repeats this process at each replan. Headings and galleries enter gently as they scroll into view; their content remains available without JavaScript. Motion can be paused from the navigation and is disabled for the system's reduced-motion preference. The decorative trajectories are illustrations, not additional simulation results.

Each example has an **Expand** button for a larger view. The viewer supports previous/next scenes within the same gallery, arrow keys, and Escape to close. Background videos pause while the viewer is open; the supplied media are reused without conversion. Native video controls remain available without JavaScript.

## GitHub Pages

Push the **contents of this folder** to a separate repository, such as `UniDBO-page`. Keep the repository private and leave Pages disabled while preparing the page.

When ready to publish using a public repository:

1. Open **Settings → Pages**.
2. Select **Deploy from a branch**.
3. Select **main** and **/(root)**, then save.

For the repository `canalone/UniDBO-page`, the default address will be `https://canalone.github.io/UniDBO-page/`. All local asset links are relative and support this project-site path. The model-code repository is independent and is not changed by this website.

To fill in the supplementary or poster URL, replace its disabled button in `index.html` with an anchor using the same `button` class.

## Layout reference

Layout references include [Nerfies (ICCV 2021)](https://nerfies.github.io/), [LERF (ICCV 2023)](https://www.lerf.io/), the [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template), and the [CDPT project page](https://nova-chen151.github.io/simCDPT.github.io/). The design uses a centered publication header, a visual introduction, readable text widths, and spacious demonstration galleries. Template acknowledgements remain in the footer.
