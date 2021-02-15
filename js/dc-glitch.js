/* =============================================================================
                              Glitch Constructor
============================================================================= */


function Glitch(element, config){
	this.element       = element;
	this.parentElement = element.parentElement;
	this.config        = config;

	this._glitch1       = this._glitch1.bind(this);
	this._glitch2       = this._glitch2.bind(this);
	this._glitch3       = this._glitch3.bind(this);
	this._init();
}


/* =============================================================================
                               _init()
============================================================================= */


Glitch.prototype._init = function(){
	var el           = this.element;
	var zIndexStart  = this.config.zIndexStart;


	/* ============================

	============================ */


	// Create a .no-glitch element and insert it BEFORE the .glitch-1 element.
	// This functions as a stable version of the image that doesn't glitch at all.
	var noGlitchElement = el.cloneNode(true);
	this.parentElement.insertBefore(noGlitchElement, el);
	noGlitchElement.classList.add('no-glitch');
	noGlitchElement.style.zIndex = zIndexStart;


	/* ============================
      Create glitch3Element
	============================ */
	// If this.config.blend is true, then create glitch3Element with a blendModeType.


	if (this.config.blend === true){
		var glitch3Element = el.cloneNode(true);
		glitch3Element.classList.add('glitch-3');
		glitch3Element.style.zIndex       = zIndexStart + 3;
		glitch3Element.style.mixBlendMode = this.config.blendModeType;
		this._insertAfter(glitch3Element, el);
	}


	/* ============================
       Create glitch2Element
	============================ */


	var glitch2Element = el.cloneNode(true);
	glitch2Element.classList.add('glitch-2');
	glitch2Element.style.zIndex = zIndexStart + 2;
	this._insertAfter(glitch2Element, el);


	/* ============================
  Add .glitch-1 to original element
	============================ */


	var glitch1Element = this.parentElement.querySelector('.no-glitch').nextElementSibling;
	glitch1Element.classList.add('glitch-1');
	glitch1Element.style.zIndex = zIndexStart + 1;


	/* ============================
         Start glitching!
	============================ */


	this._glitch1();
	this._glitch2();
  if (this.config.blend === true){ this._glitch3(); }
};


/* =============================================================================
                                Helpers
============================================================================= */


Glitch.prototype._insertAfter = function(newNode, existingNode){
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
};


Glitch.prototype._randomBoolean = function(){
  return Math.random() < 0.5;
};


Glitch.prototype._getRandomInt = function(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
};


Glitch.prototype._removeElement = function(element){
  element.parentNode.removeChild(element);
};


/* =============================================================================
                              _glitch1()
============================================================================= */
//Has a lower timing and no scale option.


Glitch.prototype._glitch1 = function(){
	var glitch1Element = this.parentElement.querySelector('.glitch-1');
	if (!glitch1Element) { return; }


	var glitch1        = this._glitch1;
	var glitch1TimeMin = this.config.glitch1TimeMin;
	var glitch1TimeMax = this.config.glitch1TimeMax;
	var clipPos1       = this._getRandomInt(10, 1900);
	var clipPos2       = 9999;
	var clipPos3       = this._getRandomInt(10, 1300);
	var clipPos4       = 0;
	var randomTime     = this._getRandomInt(glitch1TimeMin, glitch1TimeMax);
	// Adjust _getRandomInt() args for smaller/larger horizontal disposition.
	if (this._randomBoolean()){ var leftValue =       this._getRandomInt(0, 16) + 'px'; }
	else {                     v ar leftValue = '-' + this._getRandomInt(0, 16) + 'px'; }


	glitch1Element.style.clip  = 'rect('+clipPos1+'px, '+clipPos2+'px, '+clipPos3+'px,' + clipPos4 +'px)';
  glitch1Element.style.left  = leftValue;

	setTimeout(glitch1, randomTime); // Set recursion with random time.
};


/* =============================================================================
                              _glitch2()
============================================================================= */
// Has a higher timing and scale option.


