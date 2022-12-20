document.addEventListener('DOMContentLoaded', () => {
    const box_display = document.querySelector('.box');
    const scoreDisplay = document.getElementById('score_num')
    const res = document.getElementById('result')
    const width = 4
    let points = 0
        //squares ka array bana diya
    let squares = []

    function createboxes() {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement('div')
            square.innerHTML = '0'
            box_display.appendChild(square)
            squares.push(square)
        }
        generate()
        generate()
    }
    createboxes()

    // ye function ek random value pe 2 layega ex randon function 0 se 1 ke beech me hota hai hamesha squares lemgth 16 hai to ye koi se bhi no multiply kara dega
    // math floor naearest no return kareyga ex agar 5.05 to 5 -5.3 to 6

    function generate() {
        randomNumber = Math.floor(Math.random() * squares.length)
            //do baar print isliye hoga kyuki hamne 2 baaar function call karaya hai;
            // console.log(randomNumber);
        if (squares[randomNumber].innerHTML == '0') {
            squares[randomNumber].innerHTML = '2'
            lose()
        } else {
            //else isliye kyuki game over hone ke bad dubara game start hoga
            generate()
        }
    }


    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML

                // example row=2 4 0 4
                // 0 2 2 0
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                    // filteredRow 2 4 4
                    //  2 2

                let missing = 4 - filteredRow.length
                    // missing=1
                    // missing=2

                let zeros = Array(missing).fill(0)
                    // zeros=[0]
                    // zeros=[0,0]

                // zeros.concat isliye kyuki hame right side chaiye thats why
                let newRow = zeros.concat(filteredRow)


                // newRow =0 2 4 4
                //  0 0 2 2

                squares[i].innerHTML = newRow[0]
                    // updated row 0 2 4 4
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }

    function moveleft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML

                // example row=2 4 0 4

                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                    // filteredRow 2 4 4

                let missing = 4 - filteredRow.length
                    // missing=1

                let zeros = Array(missing).fill(0)
                    // zeros=[0]

                let newRow = filteredRow.concat(zeros)
                    // newRow = 2 4 4 0

                squares[i].innerHTML = newRow[0]
                    // updated row  2 4 4 0
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }

    function moveup() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + (width)].innerHTML
            let totalThree = squares[i + (width * 2)].innerHTML
            let totalFour = squares[i + (width * 3)].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
                // filteredRow 2 4 4

            let missing = 4 - filteredColumn.length
                // missing=1

            let zeros = Array(missing).fill(0)
                // zeros=[0]

            let newColumn = filteredColumn.concat(zeros)
                // newRow =0 2 4 4

            squares[i].innerHTML = newColumn[0]
                // updated row 0 2 4 4
            squares[i + (width)].innerHTML = newColumn[1]
            squares[i + (width * 2)].innerHTML = newColumn[2]
            squares[i + (width * 3)].innerHTML = newColumn[3]

        }
    }

    function movedown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + (width)].innerHTML
            let totalThree = squares[i + (width * 2)].innerHTML
            let totalFour = squares[i + (width * 3)].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
                // filteredRow 2 4 4

            let missing = 4 - filteredColumn.length
                // missing=1

            let zeros = Array(missing).fill(0)
                // zeros=[0]

            let newColumn = zeros.concat(filteredColumn)
                // newRow =0 2 4 4

            squares[i].innerHTML = newColumn[0]
                // updated row 0 2 4 4
            squares[i + (width * 1)].innerHTML = newColumn[1]
            squares[i + (width * 2)].innerHTML = newColumn[2]
            squares[i + (width * 3)].innerHTML = newColumn[3]

        }
    }

    function combinerow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combinedsum = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
                squares[i].innerHTML = combinedsum
                squares[i + 1].innerHTML = '0'
                points += combinedsum
                scoreDisplay.innerHTML = points
            }
        }
        win()
    }


    function combinecol() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let combinedsum = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML)
                squares[i].innerHTML = combinedsum
                squares[i + width].innerHTML = '0'
                points += combinedsum
                scoreDisplay.innerHTML = points

            }
        }
        // agar koi tile 2048 aa jaye isliye call karayaa
        win()
    }

    function trigger(e) {
        if (e.keyCode === 37) {
            keyLeft()
        } else if (e.keyCode === 38) {
            keyUp()
        } else if (e.keyCode === 39) {
            keyRight()
        } else if (e.keyCode === 40) {
            keyDown()
        }
    }

    document.addEventListener('keyup', trigger)

    function keyLeft() {
        moveleft()
        combinerow()
        moveleft()
        generate()
    }

    function keyRight() {
        moveRight()
        combinerow()
        moveRight()
        generate()
    }

    function keyUp() {
        moveup()
        combinecol()
        moveup()
        generate()
    }

    function keyDown() {
        movedown()
        combinecol()
        movedown()
            // becz agar hamare array 4 2 0 0 hoga to ab kuch ban nhi skta to generate call karenge taki fir se 2 2 do baar aa jaye random postion pe
        generate()
    }

    function win() {
        for (i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML === '2048') {
                res.innerHTML = "you win"
                document.removeEventListener('keyup', trigger)
                setTimeout(() => clear(), 3000)
            }
        }
    }

    function lose() {
        let zero = 0
        for (i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML === '0') {
                zero++
            }
        }
        if (zero == 0) {
            res.innerHTML = "you lose"
            document.removeEventListener('keyup', trigger)
            setTimeout(() => clear(), 3000)

        }
    }



    function clear() {
        clearInterval(myTimer)
    }

    function addColours() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML === '0') squares[i].style.backgroundColor = '#afa192'
            else if (squares[i].innerHTML === '2') squares[i].style.backgroundColor = '#eee4da'
            else if (squares[i].innerHTML === '4') squares[i].style.backgroundColor = '#ede0c8'
            else if (squares[i].innerHTML === '8') squares[i].style.backgroundColor = '#f2b179'
            else if (squares[i].innerHTML === '16') squares[i].style.backgroundColor = '#ffcea4'
            else if (squares[i].innerHTML === '32') squares[i].style.backgroundColor = '#e8c064'
            else if (squares[i].innerHTML === '64') squares[i].style.backgroundColor = '#ffab6e'
            else if (squares[i].innerHTML === '128') squares[i].style.backgroundColor = '#fd9982'
            else if (squares[i].innerHTML === '256') squares[i].style.backgroundColor = '#ead79c'
            else if (squares[i].innerHTML === '512') squares[i].style.backgroundColor = '#76daff'
            else if (squares[i].innerHTML === '1024') squares[i].style.backgroundColor = '#beeaa5'
            else if (squares[i].innerHTML === '2048') squares[i].style.backgroundColor = '#d7d4f0'
        }
    }
    addColours()

    var myTimer = setInterval(addColours, 50)

})