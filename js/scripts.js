document.addEventListener("DOMContentLoaded", function() {



	//button scroll 
	document.querySelectorAll('.js-anchor').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});
	

	//header catalog menu
	const catalogMenuButtons = document.querySelectorAll('.popup-catalog-wrap .btn-catalog-menu');

	catalogMenuButtons.forEach(button => {
		button.addEventListener('click', function(event) {
			event.preventDefault(); 
			const menuListItem = this.closest('.menu li');
			if (menuListItem.classList.contains('open')) {
				return; 
			}
			document.querySelectorAll('.menu li').forEach(item => {
				item.classList.remove('open');
			});
			menuListItem.classList.add('open');
		});
	});

	const menuCatalogActiveButton = document.querySelector('.js-menu-catalog-active');
	const menuCatalogCloseButton = document.querySelector('.js-menu-catalog-close');
	if (menuCatalogActiveButton) {
		menuCatalogActiveButton.addEventListener('click', function(e) {
			document.body.classList.add('catalog-menu-show')
			e.preventDefault();
		});
	}
	if (menuCatalogCloseButton) {
		menuCatalogCloseButton.addEventListener('click', function(e) {
			document.body.classList.remove('catalog-menu-show')
			e.preventDefault();
		});
	}

	//js tabs
	const tabsNav = document.querySelectorAll('.js-tabs-nav')
	const tabsBlocks = document.querySelectorAll('.js-tab-block')
	const tabsButtonTitle = document.querySelectorAll('.js-tab-title')
	const tabsButtonContent = document.querySelectorAll('.js-tab-content')
	function tabsActiveStart() {
		for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
			if (tabsBlocks[iTab].classList.contains('active')) {
				tabsBlocks[iTab].classList.remove('active')
			}
		}
		for (i = 0; i < tabsNav.length; i++) {
			let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
			for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
				if (tabsNavElements[iElements].classList.contains('active')) {
					let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
					for (j = 0; j < tabsBlocks.length; j++) {
						if (tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive) > -1) {
							console.log(tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive))
							tabsBlocks[j].classList.add('active')
						}
					}
				}
			}
		}
		
	}
	for (i = 0; i < tabsButtonTitle.length; i++) {
		tabsButtonTitle[i].addEventListener('click', function (e) {
			this.classList.toggle('active')
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < tabsNav.length; i++) {
		tabsNav[i].addEventListener('click', function (e) {
			if (e.target.closest('[data-tab]')) {
				let tabsNavElements = this.querySelector('[data-tab].active')
				tabsNavElements ? tabsNavElements.classList.remove('active') : false
				e.target.closest('[data-tab]').classList.add('active')
				tabsActiveStart()
				e.preventDefault()
				e.stopPropagation()
				return false
			}
		})
	}
	tabsActiveStart()

	//btn tgl and add
	let tglButtons = document.querySelectorAll('.js-btn-tgl')
	let addButtons = document.querySelectorAll('.js-btn-add')
	for (i = 0;i < tglButtons.length;i++) {
		tglButtons[i].addEventListener('click', function(e) {
			this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active')
			e.preventDefault()
			return false
		})
	}
	for (i = 0;i < addButtons.length;i++) {
		addButtons[i].addEventListener('click', function(e) {
			if (!this.classList.contains('active')) {
				this.classList.add('active');
				e.preventDefault()
				return false
			}
		})
	}
	
	// filter actions
	const filterButtonOpen = document.querySelector('.js-filter-open');
	const filterButtonClose = document.querySelector('.js-filter-close');
	if (filterButtonOpen) {
		filterButtonOpen.addEventListener("click", function(event) {
				document.body.classList.add("filter-show");
				event.preventDefault();
		})
	}
	if (filterButtonClose) {
		filterButtonClose.addEventListener("click", function(event) {
				document.body.classList.remove("filter-show");
				event.preventDefault();
		})
	}

	//fancybox
	Fancybox.bind("[data-fancybox]", {
		//settings
	});


	//js popup wrap
	const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
	const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
	const popupElements = document.querySelectorAll('.js-popup-wrap')
	const wrapWidth = document.querySelector('.wrap').offsetWidth
	const bodyElem = document.querySelector('body')
	function popupElementsClear() {
		document.body.classList.remove('menu-show')
		document.body.classList.remove('search-show')
		popupElements.forEach(element => element.classList.remove('popup-right'))
	}
	function popupElementsClose() {
		togglePopupButtons.forEach(element => {
			if (!element.closest('.no-close')) {
				element.classList.remove('active')
			}
		})
	}
	function popupElementsContentPositionClass() {
		popupElements.forEach(element => {
			let pLeft = element.offsetLeft
			let pWidth = element.querySelector('.js-popup-block').offsetWidth
			let pMax = pLeft + pWidth;
			if (pMax > wrapWidth) {
				element.classList.add('popup-right')
			} else {
				element.classList.remove('popup-right')
			}
		})
	}
	for (i = 0; i < togglePopupButtons.length; i++) {
		togglePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			if (this.classList.contains('active')) {
				this.classList.remove('active')
			} else {
				popupElementsClose()
				this.classList.add('active')
				if (this.closest('.popup-catalog-wrap')) {
					document.body.classList.add('menu-show')
				}
				if (this.closest('.popup-menu-wrap')) {
					document.body.classList.add('menu-show')
				}
				if (this.closest('.popup-filter-wrap')) {
					document.body.classList.add('filter-show')
				}
				popupElementsContentPositionClass()
			}
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < closePopupButtons.length; i++) {
		closePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			popupElementsClose()
			e.preventDefault()
			e.stopPropagation()
			return false;
		})
	}
	document.onclick = function (event) {
		if (!event.target.closest('.js-popup-block')) {
			popupElementsClear()
			popupElementsClose()
		}
	}
	popupElements.forEach(element => {
		if (element.classList.contains('js-popup-select')) {
			let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
			if (element.querySelector('.js-popup-block .active')) {
				element.classList.add('select-active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
			} else {
				element.classList.remove('select-active')
			}
			for (i = 0; i < popupElementSelectItem.length; i++) {
				popupElementSelectItem[i].addEventListener('click', function (e) {
					this.closest('.js-popup-wrap').classList.add('select-active')
					if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
						this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
					}
					this.classList.add('active')
					let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
					let popupElementButton = element.querySelector('.js-btn-popup-toggle')
					popupElementButton.innerHTML = ''
					popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
					popupElementsClear()
					popupElementsClose()
					if (!this.closest('.js-tabs-nav')) {
						e.preventDefault()
						e.stopPropagation()
						return false
					}
				})
			}
		}
	})



	// Popups
	let popupCurrent;
	let popupsList = document.querySelectorAll('.popup-outer-box')

	document.querySelectorAll(".js-popup-open").forEach(function (element) {
	element.addEventListener("click", function (e) {
		document.querySelector(".popup-outer-box").classList.remove("active");
		document.body.classList.add("popup-open");

		popupCurrent = this.getAttribute("data-popup");
		document
		.querySelector(
			`.popup-outer-box[id="${popupCurrent}"
			]`
		)
		.classList.add("active");

		e.preventDefault();
		e.stopPropagation();
		return false;
		});
	});
	document.querySelectorAll(".js-popup-close").forEach(function (element) {
	element.addEventListener("click", function (event) {
		document.body.classList.remove("popup-open");
		for (i=0;i<popupsList.length;i++) {
			popupsList[i
				].classList.remove("active");
			}
		event.preventDefault();
		event.stopPropagation();
		});
	});
	document.querySelectorAll(".popup-outer-box").forEach(function (element) {
	element.addEventListener("click", function (event) {
		if (!event.target.closest(".popup-box")) {
		document.body.classList.remove("popup-open");
		document.body.classList.remove("popup-open-scroll");
		document.querySelectorAll(".popup-outer-box").forEach(function (e) {
			e.classList.remove("active");
				});
		return false;
			}
		});
	});


	//slider media thumbs preview
	const swiperMediaPreview = new Swiper(".slider-media-thumbs .swiper",
	{
	  loop: false,
	  slidesPerView: 3,
	  spaceBetween: 0,
	  threshold: 5,
	  watchSlidesVisibility: true,
	  watchSlidesProgress: true,
	  freeMode: false,
	  navigation: {
		nextEl: ".button-slider-media-thumbs-next",
		prevEl: ".button-slider-media-thumbs-prev",
		},
	});
	
	//slider media thumbs main
	const swiperMediaMain = new Swiper(".slider-media-main .swiper",
	{
	  loop: false,
	  slidesPerView: 1,
	  spaceBetween: 0,
	  autoHeight: true,
	  speed: 400,
	  threshold: 5,
	  freeMode: false,
	  watchSlidesProgress: true,
	  navigation: false,
	  pagination: {
		clickable: true,
		},
	  thumbs: {
		swiper: swiperMediaPreview,
		},
	});


	//slider tiles
	const swiperSliderTiles = new Swiper('.slider-tiles .swiper', {
		loop: false,
		slidesPerView: 2,
		spaceBetween: 0,
		autoHeight: false,
		speed: 400,
		pagination: false,
		autoplay: false,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-tiles-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-tiles-prev',
		},
		breakpoints: {
			640: {
				slidesPerView: 3,
			},
			1024: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			},
		},
	
	});


	//slider tabs
	const swiperSliderTabs = new Swiper('.slider-tabs .swiper', {
		loop: false,
		slidesPerView: 'auto',
		spaceBetween: 0,
		autoHeight: false,
		speed: 400,
		pagination: false,
		autoplay: false,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-tabs-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-tabs-prev',
		},
	
	});


	//slider logos
	const swiperSliderLogos = new Swiper('.slider-logos .swiper', {
		loop: true,
		slidesPerView: 'auto',
		spaceBetween: 0,
		autoHeight: false,
		speed: 4000,
		pagination: false,
		centeredSlides: true,
		allowTouchMove: false,
		navigation: false,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
		},
	
	});


	//slider about
	const swiperSliderAbout = new Swiper('.slider-about .swiper', {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: true,
		speed: 400,
		pagination: false,
		autoplay: false,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-about-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-about-prev',
		},
	
	});


	//slider gallery
	const swiperSliderGallery = new Swiper('.slider-gallery .swiper', {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: true,
		speed: 400,
		pagination: false,
		autoplay: false,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-gallery-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-gallery-prev',
		},
		breakpoints: {
			640: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
		},
	
	});


	//slider reviews
	const swiperSliderReviews = new Swiper('.slider-reviews .swiper', {
		loop: false,
		slidesPerView: 2,
		spaceBetween: 0,
		autoHeight: false,
		speed: 400,
		pagination: false,
		autoplay: false,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-reviews-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-reviews-prev',
		},
		breakpoints: {
			640: {
				slidesPerView: 3,
			},
			1024: {
				slidesPerView: 2,
			},
		},
	
	});


	//slider info
	const swiperSliderInfo = new Swiper('.slider-info .swiper', {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: false,
		speed: 400,
		pagination: false,
		autoplay: false,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-info-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-info-prev',
		},
	
	});


	//slider cardmain
	const swiperSliderCardMain = new Swiper('.slider-cardmain .swiper', {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: true,
		speed: 400,
		pagination: {
			el: '.slider-cardmain-pagination',
			clickable: true,
		},
		autoplay: false,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-cardmain-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-cardmain-prev',
		},
	
	});

})
