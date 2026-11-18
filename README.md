# UniDBO Project Page

Standalone static website for **UniDBO: A Unified Dual-Branch One-Step Denoising Framework for Autonomous Driving Scenario Generation**, NeurIPS 2026.

[Project page](https://canalone.github.io/UniDBO-page/) · [Paper on OpenReview](https://openreview.net/forum?id=lcbL2baE12) · [NeurIPS 2026 (Sydney)](https://neurips.cc/virtual/2026/loc/sydney/poster/149995) · [Poster (PNG)](https://neurips.cc/media/PosterPDFs/NeurIPS%202026/149995.png?t=1794316013.6818821) · [Code repository](https://github.com/canalone/UniDBO)

## Citation

```bibtex
@inproceedings{zhao2026unidbo,
  title     = {Uni{DBO}: A Unified Dual-Branch One-Step Denoising Framework for Autonomous Driving Scenario Generation},
  author    = {Da Zhao and Yuhang Chen and Jialin Fan and Jian Sun and Jie Sun},
  booktitle = {The Fortieth Annual Conference on Neural Information Processing Systems},
  year      = {2026},
  url       = {https://openreview.net/forum?id=lcbL2baE12}
}
```

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

The interface uses a white background, Arial typography, dark text, and coordinated lavender/mauve accents drawn from the method figure. Body text is 19–20 px on desktop and 18 px on mobile. The page opens with paper information and three representative examples, followed by the abstract, method figure, complete experiment galleries, and citation. The opening examples reuse existing media from the galleries. Section headings have no numeric prefixes. UniDBO is the bold wordmark with a slow left-to-right gradient sheen; the rest of the paper title uses a regular weight. Custom SVG road motifs and branch, simulation, generalization, and testing icons complement the research visuals. The navigation's motion button pauses the title animation and video autoplay, and the system's reduced-motion setting is respected. No external font service, icon library, or animation dependency is needed. The method figure is copied unchanged from `网站素材/方法图.svg`; case-study media remain unchanged.

On desktop, WOMD and OnSite have three examples per row; INTERACTION has two. Galleries adapt to smaller screens. Videos load directly from the supplied MP4 files, play muted and loop when in view, with native playback controls shown on hover or focus on desktop.

The abstract follows `UniDBO_NeurIPS_2026 (3).pdf`, with its final code-availability sentence omitted. It is displayed as one justified paragraph, with a naturally left-aligned final line and automatic English hyphenation where supported. Bold emphasis matches the paper exactly: `UniDBO`, and the `Uni`, `D`, `B`, and `O` in the expanded name. The resource buttons link to OpenReview, the code repository, and the official poster. The NeurIPS badge links to the Sydney conference listing.

Decorative SVG trajectory pulses, resource-button sheen, a reading-progress line, and pointer-following card borders add lightweight visual feedback. A compact strip introduces the shared scene encoder, two complementary branches with mode-aware activation, and one-step denoising, while a unified preview stage presents the three evaluation settings. Method terminology follows the latest paper: CS is the continuous-scale branch for open-loop evaluation, and DHN is the discrete high-noise branch for closed-loop simulation. Each query activates only its designated branch and requires a single denoiser evaluation; closed-loop simulation repeats this process at each replan. Headings and galleries enter gently as they scroll into view; their content remains available without JavaScript. Motion can be paused from the navigation and is disabled for the system's reduced-motion preference. The decorative trajectories are illustrations, not additional simulation results.

Each example has an **Expand** button for a larger view. The viewer supports previous/next scenes within the same gallery, arrow keys, and Escape to close. Background videos pause while the viewer is open; the supplied media are reused without conversion. Native video controls remain available without JavaScript.

## GitHub Pages

GitHub Pages publishes the project website from the root of the `main` branch of `canalone/UniDBO-page`. The live address is [canalone.github.io/UniDBO-page](https://canalone.github.io/UniDBO-page/). Asset paths are relative to support this project-site URL.

## Layout reference

Layout references include [Nerfies (ICCV 2021)](https://nerfies.github.io/), [LERF (ICCV 2023)](https://www.lerf.io/), the [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template), and the [CDPT project page](https://nova-chen151.github.io/simCDPT.github.io/). The design uses a centered publication header, a visual introduction, readable text widths, and spacious demonstration galleries. Template acknowledgements remain in the footer.
