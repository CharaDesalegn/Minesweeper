function add_block(x,y){
    let b = new Block(x,y)
    return b
}

const color_of_blocks = {
    "idle":"rgb(199, 216, 232)",
    "open":"rgb(255, 255, 255)",
    "empty":"black",
    "edge":"rgb(155, 114, 114)",
    "marked":"blue",
    "bomb":"red"
}
const color_of_num = {
    1:"blue",
    2:"green",
    3:"red",
    4:"green",
    5:"blue",
    6:"green",
    7:"blue",
    8:"green",

}

function rand(range){
    return Math.floor(Math.random() * range)
}

function count_neighbor(x,y){
    ans = 0
    for(let i = x-1;i<x+2;i++){
        for(let j = y-1;j<y+2;j++){
            if(all_block[i][j].type == "bomb"){
                ans+=1
            }
        }
    }
    return ans
}

function add_bomb(amount){
    for(let i = 0; i < amount;i++){
        let x = rand(row-2)+1
        let y = rand(column-2)+1 
        if(all_block[x][y].type != "bomb"){
            all_block[x][y].type = "bomb"
        }
    }
}

function collapse_block(x,y){
    let ans = []
    let xx = 0
    let yy = 0
    for(let i = x-1;i<x+2;i++){
        yy = 0
        for(let j = y-1;j<y+2;j++){
            // console.log(xx,yy,xx-yy)
            if(i > 0 && i < row-1 && j > 0 && j < column-1 && xx != yy && xx-yy != -2 && yy-xx != -2){
                if(all_block[i][j].type != "bomb" && !all_block[i][j].open){
                    ans.push([i,j])

                }
                if(all_block[i][j].neighbor != 0 && !all_block[i][j].open && all_block[i][j].type != "bomb"){
                    all_block[i][j].open = true
                    all_block[i][j].type = "open"
                }
                
            }
            else if(i > 0 && i < row-1 && j > 0 && j < column-1 && all_block[i][j].neighbor != 0 && !all_block[i][j].open && all_block[i][j].type != "bomb"){
                    all_block[i][j].open = true
                    all_block[i][j].type = "open"

            }

            yy++
        }
        xx++
    }

    return ans
}
function collapse_all_bombs(){

    for(let i = 1; i < row-1;i++){
        for(let j = 1; j < column-1;j++){
            if(all_block[i][j].type == "bomb"){
                all_block[i][j].open = true

            }
        }
    }
}

function is_game_over(){
    for(let i = 1; i < row-1;i++){
        for(let j = 1; j < column-1;j++){
            if(all_block[i][j].type != "bomb" && all_block[i][j].open == false){
                return

            }
        }
    }
    game_over = true
    collapse_all_bombs()
}


function renew_grid(){
    

}

function count_neighbor_for_whole_block(){
    for(let i = 1; i < row-1;i++){
        for(let j = 1; j < column-1;j++){
            all_block[i][j].neighbor = count_neighbor(i,j)
        }
    }

}

function new_game(){
    reset_canvas()
    all_block = []
    screen.innerText = ""
    for(let i = 0; i < row;i++){
        let row = []
        for(let j = 0; j < column;j++){
            let r = add_block(i*w,j*w,"idle")
            row.push(r)
        }
        all_block.push(row)
    }

    for(let i = 0; i < row;i++){
        for(let j = 0; j < column;j++){

            all_block[i][j].type = "idle"
            all_block[i][j].open = false
            all_block[i][j].neighbor = 0
            
        }
    }
    add_bomb(bomb_rareness)

    count_neighbor_for_whole_block()
    game_over = false
    
}

function reset_canvas(){
    bomb_rareness = Number(bomb_input.value)
    row = Number(width_input.value)
    bomb_rareness = Number(bomb.value)

}