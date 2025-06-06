---
layout: page
title: Home
permalink: /
---

{% assign image_files = site.static_files %}
{% assign images = image_files | map: "path" %}
{% assign image_choices = "" | split: "." %}

{% for image in images %}
{% assign image_title = image | split: '/' | last | replace: ".jpg", "" | replace: "_", " " %}
{% assign image_choices = image_choices | push: image %}
{% endfor %}

{% assign random_index = "now" | date: "%N" | modulo: image_choices.size %}
{% assign random_image = image_choices[random_index] %}

<div class="image">
    <a href="{{ random_image }}" class="lightbox" data-lightbox="gallery" target="_blank">
        <img src="{{ random_image }}" alt="Image {{ random_index }}" loading="lazy" />
    </a>
</div>
