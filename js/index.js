/* =============================================================================

============================================================================= */


const glitch_bg_image    = document.querySelector(".glitch-bg-image");
const glitch_instance_1  = new Glitch(glitch_bg_image, {
  // Tone down the broken effect slightly by preventing different size variations in the pieces.
  scale : true,
  // false will omit <div class="glitch-img glitch-3">, and ingore the
  // blendModeType applied to that element.
  blend : true,
  // https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode
  // Was 'hue'. 'hard-light' creates a more dramatic effect.
  // The impact of blendModeType is increased as min and max are changed.
  // For example 100, 300 has a much stronger effect than 0, 40.
  blendModeType : 'hue', // 'normal' | 'hue' | 'hard-light' | 'soft-light' , etc.
  // Used to create a random time for recursive invocations of glitch1()
  // i.e, setTimeout(glitch1, randomTime);
  // Larger values mean less glitchinesss.
  glitch1TimeMin : 600,
  glitch1TimeMax : 900,
  // Used to create a random time for recursive invocations of glitch2() AND glitch3()
  glitch2TimeMin : 10,
  glitch2TimeMax : 115,
  // Set the z-index base value as needed.
  // <div class="glitch-img no-glitch"> = zIndexStart
  // <div class="glitch-img glitch-1">  = zIndexStart + 1
  // <div class="glitch-img glitch-2">  = zIndexStart + 2
  // <div class="glitch-img glitch-3">  = zIndexStart + 3
  zIndexStart : 8,
});

// setTimeout(function(){ glitch_instance_1.destroy(); }, 1000 * 5);


/* =============================================================================

============================================================================= */


const glitch_img         = document.querySelector(".glitch-img");
const glitch_instance_2 = new Glitch(glitch_img, {
  scale          : true,
  blend          : true,
  blendModeType  : 'hue',
  glitch1TimeMin : 600,
  glitch1TimeMax : 900,
  glitch2TimeMin : 10,
  glitch2TimeMax : 115,
  zIndexStart    : 8,
});

// setTimeout(function(){ glitch_instance_2.destroy(); }, 1000 * 5);
