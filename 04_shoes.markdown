---
layout: page
title: Shoes
permalink: /shoes/
---

{% assign image_files = site.static_files %}
{% assign images = image_files | map: "path" %}

<div class="gallery">
{% for image in images %}
    {% if image contains 'shoes' %}
        {% assign image_title = image | split: '/' | last | replace: ".jpg", "" | replace: "_", " " %}
        <div class="image">

            <a href="{{ image }}" class="lightbox" data-lightbox="gallery" target="_blank">
                <img src="{{ image }}" alt="{{ image_title }}" loading="lazy" />
                <p>{{ image_title }}</p>
            </a>

        </div>
    {% endif %}

{% endfor %}

</div>
