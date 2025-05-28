---
layout: page
title: Animals
permalink: /animals/
---

{% assign image_files = site.static_files %}
{% assign images = image_files | map: "path" %}

<div class="gallery">
{% for image in images %}
    {% if image contains 'animals' %}
        {% assign image_title = image | split: '/' | last | replace: ".jpg", "" | replace: "_", " " %}
        <div class="image">
            <img src="{{ image }}" alt="{{ image_title }}" />
            <p>{{ image_title }}</p>
        </div>
    {% endif %}
{% endfor %}
</div>