Glitch.prototype._glitch2 = function(){
	var glitch2Element = this.parentElement.querySelector('.glitch-2');
	if (!glitch2Element) { return; }


	var glitch2        = this._glitch2;
	var glitch2TimeMin = this.config.glitch2TimeMin;
	var glitch2TimeMax = this.config.glitch2TimeMax;
	var scale          = this.config.scale;
	var clipPos1       = this._getRandomInt(10, 1900);
	var clipPos2       = 9999;
	var clipPos3       = this._getRandomInt(10, 1300);
	var clipPos4       = 0;
	var leftValue      = this._getRandomInt(0, 40);
	var randomTime     = this._getRandomInt(glitch2TimeMin, glitch2TimeMax);
	// Adjust _getRandomInt() args for smaller/larger horizontal disposition.
	if (this._randomBoolean()){ var leftValue =       this._getRandomInt(0, 40) + 'px'; }
	else {                      var leftValue = '-' + this._getRandomInt(0, 40) + 'px'; }


	if (scale === true){
		// Get random scale value between 0.9 and 1.1 with decimal.
		// If you want a stronger broken effect increase from 1.1
		// Note: that these values match that of blendMode() / .glitch-3
		var scaleValue = (Math.random() * (1.1 - 0.9) + 0.9).toFixed(2);
	} else {
		var scaleValue = 1;
	}

	glitch2Element.style.clip            = 'rect('+clipPos1+'px, '+clipPos2+'px, '+clipPos3+'px,' + clipPos4 +'px)';
	glitch2Element.style.left            = leftValue;
	glitch2Element.style.webkitTransform = 'scale(' + scaleValue + ')';
	glitch2Element.style.msTransform     = 'scale(' + scaleValue + ')';
	glitch2Element.style.transform       = 'scale(' + scaleValue + ')';

	setTimeout(glitch2, randomTime); // Set recursion with random time.
};


/* =============================================================================
                              _glitch3()
============================================================================= */
// Optionally called in this._init() when this.config.blend === true, and then recursively within itself.
// _glitch3() has higher timing and scale options [ like _glitch2() ], but also
// utilizes mix-blend-mode: https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode


Glitch.prototype._glitch3 = function(){
	var glitch3Element = this.parentElement.querySelector('.glitch-3');
	if (!glitch3Element) { return; }


	var glitch3         = this._glitch3;
	var scale           = this.config.scale;
	var glitch2TimeMin  = this.config.glitch2TimeMin;
	var glitch2TimeMax  = this.config.glitch2TimeMax;
	var clipPos1        = this._getRandomInt(10, 1900);
	var clipPos2        = 9999;
	var clipPos3        = this._getRandomInt(10, 1300);
	var clipPos4        = 0;
	var randomTime      = this._getRandomInt(glitch2TimeMin, glitch2TimeMax);
	// Adjust _getRandomInt() args for smaller/larger horizontal disposition.
	if (this._randomBoolean()){ var leftValue =       this._getRandomInt(0, 40) + 'px'; }
	else {                      var leftValue = '-' + this._getRandomInt(0, 40) + 'px'; }


	if (scale === true){
		// Get random scale value between 0.9 and 1.1 with decimal
		// If you want a stronger broken effect increase from 1.1
		var scaleValue = (Math.random() * (1.1 - 0.9) + 0.9).toFixed(2);
	} else if (scale === false){
		var scaleValue = 1; // If false always set scale value to 1
	}

	glitch3Element.style.clip            = 'rect('+clipPos1+'px, '+clipPos2+'px, '+clipPos3+'px,' + clipPos4 +'px)';
	glitch3Element.style.left            = leftValue;
	glitch3Element.style.webkitTransform = 'scale(' + scaleValue + ')';
	glitch3Element.style.msTransform     = 'scale(' + scaleValue + ')';
	glitch3Element.style.transform       = 'scale(' + scaleValue + ')';

	setTimeout(glitch3, randomTime); // Set recursion with random time.
};


/* =============================================================================
                                destroy()
============================================================================= */


Glitch.prototype.destroy = function(){
	var el = this.element;
	this.parentElement.style.position = '';

	var noGlitchElement = this.parentElement.querySelector('.no-glitch');
	var glitch1Element  = this.parentElement.querySelector('.glitch-1');
	var glitch2Element  = this.parentElement.querySelector('.glitch-2');
	var glitch3Element  = this.parentElement.querySelector('.glitch-3');

	if (noGlitchElement){
		noGlitchElement.classList.remove('no-glitch');
		noGlitchElement.style.zIndex = '';
		if (noGlitchElement.getAttribute('style') === ''){ noGlitchElement.removeAttribute('style'); }
	}

	if (glitch1Element){ this._removeElement(glitch1Element); }
	if (glitch2Element){ this._removeElement(glitch2Element); }
	if (glitch3Element){ this._removeElement(glitch3Element); }
};
