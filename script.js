const correctPin = "0111";

let enteredPin = "";
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let isWrongQuestion = false;


// =========================
// คำถาม
// =========================

const questions = [
    {
        question: "ที่ที่เราอยากไปมากที่สุด?",
        options: ["ทะเล", "ภูเขา", "คาเฟ่", "สวนสนุก"],
        correct: 0,

        wrongQuestion: {
            question: "อ่าวว ทำไมตอบผิด?",
            options: ["ข้อต่อไป"],
            correct: 0
        }
    },


    {
        question: "1 อย่างที่ชอบ เราชอบกินอะไร?",
        options: ["น้ำ", "ขนม", "ข้าว", "ผลไม้"],
        correct: 1,

        wrongQuestion: {
            question: "เอ๊ะ ตอบผิดอีกละ?",
            options: ["ข้อต่อไป"],
            correct: 0
        }
    },

    {
        question: "น้ำที่เราชอบหละ?",
        options: ["ชานม", "ชาไทย", "โกโก้", "ชาเขียว"],
        correct: 3,

        wrongQuestion: {
            question: "เอ๊ะ ตอบผิดอีกละ?",
            options: ["ข้อต่อไป"],
            correct: 0
        }
    },

    {
        question: "เราชอบสีอะไร?",
        options: ["ม่วง", "ชมพู", "ฟ้า", "เขียว"],
        correct: 1,

        wrongQuestion: {
            question: "เอ๊ะ ตอบผิดอีกละ?",
            options: ["ข้อต่อไป"],
            correct: 0
        }
    },

    {
        question: "เราสูงเท่าไร?",
        options: ["163", "162", "161", "160"],
        correct: 0,

        wrongQuestion: {
            question: "เอ๊ะ ตอบผิดเหมือนเดิม?",
            options: ["ข้อต่อไป"],
            correct: 0
        }
    },

    {
        question: "เราชอบตัวอะไรที่อยู่ใน sanrio?",
        options: ["Pochacco", "My Melody", "Kuromi", "Kitty"],
        correct: 0,

        wrongQuestion: {
            question: "เอ๊ะ ตอบผิดอีกละ?",
            options: ["ข้อต่อไป"],
            correct: 0
        }
    },

    {
        question: "ผลไม้ที่เราชอบหละ?",
        options: ["องุ่น", "มะม่วง", "ลิ้นจี่", "ส้ม"],
        correct: 3,

        wrongQuestion: {
            question: "เอ๊ะ ตอบผิดอีกละ?",
            options: ["ข้อต่อไป"],
            correct: 0
        }
    },

    {
        question: "ของขวัญแบบไหนที่เราชอบ?",
        options: ["ดอกไม้", "จดหมาย", "ของทำมือ", "ขนม"],
        correct: 3,

        wrongQuestion: {
            question: "5555 ตอบผิดหราา?",
            options: ["ข้อต่อไป"],
            correct: 0
        }
    },

    {
        question: "ถ้ามีวันพิเศษ เราควรทำอะไร?",
        options: ["ถ่ายรูป", "ไปเที่ยว", "กินข้าวด้วยกัน", "ดูหนัง"],
        correct: 1,

        wrongQuestion: {
            question: "เอ๊ะ ตอบผิดอีกละ?",
            options: ["ข้อต่อไป"],
            correct: 0
        }
    },

    {
        question: "คิดว่าเราอยากอะไรเธอมากที่สุด?",
        options: [
            "ขอบคุณที่อยู่ด้วย",
            "ดีใจที่ได้รู้จักกัน",
            "ขอให้มีความสุข",
            "ทั้งหมดเลย 💗"
        ],
        correct: 3,

        wrongQuestion: {
            question: "ผิดยันข้อสุดท้าย?",
            options: ["จบ"],
            correct: 0
        }
    }
];


// =========================
// เปลี่ยนหน้า
// =========================

