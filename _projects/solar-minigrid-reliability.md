---
title: Solar minigrid reliability
description: Using time-series anomaly detection to help operators identify problems in rural solar minigrids before failure.
cover: /assets/projects/solar-minigrid-reliability/cover.jpg
cover_alt: Solar panels on a hillside in Myanmar, with two people walking past the array.
cover_caption: "Figure 1. A solar installation in Myanmar. Image retained from the original project page."
date: 2021-05-01
period: Fall 2020–Spring 2021
category: Energy & data
featured: false
role: Engineering clinic team member
organization: Mee Panyar · Harvey Mudd College
papers:
  - title: About the Harvey Mudd Engineering Clinic
    url: https://www.hmc.edu/clinic/
---
## Keeping solar minigrids reliable

Through the Harvey Mudd Engineering Clinic, I worked with Mee Panyar on solar minigrids serving rural villages in Myanmar. Our question was a practical one: how do you spot a developing problem before the electricity stops working?

## From measurements to earlier warnings

My part was to design and implement time-series anomaly detection algorithms in Python. These look for unusual behavior in measurements collected over time, with the goal of giving local maintenance teams earlier warning of potential problems.

The interesting challenge was connecting the data to the system it came from. An unusual pattern is useful if it helps someone recognize that a minigrid needs attention. That kept the machine learning work tied to the practical problem of maintaining electricity service.

## Engineering in context

The Clinic pairs student teams with industry and community partners to work on real engineering problems. This project took me into energy systems and data analysis; my other clinic work took a rather different direction, [recovering Halon 1301 through distillation]({% link _projects/halon-recovery.md %}).
