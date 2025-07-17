class themes {
    constructor() {
        this.themesToggle = document.querySelectorAll(".themes-toggle__radio");
        this.root = document.documentElement;
        this.themesSwitcher();
    }
    themesSwitcher() {
        this.themesToggle.forEach((th) => th.addEventListener("click", (btn) => {
            const currentTheme = document.querySelector(".themes-toggle__radio--active");
            if(btn.target !== currentTheme.id) {
                currentTheme.classList.remove("themes-toggle__radio--active");
                btn.target.classList.add("themes-toggle__radio--active");
                this.root.classList.remove("th-1", "th-2", "th-3");
                this.root.classList.add(`${btn.target.id}`)
            }
        }))
    }
}

class calc {
    constructor() {
        this.output = document.querySelector(".result-container__result");
        this.preOperator = document.querySelector(".result-container__op");
        this.numbers = document.querySelectorAll(".calc-row__nbr");
        this.operators = document.querySelectorAll(".calc-row__op");
        this.del = document.querySelector(".calc-row__del");
        this.reset = document.querySelector(".calc-action__reset");
        this.equal = document.querySelector(".calc-action__equal");
        this.keys();
    }
    keys() {
        let arrayNbr = [];
        let newNbr = "";
        const operators = ["+", "-", "/", "*"];
        this.numbers.forEach((key) => key.addEventListener("click", (nbr) => {
            let lastSelectedOp = arrayNbr[arrayNbr.length - 1];
            if(nbr.target.textContent === ".") {
                if(this.output.value.includes(".")) return;
                if(this.output.value === "") return;
            }
            if(!operators.includes(lastSelectedOp) && !this.preOperator.textContent) {
                arrayNbr.push(nbr.target.textContent);
                this.output.value = arrayNbr.join("");
            } 
            if(this.preOperator.textContent) {
                arrayNbr.push(nbr.target.textContent);
                newNbr += nbr.target.textContent;
                this.output.value = newNbr;
            }
        }));
        
        this.operators.forEach((key) => key.addEventListener("click", (op) => {
            let lastSelectedOp = arrayNbr[arrayNbr.length - 1];
            if(operators.includes(op.target.textContent) && this.output.value === "") {
                return;
            }
            if(operators.includes(lastSelectedOp)) {
                arrayNbr[arrayNbr.length - 1] = op.target.textContent;
                lastSelectedOp = op.target.textContent;
            }
            else {
                arrayNbr.push(op.target.textContent);
                newNbr = "";
                lastSelectedOp = op.target.textContent;
            }
            this.preOperator.textContent = arrayNbr.join("");
        const includesInArrayNbr = arrayNbr.filter(el => operators.includes(el)).length;
        if(includesInArrayNbr > 1 && operators.includes(this.preOperator.textContent.slice(-1))) {
            this.preOperator.textContent = this.calcTheInput(arrayNbr, -1);
            arrayNbr = [];
            arrayNbr.push(this.preOperator.textContent);
            arrayNbr.push(op.target.textContent);
            this.preOperator.textContent += op.target.textContent;
        }
    }))

    this.del.addEventListener("click", () => {
        if(this.output.value.slice(0, -1) !== "" || !isNaN(arrayNbr[arrayNbr.length - 1])) {
        arrayNbr.pop();
        }
        this.output.value = this.output.value.slice(0, -1);
        newNbr = newNbr.slice(0, -1);
    })
    
    this.reset.addEventListener("click", () => {
        this.output.value = "";
        this.preOperator.textContent = "";
        arrayNbr = [];
        newNbr = "";
        this.numbers.forEach(el => el.classList.remove("divideByZero"));
        this.operators.forEach(el => el.classList.remove("divideByZero"));
        this.del.classList.remove("divideByZero");
        this.equal.classList.remove("divideByZero");
    })
    
    this.equal.addEventListener("click", () => {
        if(!(/(\d+)([+\-*/])(\d+)/g).test(arrayNbr.join(""))) return;
        this.preOperator.textContent = "";
        console.log(arrayNbr)
        console.log(this.correctEquation(arrayNbr))
        this.output.value = this.calcTheInput(arrayNbr, 1);
        arrayNbr = [];
        arrayNbr.push(...this.output.value.split(""));
        console.log(arrayNbr)
            newNbr = "";
        })
    }
    correctEquation(arrayNbr, all = -1) {
        let theEquation = ((all === -1) ? arrayNbr.slice(0, -1) : arrayNbr).map(function (el) {
                if(!isNaN(el)) return String(Number(el));
                else return el;
            }).join("");
            console.log(theEquation)
        theEquation = theEquation.replace(/([+\-*/])0+(\d+)/g, "$1$2");
        return theEquation;
    }
    calcTheInput(input, all) {
        if((/(\d+)\/(0+)/g).test(input.join(""))) {
            this.numbers.forEach(el => el.classList.add("divideByZero"));
            this.operators.forEach(el => el.classList.add("divideByZero"));
            this.del.classList.add("divideByZero");
            this.equal.classList.add("divideByZero");
            return "Cannot divide by zero";
        }
        return eval(this.correctEquation(input, all));
    }
}

new themes();
new calc();