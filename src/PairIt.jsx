import React from 'react';


function shuffle(array, seed) {                // <-- ADDED ARGUMENT
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(random(seed) * m--);        // <-- MODIFIED LINE

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
    ++seed                                     // <-- ADDED LINE
  }

  return array;
}

function random(seed) {
  var x = Math.sin(seed++) * 10000; 
  return x - Math.floor(x);
}

export default class PairIt extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            playerText : "Murthi Raj Senthu Balini Jannan Sinthu Thusha Sakee Tharsanan Rahavan Praveen Saran",
            pairedResult : [],
            seed : new Date().getMilliseconds()
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSeedChange = this.handleSeedChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        let players = this.state.playerText.split(" ");
        players = players.filter(element => {
            return (element !== "");
        });
        if(players.length % 2 !== 0){
            alert("Odd number of players entered and cannot pair them One will left alone!");
            return;
        }
        let seed = this.state.seed;
        if(isNaN(seed)){
            seed = new Date().getMilliseconds();
        }
        players = shuffle(players, seed);

        let pairedResult = [];
        for (let index = 0; index < players.length/2; index++) {
            pairedResult.push({
                A:players[index],
                B:players[index + players.length/2]
            });
            
        }

        this.setState({
            pairedResult : pairedResult
        });

    }

    handleChange(e){
        this.setState({
            playerText: e.target.value
        });
    }

    handleSeedChange(e){
        if(!isNaN(e.target.value)){
            this.setState({
                seed: +e.target.value
            });
        }
    }

    render(){
        return(
            <div>
                <input style={{ margin: "20px" }} type="text"  aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={this.handleSeedChange} value={this.state.seed}/>
                <br/>
                <br/>
                <textarea style={{ margin: "20px" }} value={this.state.playerText} onChange = {this.handleChange}/>
                <br/>
                <br/>
                <button style={{ margin: "20px" }} className="btn btn-primary" onClick={() => {this.handleClick()}}>Pair Them</button>
                <br/>
                <br/>
                {this.state.pairedResult.map(element => {
                    return (<div style={{ margin: "20px" }}>{element.A}   ::::    {element.B} </div>);
                })}
            </div>
        );
    }
}