function showScreen(screenId) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });

    const screen = document.getElementById(screenId);

    if (screen) {
        screen.classList.remove("hidden");
    }
}


// =========================
// ระบบรหัส
// =========================

function updatePinDisplay() {

    for (let i = 0; i < 4; i++) {

        const pin = document.getElementById(`pin${i + 1}`);

        if (pin) {
            pin.textContent = enteredPin[i] || "○";
        }
    }
}


function pressNumber(number) {

    if (enteredPin.length >= 4) return;

    enteredPin += number;

    updatePinDisplay();

    const wrongPin = document.getElementById("wrongPin");

    if (wrongPin) {
        wrongPin.textContent = "";
    }
}


function clearPin() {

    enteredPin = enteredPin.slice(0, -1);

    updatePinDisplay();

    const wrongPin = document.getElementById("wrongPin");

    if (wrongPin) {
        wrongPin.textContent = "";
    }
}


function checkPin() {

    const message = document.getElementById("wrongPin");

    if (enteredPin.length !== 4) {

        if (message) {
            message.textContent = "กรุณาใส่รหัสให้ครบ 4 หลัก";
        }

        return;
    }


    if (enteredPin === correctPin) {

        const passwordScreen =
            document.getElementById("passwordScreen");

        if (passwordScreen) {
            passwordScreen.classList.add("pin-unlock");
        }


        const effect = document.createElement("div");

        effect.className = "unlock-effect";
        effect.textContent = "🔓💗";

        document.body.appendChild(effect);


        setTimeout(() => {

            effect.remove();

            if (passwordScreen) {
                passwordScreen.classList.remove("pin-unlock");
            }

            showScreen("letterScreen");

        }, 900);

    } else {

        if (message) {
            message.textContent =
                "รหัสไม่ถูกต้อง ลองอีกครั้งนะ 💗";
        }

        enteredPin = "";

        updatePinDisplay();
    }
}


// =========================
// แสดงคำถาม
// =========================

function showQuestion() {

    const question = questions[currentQuestionIndex];

    if (!question) return;

    const optionsBox =
        document.getElementById("answerOptions");

    if (!optionsBox) return;


    selectedAnswer = null;
    isWrongQuestion = false;


    const questionNumber =
        document.getElementById("questionNumber");

    if (questionNumber) {

        questionNumber.textContent =
            `Question ${currentQuestionIndex + 1} / ${questions.length}`;
    }


    const questionText =
        document.getElementById("questionText");

    if (questionText) {
        questionText.textContent = question.question;
    }


    optionsBox.innerHTML = "";


    question.options.forEach((option, index) => {

        createAnswerButton(
            option,
            index,
            question.correct
        );

    });
}


// =========================
// สร้างปุ่มคำตอบ
// =========================

function createAnswerButton(
    option,
    index,
    correctAnswer
) {

    const optionsBox =
        document.getElementById("answerOptions");

    if (!optionsBox) return;


    const button = document.createElement("button");

    button.type = "button";
    button.className = "answer-option";
    button.textContent = option;


    button.addEventListener("click", () => {

        selectedAnswer = index;


        optionsBox
            .querySelectorAll("button")
            .forEach(item => {
                item.classList.remove("selected");
            });


        button.classList.add("selected");

    });


    optionsBox.appendChild(button);
}


// =========================
// คำถามพิเศษเมื่อผิด
// =========================

function showWrongQuestion() {

    const currentQuestion =
        questions[currentQuestionIndex];

    if (!currentQuestion) return;


    const wrong = currentQuestion.wrongQuestion;

    const optionsBox =
        document.getElementById("answerOptions");

    if (!optionsBox) return;


    isWrongQuestion = true;
    selectedAnswer = null;


    const questionNumber =
        document.getElementById("questionNumber");

    if (questionNumber) {
        questionNumber.textContent =
            "คำถามพิเศษ 😝";
    }


    const questionText =
        document.getElementById("questionText");

    if (questionText) {
        questionText.textContent =
            wrong.question;
    }


    optionsBox.innerHTML = "";


    wrong.options.forEach((option, index) => {

        createAnswerButton(
            option,
            index,
            wrong.correct
        );

    });
}


