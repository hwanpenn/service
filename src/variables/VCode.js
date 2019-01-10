import React, { Component } from 'react'

import './App.css'

class VCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.initState(),
            refresh: false
        }
    }

    initState(){
        return {
            data: this.getRandom(109,48,4),
            rotate: this.getRandom(30,-30,4),
            fz: this.getRandom(24,20,4),
            color: [this.getRandom(100,200,3),this.getRandom(100,200,4),this.getRandom(100,200,3),this.getRandom(100,200,3)]
        }
    }

    getRandom(max, min, num) {
        const asciiNum = ~~(Math.random()*(max-min+1)+min)
        if(!Boolean(num)){
            return asciiNum
        }
        const arr = []
        let check = ''
        for(let i = 0; i < num; i++){
            arr.push(this.getRandom(max, min))
        }
        if(max === 109 && min === 48){
            for(let v = 0; v < arr.length; v++){
                check+=(String.fromCharCode(arr[v] > 57 && arr[v] < 84 ? arr[v] + 7 : ( arr[v] < 57 ? arr[v] : arr[v] + 13 ))).toLowerCase()
            }
            window.sessionStorage.setItem('check',check)
        }
        return arr
    }

    canvas() {
        const { getRandom } = this
        const canvas = document.getElementById('bgi')
        let ctx = canvas.getContext('2d')
        canvas.height = canvas.height
        // ctx.clearRect(0, 0, canvas.width(), canvas.height())
        ctx.strokeStyle = `rgb(${this.getRandom(100,10,3).toString()})`
        for( let i = 0; i< 7; i++ ) {
            ctx.lineTo(getRandom(200,0),getRandom(200,10))
            ctx.moveTo(getRandom(200,0),getRandom(200,0))
            ctx.stroke();
        }
    }
    componentDidMount() {
        this.canvas()
    }

    render() {
        const { rotate, fz, color } = this.state
        return (
            <div className='vcodewrap' >
                <canvas id="bgi" width="200" height="200"></canvas>
                {this.state.data.map((v,i) =>
                    <div
                        key={i}
                        className='itemStr'
                        style={{
                            transform:`rotate(${rotate[i]}deg)`,
                            fontSize: `${fz[i]}px`,
                            color: `rgb(${color[i].toString()})`
                        }}
                        onMouseOver={() => this.setState({refresh:true})}
                    >
                        {String.fromCharCode(v > 57 && v < 84 ? v + 7 : ( v < 57 ? v : v + 13 ))}
                    </div>
                )}
                {
                    this.state.refresh
                        ? <div
                            className='mask'
                            onClick={() => {
                                this.setState({...this.initState(),refresh: false})
                                this.canvas()
                            }}
                        >
                        </div>
                        : null}
            </div>
        )
    }
}

export default VCode;
