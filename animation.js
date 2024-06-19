// Fortune wheel 
const el = document.querySelector(".circle-img");

const stopFunc = () => {
    el.className = "circle-img stopped";
};

const runFunc = () => {
    el.className = "circle-img";
};

// const runFunc = () => {
//     requestAnimationFrame(() => {
//       requestAnimationFrame(() => {
//         el.className = "circle-img";
//       });
//     });
// };


el.addEventListener("mouseenter", () => el.addEventListener("animationiteration", stopFunc));

el.addEventListener("mouseleave", () => {
    el.removeEventListener("animationiteration", stopFunc);
    runFunc();
} );

// Falling words
const words =  document.querySelectorAll(".word");
words.forEach(word => {
    const letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach(letter => {
        const span =  document.createElement("span");
        span.textContent = letter;
        span.classList.add("letter");
        word.append(span);
    })
})

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;

words[currentWordIndex].classList.add("current");

function changeWords() {
    const currentWord = words[currentWordIndex];
    const nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    [...currentWord.children].forEach((letter, i)=>{

        setTimeout(() =>{
            letter.classList.remove("in");
            letter.classList.add("out");
        }, i * 80);
    })

    nextWord.classList.add("current");

    [...nextWord.children].forEach((letter, i)=>{
        letter.classList.remove("out");
        letter.classList.add("behind");

        setTimeout(() =>{
            letter.classList.remove("behind");
            letter.classList.add("in");
        }, 340 + i * 80);
    })

    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
}


changeWords();
setInterval(changeWords, 4000);