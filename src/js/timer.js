class Timer {

	constructor() {
		this.name = 'timer';
		this.futureDate = this.getNextNewYearsEveDate();
		this.totalSeconds = 0;
		this.time = {
			days: document.querySelector('.timer__element--days'),
			hours: document.querySelector('.timer__element--hours'),
			minutes: document.querySelector('.timer__element--minutes'),
			seconds: document.querySelector('.timer__element--seconds')
		}
		this.timeLeft = {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0
		};
		this.init();
	}

	init() {
		this.totalSeconds = Math.floor((this.futureDate - new Date()) / 1000);
		this.setTimeLeft();
		let interval = setInterval(() => {
			if (this.totalSeconds < 0) { clearInterval(interval); }
			this.countTime();
		}, 1000);
		
	}
	
	getNextNewYearsEveDate () {
		const nextYear = new Date().getFullYear() + 1;
		const newYearsEveDate = this.futureDate = new Date(`January, 1 ${nextYear} 00:00:00`);
		return newYearsEveDate; 
	};
	
	
	countTime() {
		if (this.totalSeconds > 0) {
			--this.timeLeft.seconds;
			--this.totalSeconds;
			this.animateFlip(this.time.seconds, this.timeLeft.seconds);
		}
		if (this.timeLeft.minutes >= 0 && this.timeLeft.seconds < 0) {
			this.timeLeft.seconds = 59;
			--this.timeLeft.minutes;
			this.animateFlip(this.time.minutes, this.timeLeft.minutes);
		}
		if (this.timeLeft.hours >= 0 && this.timeLeft.minutes < 0) {
			this.timeLeft.minutes = 59;
			--this.timeLeft.hours;
			this.animateFlip(this.time.hours, this.timeLeft.hours);
		}
		if (this.timeLeft.days >= 0 && this.timeLeft.hours < 0) {
			this.timeLeft.hours = 23;
			--this.timeLeft.days;
			this.animateFlip(this.time.days, this.timeLeft.days);
		}
	}

	printTime() {
			this.animateFlip(this.time.days, this.timeLeft.days);
			this.animateFlip(this.time.hours, this.timeLeft.hours);
			this.animateFlip(this.time.minutes, this.timeLeft.minutes);
			this.animateFlip(this.time.seconds, this.timeLeft.seconds);
	}

	animateFlip(element, value) {
		const valueInDom = element.querySelector(".timer__element--bottom-back").innerText;
		const currentValue = value < 10 ? "0" + value : "" + value;
		if (valueInDom === currentValue) return;
		element.querySelector(".timer__element--top-back span").innerText = currentValue;
		element.querySelector(".timer__element--bottom-back span").innerText = currentValue;
		gsap.to(element.querySelector(".timer__element--top"), 0.7, {
			rotationX: "-180deg",
			transformPerspective: 300,
			ease: Quart.easeOut,
			onComplete: function () {
				element.querySelector(".timer__element--top").innerText = currentValue;
				element.querySelector(".timer__element--bottom").innerText = currentValue;
				gsap.set(element.querySelector(".timer__element--top"), { rotationX: 0 });
			}
		})
		gsap.to(element.querySelector(".timer__element--top-back"), 0.7, {
			rotationX: 0,
			transformPerspective: 300,
			ease: Quart.easeOut,
			clearProps: "all"
		});
	}

	setTimeLeft() {
		this.timeLeft.days = Math.floor(this.totalSeconds / (60 * 60 * 24));
		this.timeLeft.hours = Math.floor((this.totalSeconds / (60 * 60)) % 24);
		this.timeLeft.minutes = Math.floor((this.totalSeconds / 60) % 60);
		this.timeLeft.seconds = Math.floor(this.totalSeconds % 60);
	}

}

new Timer();