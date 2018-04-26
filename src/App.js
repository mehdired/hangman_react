import React, { Component } from 'react';

import './App.css';

// const keyboardArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const words = 'open,class,rooms,reactjs'.split(',')



class App extends Component {

  state = this.initApp()

  
  initApp() {
    const word = words[Math.floor(Math.random() * words.length)].toLocaleUpperCase()

    const letterUse = new Set()

    const mystery = this.computeDisplay(word, letterUse)

    const score = 0

    const win = false

    return {word, letterUse, mystery, score, win}
  }

  handleClickLetter(letterClicked) {
    let {word, letterUse, mystery, score} = this.state
    console.log(letterClicked)
    letterUse.add(letterClicked)

    mystery = this.computeDisplay(word, letterUse)

    const win = !mystery.includes('_')

    if (this.state.mystery !== mystery) {
      score = score + 2
    } else if (letterUse.has(letterClicked)) {
      score = score - 2
    } else {
       score = score - 1
    }
    this.setState({letterUse, mystery, win, score})
  }

  computeDisplay(word, letterUse) {
    
    return word.replace(/\w/g,
      (letter) => (letterUse.has(letter) ? letter : '_')
    )
    
  }


  render() {
    const {mystery, letterUse, win, score} = this.state
    return (
      <div className="App">
        <div className='score'>
         <span>Score : {score}</span>
        </div>
        <div>
           <input 
            type='text'
            value={mystery}
            autoFocus
            onKeyPress={(e) => {this.handleClickLetter(e.key.toLocaleUpperCase())}} 
            onChange={() => mystery} />
        </div>
        <div className='letter-used'>
          Lettres utilisees : <span>{[...letterUse]}</span>
        </div>
          
        {
          win && <div><button onClick={() => this.reset()}>Rejouer</button></div>
        }
      </div>
    );
  }
  reset () {
    this.setState(this.initApp())
  }
}

export default App;
