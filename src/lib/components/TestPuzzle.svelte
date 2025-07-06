<svg width="500" height="500" viewBox="0 0 500 500">
  <defs>
    <filter id="desaturate">
      <feColorMatrix type="saturate" values="0" />
    </filter>
  </defs>

  <!-- Фоновое изображение -->
  <image href="https://omjsblog.files.wordpress.com/2023/11/2833.jpg" x="0" y="0" width="500" height="500" />

  <!-- Прямоугольники -->
  <rect x="50" y="50" width="100" height="100" fill="none" stroke="black" />
  <rect x="200" y="50" width="100" height="100" fill="none" stroke="black" />
  <rect x="50" y="200" width="100" height="100" fill="none" stroke="black" />

  <!-- Прямоугольник с фильтром -->
  <g filter="url(#desaturate)">
    <image href="https://omjsblog.files.wordpress.com/2023/11/2833.jpg" x="200" y="200" width="100" height="100" />
  </g>
</svg>
