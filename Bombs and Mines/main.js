const screen = document.getElementById("screen")
const mark = document.getElementById("mark")
const bomb_input = document.getElementById("bomb")
const width_input = document.getElementById("width")
const button = document.getElementById("b")


const w = 5
let row = 20
let column = 30
const fps = 60
let bomb_rareness = 20
let game_over = false
screen.style.girdColumnStart = "2"
screen.style.gridTemplateColumns = "repeat(" + column + ",100px)"
let all_block = []




new_game()

add_bomb(bomb_rareness)

addEventListener("click",(event)=>{
    let x =Number(event.target.id)
    let y =Number(event.target.name)

    if(!mark.checked && !game_over && !all_block[x][y].marked){
        if(all_block[x][y].type != "bomb" && all_block[x][y].neighbor == 0){
            all_block[x][y].type = "open"
            all_block[x][y].open =true 
            let to_collapse = []
            let temp = collapse_block(x,y)
            for(let t of temp){
                if(all_block[t[0]][t[1]].neighbor == 0){
                    to_collapse.push(t)
                }
            }
            for(let i = 0;i<20;i++){
                for(let index of to_collapse){
                    let x = index[0]
                    let y = index[1]
                    for(let m = 0;m<to_collapse.length;m++){
                        if(to_collapse[m]==index){
                            to_collapse.splice(m,1)
                        }
                    }
                    all_block[x][y].type = "open"
                    all_block[x][y].open =true 
                    let temp = collapse_block(x,y)
                    for(let t of temp){
                        if(all_block[t[0]][t[1]].neighbor == 0){
                            to_collapse.push(t)
                        }
                    }

                }
            }

        }
        else if(all_block[x][y].neighbor != 0 && all_block[x][y].type != "bomb"){
            all_block[x][y].type = "open"
            all_block[x][y].open =true 
        }

        else{
            collapse_all_bombs()
            game_over = true
        }
    }
    else if(mark.checked){
            all_block[x][y].marked = !all_block[x][y].marked

        }
})



count_neighbor_for_whole_block()



function update(){
    for(let i = 1; i < row-1;i++){
        for(let j = 1; j < column-1;j++){
            all_block[i][j].update()
        }
    }
    is_game_over()




}


setInterval(()=>{
    update()
},1000/fps)
