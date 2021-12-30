class Stars {

	constructor() {
		this.name = 'stars';
		this.densityOfStars = 6000;
		this.mainWidth = this.getMainWidth();
		this.mainHeight = this.getMainHeight();
		this.numberOfStars = this.getNumberOfStars();
		this.twinkleFrequency = {
			minimum: 2,
			maximum: 6
		};
		this.stars = [];
		this.init();
	}

	getNumberOfStars() {
		const numberOfStars = (this.mainWidth * this.mainHeight) / this.densityOfStars;
		this.numberOfStars = numberOfStars;
		return numberOfStars;
	}

	getMainWidth() {
		const mainWidth = document.querySelector(".page__wrapper").scrollWidth;
		this.mainWidth = mainWidth
		return mainWidth;
	}

	getMainHeight() {
		const mainHeight = document.querySelector(".page__wrapper").scrollHeight;
		this.mainHeight = mainHeight;
		return mainHeight;
	}

	init() {
		if (!document.querySelector(`.js-${this.name}`)) return;
		this.insertStar();
		this.addAnimation();
	}

	insertStar () {
		for (let i = 0; i < this.numberOfStars; i++) {
			const xAxis = Math.floor(Math.random() * this.mainWidth);
 		  const yAxis = Math.floor(Math.random() * this.mainHeight);
 	   	const star = document.createElement("div");
 	   	star.classList.add("stars__star");
 	   	star.style.top = yAxis.toString() + "px";
 	   	star.style.left = xAxis.toString() + "px";
 	   	document.querySelector(".stars__container").appendChild(star);	
		}
	}

  randomRange(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }

	addAnimation() {
		let stars = [...document.querySelectorAll(".stars__star")];
		for (let i = 0; i < stars.length; i++) {
			let randNum = this.randomRange(this.twinkleFrequency.minimum, this.twinkleFrequency.maximum); // twinkle duration
			stars[i].style.animationDuration = randNum + "s";
		}
	}

	clearStars() {
		const stars = [...document.querySelectorAll('.stars__star')];
		stars.map(star => star.remove());
	}

}

new Stars ();