// =========================
// ปุ่มต่อไป
// =========================

const nextBtn =
    document.getElementById("nextBtn");


if (nextBtn) {

    nextBtn.addEventListener("click", () => {

        if (selectedAnswer === null) {

            const questionNumber =
                document.getElementById("questionNumber");

            if (questionNumber) {
                questionNumber.textContent =
                    "เลือกคำตอบก่อนนะ 💗";
            }

            return;
        }


        const currentQuestion =
            questions[currentQuestionIndex];


        // ถ้าเป็นคำถามพิเศษ
        if (isWrongQuestion) {

            currentQuestionIndex++;


            if (currentQuestionIndex < questions.length) {

                showQuestion();

            } else {

                const scoreText =
                    document.getElementById("scoreText");

                if (scoreText) {

                    scoreText.textContent =
                        `ตอบถูก ${score} จาก ${questions.length} ข้อ 💗`;
                }

                showScreen("resultScreen");
            }


            return;
        }


        // คำถามปกติ
        if (selectedAnswer === currentQuestion.correct) {

            showAnswerEffect("💖");

            score++;
            currentQuestionIndex++;


            if (currentQuestionIndex < questions.length) {

                setTimeout(() => {
                    showQuestion();
                }, 500);

            } else {

                const scoreText =
                    document.getElementById("scoreText");

                if (scoreText) {

                    scoreText.textContent =
                        `ตอบถูก ${score} จาก ${questions.length} ข้อ เก่งมากเลย 💗`;
                }


                setTimeout(() => {
                    showScreen("resultScreen");
                }, 500);
            }


        } else {

            showAnswerEffect("🥺");


            setTimeout(() => {
                showWrongQuestion();
            }, 500);
        }

    });

}


// =========================
// ปุ่มเปิดจดหมาย
// =========================

const openBtn =
    document.getElementById("openBtn");


if (openBtn) {

    openBtn.addEventListener("click", () => {

        currentQuestionIndex = 0;
        score = 0;
        selectedAnswer = null;
        isWrongQuestion = false;


        const envelope =
            document.getElementById("envelope");

        const letterScreen =
            document.getElementById("letterScreen");


        if (envelope) {
            envelope.classList.add("opening");
        }

        if (letterScreen) {
            letterScreen.classList.add("opening-screen");
        }


        setTimeout(() => {

            if (envelope) {
                envelope.classList.remove("opening");
            }

            if (letterScreen) {
                letterScreen.classList.remove(
                    "opening-screen"
                );
            }


            showQuestion();
            showScreen("quizScreen");

        }, 800);

    });

}


// =========================
// รีเซ็ต
// =========================

function resetGame() {

    enteredPin = "";
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    isWrongQuestion = false;


    updatePinDisplay();


    const wrongPin =
        document.getElementById("wrongPin");

    if (wrongPin) {
        wrongPin.textContent = "";
    }


    showScreen("passwordScreen");
}


const resetBtn =
    document.getElementById("resetBtn");

if (resetBtn) {
    resetBtn.addEventListener(
        "click",
        resetGame
    );
}


const restartBtn =
    document.getElementById("restartBtn");

if (restartBtn) {
    restartBtn.addEventListener(
        "click",
        resetGame
    );
}


// =========================
// เพลง
// =========================

const bgMusic =
    document.getElementById("bgMusic");

const musicBtn =
    document.getElementById("musicBtn");


if (bgMusic && musicBtn) {

    musicBtn.addEventListener(
        "click",
        async () => {

            try {

                if (bgMusic.paused) {

                    await bgMusic.play();

                    musicBtn.textContent =
                        "🔇 ปิดเพลง";

                } else {

                    bgMusic.pause();

                    musicBtn.textContent =
                        "🎵 เปิดเพลง";
                }

            } catch (error) {

                console.error(
                    "เปิดเพลงไม่ได้:",
                    error
                );

            }

        }
    );
}


