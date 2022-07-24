let time = document.querySelector('.time')
let qindex = 0;
let timer;
let rightanswers = 0;
let submit = document.querySelector('.next')


function restart() {
    location.reload();
}

function fetQuestion() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {


        if (this.readyState === 4 & this.status === 200) {
            let objjs = JSON.parse(this.responseText)
            let nq = objjs.length;
            assingCout(nq)
            addData(objjs[qindex], nq)

            countTime(5, nq)
            submit.onclick = () => {
                let righta = objjs[qindex].ra;
                console.log('number questions is : ', nq)
                console.log('indexof question is : ', qindex)

                qindex++;

                checkAnswer(righta, nq);

                document.querySelector('.mains').innerHTML = ""
                document.querySelector('.q').innerHTML = ""

                addData(objjs[qindex], nq)
                clearInterval(timer)
                countTime(5, nq)
                // create bullets
                createBullets(nq)
            }


        }
    }
    req.open('GET', "question.json", true)
    req.send();
}
fetQuestion()
function assingCout(num) {
    document.querySelector('.len').innerHTML = num
}
function addData(obj, num) {
    if (qindex < num) {
        document.querySelector('.info .num').innerHTML = qindex + 1;

        let q = document.createElement("span")
        let qt = document.createTextNode(obj.q)
        q.appendChild(qt)
        document.querySelector('.q').appendChild(q)
        let inputs = document.querySelector('.mains');
        //loop for answer
        for (let i = 1; i <= 3; i++) {
            let radio = document.createElement("input");
            radio.setAttribute('id', `a${i}`)
            radio.name = "q";
            radio.type = "radio"
            radio.dataset.answer = obj[`a${i}`];

            let label = document.createElement('label');
            let labelt = document.createTextNode(obj[`a${i}`]);
            label.appendChild(labelt)
            label.setAttribute("for", `a${i}`)

            let mainDiv = document.createElement('div')
            mainDiv.id = "mainDiv";
            mainDiv.appendChild(radio)
            mainDiv.appendChild(label)

            inputs.appendChild(mainDiv)
        }
    }
    else {
        let mainDiv = document.querySelector('.q')
        document.querySelector('.mains').innerHTML = "You get <span style='color:green; hont-weight:bold;'>" + rightanswers + "</span> correct from " + num;
        mainDiv.innerHTML = '<h1>congratulations you finished</h1>'
        mainDiv.style.color = "green";

    }
}
function checkAnswer(right, count) {
    let answers = document.getElementsByName('q');
    let chosen;
    for (let i = 0; i < 3; i++) {
        if (answers[i].checked) {
            chosen = answers[i].dataset.answer;
        }
    }
    if (right == chosen) {
        rightanswers++;
    }
    console.log('the right answers is  :', rightanswers)
}

function createBullets() {

    let bulletsSpan = document.querySelectorAll(".spans span")
    let arraySpans = Array.from(bulletsSpan)
    arraySpans.forEach((elem, index) => {
        if (qindex === index) {
            elem.className = "active"
        }
    })

}

function countTime(duration, num) {
    if (qindex < num) {
        let m, s;
        timer = setInterval(function () {
            m = parseInt(duration / 60);
            s = parseInt(duration % 60)
            m = m < 10 ? `0${m}` : m
            s = s < 10 ? `0${s}` : s

            time.innerHTML = `${m}:${s}`
            if (--duration < 0) {
                clearInterval(timer)
                submit.click()
            }
        }, 1000)
    }
}