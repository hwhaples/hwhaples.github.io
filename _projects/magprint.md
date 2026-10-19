---
title: "Magprint: Magnetically Aligned SLA"
description: An SLA printer built around a rotating Halbach array to control magnetic alignment during fabrication.
cover: /assets/projects/magprint/printer.jpg
cover_alt: The Magprint prototype, with a circular rotating magnetic array around the build region of an Autodesk Ember printer.
cover_caption: "Figure 1. Our Magprint prototype, built around an Autodesk Ember and a rotating Halbach array. Photo supplied by Hunter Whaples."
cover_position: 50% 63%
cover_contain: true
date: 2025-10-30
date_label: Research prototype
category: Printer design & magnetic materials
featured: true
featured_order: 2
draft_content: false
role: Printer design and development
organization: MIT · Lemelson–Vest Program
---
## Giving a printer control over material orientation

With Magprint, my colleague Callie Zheng and I wanted to give an SLA 3D printer control over not only a part's shape but also its microstructural alignment. As part of MIT's Lemelson–Vest Program, our team designed and built a printer that can apply a parallel magnetic field to a bath of liquid resin in any direction we command.

We built the system out of an old Autodesk Ember printer and a rotating Halbach array. The idea was to align magnetically responsive materials, like ferromagnetic particles and liquid crystal elastomers (LCEs), along each layer while the part was printing—voxel-level control.

## A rotating Halbach array

Halbach arrays let us use permanent magnets to design complex magnetic fields. In the magprinter, a Halbach array that produces a straight, uniform field surrounds the SLA resin vat. Rotating the array rotates the field direction. That gives us another variable to work with during a print: the direction in which the material is encouraged to align.

Getting that capability into a printer brings together mechanical design, magnetic-field control, and polymer chemistry. The photo above shows the prototype we built.

## Why liquid crystal elastomers?

LCEs are particularly interesting because their directional alignment determines how they respond to a stimulus such as heat. Controlling that alignment allows you to program the way a printed structure bends or twists in response to stimuli like light or heat.

Our materials research explores using a magnetic field to align liquid-crystal monomers while they are still mobile, then using light to fix that orientation into a polymer network. Usually, labs use direct ink writing and other shear-based printing methods, but these techniques couple the toolpath to the resulting printed structure. The aim of magprinter was to fully decouple microstructural alignment from geometry, unlocking a much larger design space.

The printer gives us a way to explore that idea. With the support of Lemelson–Vest, we're developing both the chemistry and hardware to produce programmable soft actuators.

## Connecting materials and machines

Magprint sits at the intersection of the material we want to make and the machine needed to make it. My [tomographic VAM work]({% link _projects/volumetric-additive-manufacturing.md %}) follows a similar thread, bringing printer design together with polymer kinetics and computation.
