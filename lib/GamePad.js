
class GamePad{
    construction(param){
        console.log(param);
        const padHole = document.createElement("div");
        padHole.style.cssText
        = "position:absolute; width:120px; height:120px; bottom:50px;"
        + "background:rgba(243,97,166,0.5); border:#353535 solid medium; border-radius:50%; left:50%;";
        const stick = document.createElement("div");
        stick.style.cssText = 
        "position: absolute; left: 30px; top: 30px; width: 60px; height: 60px; border-radius: 50%; background: #FF00DD;";
        padHole.appendChild(stick);
        doucument.body.appendChild(padHole);
        this.domElement = stick;
        this.maxRadius = 60 * 60;
        this.game = param.game;
        this.location = { left:this.domElement.offsetLeft, top:this.domElement.offsetTop };
        const pad = this;
        if ('ontouchstart' in window) {
            this.domElement.addEventListener('touchstart',function(e)
            {
                e.preventDefault();
                pad.touch(e);
                e.stopPropagation();
            });
        }
        else
        {
            this.domElement.addEventListener('mousedown',function(e)
            {
                console.log(e);
                e.preventDefault();
                pad.touch(e);
                e.stopPropagation();
            });
        }


    }

    getMousePosition(e){
        let Xvalue = e.targetTouches ? e.targetTouches[0].pageX : e.clientX;
        let Yvalue = e.targetTouches ? e.targetTouches[0].pageY : e.clientY;
        return { x:Xvalue, y:Yvalue };
    }


    Touch(event){
        event = event || window.event;

        this.offset = this.getMousePosition(event);
        const pad = this;
        if ('ontouchstart' in window){
            document.ontouchmove = function(event){ event.preventDefault(); pad.move(event); };
            document.ontouchend = function(event){ event.preventDefault(); pad.up(event); };
            // 이걸보면 모바일에서도 될거같다
        }else{
            document.onmousemove = function(event){event.preventDefault(); pad.move(event); };
            document.onmouseup = function(event){ event.preventDefault(); pad.up(event); };
        }
    }

    move(event){
        const mouse = this.getMousePosition(event);
        let left = mouse.x - this.offset.x;
        let top = mouse.y - this.offset.y;
        const calLoc = left*left + top*top;
        if (calLoc>this.maxRadius){
            const result = Math.sqrt(calLoc);
            left /= result;
            top /= result;
            left *= 60;
            top *= 60;
        }

        this.domElement.style.top = `$(top + this.domElement.clientHeight/2)px`;
        this.domElement.style.left = `$(left + this.domElement.clientWidth/2)px`;


    }

    up(){
        if('ontouchstart'in window){
            doucument.ontouchmove = null;
            doucument.touchend = null;
        }else{
            doucument.onmousemove = null;
            doucument.onmouseup = null;
        }
        this.domElement.style.top = `${this.location.top}px`;
        this.domElement.style.left = `${this.location.top}px`;
    }







}