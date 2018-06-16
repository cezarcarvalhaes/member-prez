import React from "react";
import ImageCard from "./components/ImageCard";
import Wrapper from "./components/Wrapper";
import images from "./images.json";
import Clicker from "./components/Clicker"
import CardWrapper from "./components/CardWrapper";
import Hero from "./components/Hero";
import Modal from "./components/Modal";
import "./App.css";

class App extends React.Component {
  state = {
    characters: [],
    score: 0,
    topScore: 0,
    message: "",
    modal: false,
  };

  //Fisher-Yates shuffle function for shuffling images
  shuffle = (array) => {
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);
      // Decrease counter by 1
      counter--;
      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    this.setState({ characters: array });
  }


  // click sets this.state.clicked to true
  clickPic = (event) => {
    event.preventDefault();
    console.log(this.state.characters)
    //Checks if a pic has already been clicked
    if (event.target.getAttribute("data-clicked") === "true") {
      this.youLose();
    }
    else {
      //Change game message
      this.setState({message: "You Guessed Correctly!"})
      //Grabs id of the image that was clicked and saves to tempId
      let tempId = event.target.getAttribute("id")
      //Filters through our array to match our tempId and saves the current state to newState
      let newState = this.state.characters.filter((character) => { return character.id === tempId })
      //Because filter() returns an array, we're grabbing the first (and only) item in our array
      //Set that objects 'clicked' value to 'true'
      newState[0].clicked = true;
      //Updates our current characters array in our state
      this.setState({ newState });
      //Reshuffles the images
      this.shuffle(images)
      //Updates our score and top score.
      //Pass 'this.updateTopScore' as a second argument (callback) due to setState's async nature. 
      this.setState({ score: this.state.score + 1 }, this.updateTopScore)
    }
  };

  updateTopScore = ()=> {
    if (this.state.score >= this.state.topScore) {
      this.setState({topScore: this.state.score})
    }
  }

  resetFalse = ()=> {
    let resetCharacters = this.state.characters;
    for (var i = 0; i < resetCharacters.length; i++) {
      resetCharacters[i].clicked = false;
    }
    this.setState({characters: resetCharacters})
  }

  youLose = () => {
    this.setState({ modal: true });
    //Resets score
    this.setState({ score: 0 });
    //Change message
    this.setState({message: "You Lose!"});
    //Set all characters to clicked: false
    this.setState({characters: images});
    this.resetFalse();
    this.shuffle(images);
  };

  //When the component loads, shuffle images.
  componentDidMount() {
    this.shuffle(images)
  }

  reset = (event) => {
    event.preventDefault();
    this.setState({modal: false});
    this.setState({message: ""});
  }

  render() {
    let toggleModal 
    if (this.state.modal === true){
      toggleModal = "show"
    }
    else {
      toggleModal = "modal"
    }
    return (
      <Wrapper>
        <Modal modal = {toggleModal} score={this.state.topScore} reset={this.reset}/>
        <Clicker score={this.state.score} topScore={this.state.topScore} message= {this.state.message}/>
        <Hero/>
        <CardWrapper>
          {this.state.characters.map(img => (
            <ImageCard
              clickPic={this.clickPic}
              id={img.id}
              name={img.name}
              key={img.id}
              image={img.image}
              clicked={img.clicked}
            />
          ))}
        </CardWrapper>
      </Wrapper>
    )
  }

}

export default App;
