import React from "react";
import ImageCard from "./components/ImageCard";
import Wrapper from "./components/Wrapper";
import images from "./images.json";
import Clicker from "./components/Clicker"
import CardWrapper from "./components/CardWrapper";
import "./App.css";

class App extends React.Component {
  state = {
    characters: [],
    score: 0
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
    let clec = event.target.getAttribute("data-clicked");
    console.log(clec)
    if (event.target.getAttribute("data-clicked") === "true") {
      this.youLose();
    }
    else {
      let tempId = event.target.getAttribute("id")
      console.log(tempId)
      // We always use the setState method to update a component's state
      let newState = this.state.characters.filter((character) => { return character.id === tempId })
      newState[0].clicked = true;
      console.log(newState[0])
      this.setState({ newState });
      console.log(this.state)
      this.shuffle(images)
      this.setState({ score: this.state.score + 1 })
    }
  };

  youLose = () => {
    // We always use the setState method to update a component's state
    console.log("you lose")
    alert("You Lose!")
    this.setState({ score: 0 });
    this.shuffle(images)
  };

  //When the component loads, shuffle images.
  componentDidMount() {
    this.shuffle(images)
  }

  render() {
    return (
      <Wrapper>
        <Clicker score={this.state.score} />
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
