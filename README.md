2025 Portfolio v3


  <!-- glass displacement filter -->
  <svg class="hidden" xmlns="http://www.w3.org/2000/svg" width="370" height="210" viewBox="0 0 370 210">
    <filter id="displacement" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB">
      <!-- Simulated background blur -->
      <feGaussianBlur in="BackgroundImage" stdDeviation="2" result="blurredBackground" />

      <!-- Generate turbulence noise -->
      <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="3" seed="3000" result="turbulence" />

      <!-- Apply displacement to blurred background -->
      <feDisplacementMap in="blurredBackground" in2="turbulence" scale="50" xChannelSelector="R" yChannelSelector="G"
        result="displaced" />

      <!-- Blend with original content -->
      <feBlend in="displaced" in2="SourceGraphic" mode="normal" />

      <!-- Add drop shadow to the result -->
      <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="black" flood-opacity="0.8" />
    </filter>
  </svg>