// =========================
// ข้อความเซอร์ไพรส์
// =========================

const messageBtn =
    document.getElementById("messageBtn");

const surpriseMessage =
    document.getElementById("surpriseMessage");


if (messageBtn && surpriseMessage) {

    messageBtn.addEventListener(
        "click",
        () => {

            surpriseMessage.classList.remove(
                "hidden"
            );

            messageBtn.style.display = "none";

        }
    );
}


// =========================
// คำถามสุดท้าย
// =========================

const finalBtn =
    document.getElementById("finalBtn");

const finalQuestion =
    document.getElementById("finalQuestion");

const yesBtn =
    document.getElementById("yesBtn");

const thinkBtn =
    document.getElementById("thinkBtn");

const finalAnswer =
    document.getElementById("finalAnswer");


if (finalBtn && finalQuestion) {

    finalBtn.addEventListener(
        "click",
        () => {

            finalQuestion.classList.remove(
                "hidden"
            );

            finalBtn.style.display = "none";

        }
    );
}


if (yesBtn && finalAnswer) {

    yesBtn.addEventListener(
        "click",
        () => {

            finalAnswer.innerHTML = `
                <div class="final-love-message">
                    ขอบคุณสำหรับคำตอบนะ 💗<br>
                    ✨ ดีใจมากเลย ✨
                </div>
            `;


            createHeartBurst();


            setTimeout(() => {

                const memoryGallery =
                    document.getElementById(
                        "memoryGallery"
                    );

                if (memoryGallery) {

                    memoryGallery.classList.remove(
                        "hidden"
                    );

                    updateGallery();
                    startGalleryAutoSlide();
                }

            }, 1200);

        }
    );
}


if (thinkBtn && finalAnswer) {

    thinkBtn.addEventListener(
        "click",
        () => {

            finalAnswer.textContent =
                "ไม่เป็นไรเลย ค่อย ๆ คิดได้นะ 💗";

        }
    );
}


// =========================
// หัวใจลอย
// =========================

function createHeart() {

    const hearts =
        document.getElementById("hearts");

    if (!hearts) return;


    const heart =
        document.createElement("div");

    heart.className =
        "floating-heart";


    const heartTypes = [
        "💗",
        "💖",
        "💕",
        "💓",
        "💞"
    ];


    heart.textContent =
        heartTypes[
            Math.floor(
                Math.random() *
                heartTypes.length
            )
        ];


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.fontSize =
        (16 + Math.random() * 18) + "px";


    heart.style.animationDuration =
        (4 + Math.random() * 3) + "s";


    hearts.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 7000);
}


setInterval(createHeart, 700);


// =========================
// เอฟเฟกต์ตอบถูก / ผิด
// =========================

function showAnswerEffect(emoji) {

    const effect =
        document.createElement("div");

    effect.className =
        "answer-effect";

    effect.textContent =
        emoji;


    document.body.appendChild(effect);


    setTimeout(() => {

        effect.remove();

    }, 800);
}


// =========================
// หัวใจระเบิด
// =========================

function createHeartBurst() {

    const hearts = [
        "💗",
        "💖",
        "💕",
        "💓",
        "💞",
        "💘"
    ];


    for (let i = 0; i < 30; i++) {

        const heart =
            document.createElement("div");

        heart.className =
            "heart-burst";


        heart.textContent =
            hearts[
                Math.floor(
                    Math.random() *
                    hearts.length
                )
            ];


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            150 +
            Math.random() *
            350;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        heart.style.setProperty(
            "--x",
            `${x}px`
        );


        heart.style.setProperty(
            "--y",
            `${y}px`
        );


        heart.style.setProperty(
            "--rotate",
            `${Math.random() * 360 - 180}deg`
        );


        document.body.appendChild(heart);


        setTimeout(() => {

            heart.remove();

        }, 1600);
    }
}


