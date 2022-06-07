
class tipy{
    elem = "";
    text = "";
    startDelay = "";
    wordDelay = "";
    onShow = ""; 
    onEnd = "";
    startTimeout = "";
    runInterval = "";
    constructor({elem: elem, text: text, startDelay: startDelay, wordDelay: wordDelay, onShow: onShow, onEnd: onEnd,startNow: startNow}) {
        if( elem  === null || text  === null ) {
            console.error("tipy.init: Missing required parameters like elem or text");
            return;
        }
        
        this.elem = elem;
        this.text = text;
        this.startDelay = startDelay | 50;
        this.wordDelay = wordDelay | 50;
        this.onShow = onShow;
        this.onEnd = onEnd;

        if( startNow ) {
            this.start();
        }
    }

    start() {
        let letters = this.text.split("");
        let i = 0;
        let self = this;
        clearTimeout(this.startTimeout);
        this.startTimeout = setTimeout(function() {
            self.onShow();
            self.runInterval = setInterval(function() {
                if( i < letters.length ) {
                    self.elem.innerHTML += letters[i];
                    i++;
                } else {
                    clearInterval( self.runInterval );
                    self.onEnd();
                }
            }, this.wordDelay);
        }.bind(this), this.startDelay);
    }

    stop() {
        clearTimeout(this.startTimeout);
        clearInterval(this.runInterval);
        this.onEnd();
    }
    restart() {
        this.stop();
        this.start();
    }
    clear() {
        this.elem.innerHTML = "";
    }
    setText(text) {
        this.text = text;
    }
    setElem(elem) {
        this.elem = elem;
    }
    setStartDelay(startDelay) {
        this.startDelay = startDelay;
    }
    setWordDelay(wordDelay) {
        this.wordDelay = wordDelay;
    }
    setOnShow(onShow) {
        this.onShow = onShow;
    }
    setOnEnd(onEnd) {
        this.onEnd = onEnd;
    }
    getText() {
        return this.text;
    }
    getElem() {
        return this.elem;
    }
};

let myTipy = new tipy({
    elem: document.getElementById("tipy"),
    text: "Hello, world! My name is Gergő you son of a bitch",
    startDelay: 1500,
    wordDelay: 50,
    startNow: false,
    onShow() {
        console.log("tipy.onShow");
    },
    onEnd() {
        console.log("tipy.onEnd");
    }
});


myTipy.start();