

class Block{
    constructor(x,y){
        this.x = x
        this.y = y
        this.type = "idle"
        this.w = w
        this.neighbor = 0
        this.open = false
        this.marked = false
        this.button = document.createElement("button")
        this.button.id = x/w
        this.button.name = y/w
        screen.append(this.button)

    }
    update(){
        this.draw()
        if(this.open && !this.marked){
            this.draw_num()
        }
    }
    draw(){
        if(this.open && !this.marked){
            this.button.style.backgroundColor = color_of_blocks[this.type]
            
        }
        else{
            this.button.style.backgroundColor = color_of_blocks["idle"]
        }
        if(this.marked){
            this.button.style.backgroundColor = color_of_blocks["marked"]
        }
    
    }
    draw_num(){ 
        if(this.neighbor != 0 && this.type != "bomb"){
            this.button.style.color = color_of_num[this.neighbor]
            this.button.innerText = this.neighbor

        }
        else{
            this.button.innerText = ""

        }

    }
}