---
title: Volumetric Additive Manufacturing
description: Building MIT’s first tomographic volumetric 3D printer with Prof. TJ Wallin, connecting polymers, optics, and computation.
cover: /assets/projects/volumetric-additive-manufacturing/gummy-bear-side.jpg
cover_alt: Side view of a transparent gummy-bear-shaped print held in a glass container.
cover_caption: "Figure 1. Side view of a gummy-bear-shaped demonstration print produced on our tomographic VAM printer at MIT. Photo supplied by Hunter Whaples."
cover_position: 50% 58%
cover_contain: true
date: 2024-01-01
date_label: MIT research
category: Polymers & additive manufacturing
featured: true
featured_order: 1
draft_content: false
role: Printer development and materials research
organization: MIT · Prof. TJ Wallin
papers:
  - title: Watch a demonstration print
    url: https://www.youtube.com/watch?v=k8FZrM7DxjM
  - title: "Background reading: Volumetric additive manufacturing via tomographic reconstruction"
    url: https://doi.org/10.1126/science.aau7114
    citation: "B. E. Kelly et al., Science 363, 1075–1079 (2019). Foundational work on the method, separate from our MIT printer project."
  - title: "Early work: Computed Axial Lithography"
    url: https://arxiv.org/abs/1705.05893
    citation: "B. Kelly et al., Computed Axial Lithography (CAL): Toward Single Step 3D Printing of Arbitrary Geometries (2017 preprint)."
  - title: "LLNL's glass gummy bears and other printed structures"
    url: https://www.osti.gov/servlets/purl/3015754
    citation: "M. de Beer et al., Tomographic Volumetric Additive Manufacturing of Silica Glass with In Situ Error Calculation and Projection Tiling. Advanced Materials Technologies. DOI: 10.1002/admt.202501649. See Figure 5E."
---
## Not just a printer, but a research platform

Tomographic volumetric additive manufacturing (VAM) is a new form of 3D printing that enables extremely rapid fabrication of centimeter-scale parts. Early work at the University of California, Berkeley and Lawrence Livermore National Laboratory was [described in 2017](https://arxiv.org/abs/1705.05893), followed by the [2019 paper on tomographic VAM](https://doi.org/10.1126/science.aau7114). I started my PhD in 2024 and have been building tools to explore this process ever since.

Under the leadership of Prof. TJ Wallin, I designed, built, and commissioned the first (and second, and third!) tomographic VAM printer at MIT. What made these builds so fun was how many different disciplines had to come together. The machine, the projected light, and the chemistry of the resin all have to work together to get a successful print.

This work connects the hardware of a 3D printer with the chemistry of the material being printed and the computation that determines how to expose it. The printers give us a research platform for exploring those connections through polymers, kinetics, and optimization.

## Printing through a volume

VAM is such a fascinating process because the finished part seems to *manifest* all at once out of nowhere. The magic comes from combining two seemingly disparate ideas: CT scanning and light-hardening plastics.

Ask yourself, what does a gummy bear look like when viewed from the front? What about from the side? The back? How about 47.56 degrees clockwise from the front? It turns out that if you collect enough views, or *projections*, of a 3D object from various angles, that's enough to fully reconstruct the geometry.

In a printer, this looks like a rotating vial of resin, a projector, and a set of images that capture each view. By exposing the resin to each image in sequence, we construct a light dose distribution that selectively cures the desired part while leaving the surrounding resin liquid. All at once, a part appears.

The practical challenge is making the projected exposure and the material's response work together. That relationship is central to my research interests in polymers, kinetics, and optimization.

## A sweet demonstration

When I was commissioning our first system, I asked a very talented mechanical engineering undergraduate to pick the model we would use as a test print. Without a moment of hesitation, she selected a gummy bear.

There must be something about gummy bears and VAM because less than a month later, fellow researchers at LLNL [published fantastic work](https://www.osti.gov/servlets/purl/3015754) using nearly the same geometry, this time in glass.

The video below shows one of the first prints we made at MIT. Delicious... if only the resins weren't toxic.

{% include video.html id="k8FZrM7DxjM" title="Demonstration print from the MIT tomographic VAM printer" caption="Video demonstration supplied by Hunter Whaples." %}

{% include figure.html src="/assets/projects/volumetric-additive-manufacturing/gummy-bear-front.jpg" alt="Front view of a transparent gummy-bear-shaped demonstration print in a glass container in the laboratory." caption="Figure 2. Front view of a demonstration print from our printer. Photo supplied by Hunter Whaples." contain=true %}

## Related work

In [Magprint]({% link _projects/magprint.md %}), I work on another way to connect material behavior and printer design: controlling magnetic alignment during stereolithography.
