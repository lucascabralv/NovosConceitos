
class Square {
	constructor(el, time, audio){
		this.el = el;
		this.time = time;
		this.size = el.width();
		this.pos_x = el.position().left;
		this.dir = 1;
		this.speed = 1000 / ((boxSize - this.size) / this.time);
		this.audio = new Audio(audio);
		setInterval(this.move_x.bind(this), this.speed);
	}
	move_x(){
		if (this.pos_x < boxSize - this.size && this.pos_x > 0) {
			this.pos_x += this.dir;
			this.changePos("left", this.pos_x);
		} else {
			if(this.dir == 1){
				this.pos_x = boxSize - this.size - 1;
				this.borderHighlight("right");
			} else {
				this.pos_x = 1;
				this.borderHighlight("left");
			}
			this.changePos("left", this.pos_x);
			this.dir *= -1;
			this.audio.play();
		}
	}

	changePos(dir, val){
		this.el.css(dir, val + "px");
	}

	borderHighlight(border){
		box.css("border-" + border + "-color", "white");
		setTimeout(function(){
			box.css("border-" + border + "-color", "#6200ee");	
		}, 300);
	}
}

const box =  $(".box");
const boxSize = box.width();

let sqr1 = new Square(
  $("#square1"),
  5,
  "https://docs.google.com/uc?export=download&id=1ct6JIILDpMAORKP62JvurKpw-ev4scVt"
);

//https://docs.google.com/uc?export=download&id=1ct6JIILDpMAORKP62JvurKpw-ev4scVt