// =========================
// GALLERY
// =========================

const galleryImages = [

    {
        src: "images/photo1.jpg",
        text: "รูปแรกของเรา 💕"
    },

    {
        src: "images/photo2.jpg",
        text: "อีกหนึ่งความทรงจำดี ๆ 💗"
    },

    {
        src: "images/photo3.jpg",
        text: "ช่วงเวลาดี ๆ ที่อยากเก็บไว้ ✨"
    },

    {
        src: "images/photo4.jpg",
        text: "และยังมีอีกหลายความทรงจำเลย 💖"
    }

];


let galleryIndex = 0;
let galleryAutoSlide = null;
let galleryPaused = false;


// =========================
// เปลี่ยนรูป
// =========================

function updateGallery() {

    const image =
        document.getElementById("galleryImage");

    const text =
        document.getElementById("galleryText");


    if (!image || !text) return;


    image.classList.remove(
        "gallery-image-changing"
    );


    // บังคับให้ Animation เริ่มใหม่
    void image.offsetWidth;


    image.src =
        galleryImages[galleryIndex].src;


    text.textContent =
        galleryImages[galleryIndex].text;


    image.classList.add(
        "gallery-image-changing"
    );


    updateGalleryDots();
}


// =========================
// สไลด์อัตโนมัติ
// =========================

function startGalleryAutoSlide() {

    clearInterval(galleryAutoSlide);


    galleryAutoSlide =
        setInterval(() => {

            if (galleryPaused) return;


            galleryIndex++;


            if (
                galleryIndex >=
                galleryImages.length
            ) {

                galleryIndex = 0;
            }


            updateGallery();

        }, 4000);
}


// =========================
// จุด Gallery
// =========================

function updateGalleryDots() {

    const dots =
        document.getElementById(
            "galleryDots"
        );


    if (!dots) return;


    dots.innerHTML = "";


    galleryImages.forEach(
        (image, index) => {

            const dot =
                document.createElement(
                    "button"
                );


            dot.type = "button";

            dot.className =
                "gallery-dot";


            if (
                index === galleryIndex
            ) {

                dot.classList.add(
                    "active"
                );
            }


            dot.addEventListener(
                "click",
                () => {

                    galleryIndex =
                        index;

                    updateGallery();

                    startGalleryAutoSlide();

                }
            );


            dots.appendChild(dot);

        }
    );
}


// =========================
// ปุ่มรูปถัดไป
// =========================

const nextPhoto =
    document.getElementById(
        "nextPhoto"
    );


if (nextPhoto) {

    nextPhoto.addEventListener(
        "click",
        () => {

            galleryIndex++;


            if (
                galleryIndex >=
                galleryImages.length
            ) {

                galleryIndex = 0;
            }


            updateGallery();

            startGalleryAutoSlide();

        }
    );
}


// =========================
// ปุ่มรูปก่อนหน้า
// =========================

const prevPhoto =
    document.getElementById(
        "prevPhoto"
    );


if (prevPhoto) {

    prevPhoto.addEventListener(
        "click",
        () => {

            galleryIndex--;


            if (galleryIndex < 0) {

                galleryIndex =
                    galleryImages.length - 1;
            }


            updateGallery();

            startGalleryAutoSlide();

        }
    );
}


// =========================
// หยุด Gallery เมื่อเอาเมาส์ชี้
// =========================

const memoryGallery =
    document.getElementById(
        "memoryGallery"
    );


if (memoryGallery) {

    memoryGallery.addEventListener(
        "mouseenter",
        () => {

            galleryPaused = true;

        }
    );


    memoryGallery.addEventListener(
        "mouseleave",
        () => {

            galleryPaused = false;

        }
    );
}


// =========================
// เริ่มต้นเว็บ
// =========================

updatePinDisplay();

showScreen("passwordScreen");