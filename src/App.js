import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from 'axios'
import cn from "classnames";
// import { ReactComponent as Next } from "./assets/chevronDown.svg";
// import { ReactComponent as Prev } from "./assets/chevronUp.svg";
import "./VerticalCarousel.css";

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-a-vertical-carousel-component-in-react
 */

const App = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [question, setQuestion] = useState(data[0].introline)
  const [showOptionLabel, setShowOptionLabel] = useState('')
  const [selectedOptionLabel, setSelectedOptionLabel] = useState('')
  const [summary, setSummary] = useState([])

  // Used to determine which items appear above the active item
  const halfwayIndex = Math.ceil(data?.length / 2);

  // Usd to determine the height/spacing of each item
  const itemHeight = 20;

  // Used to determine at what point an item is moved from the top to the bottom
  const shuffleThreshold = halfwayIndex * itemHeight;

  // Used to determine which items should be visible. this prevents the "ghosting" animation
  const visibleStyleThreshold = shuffleThreshold / 2;

  const determinePlacement = (itemIndex) => {
    // If these match, the item is active
    if (activeIndex === itemIndex) return 0;

    if (itemIndex >= halfwayIndex) {
      if (activeIndex > itemIndex - halfwayIndex) {
        return (itemIndex - activeIndex) * itemHeight;
      } else {
        return -(data.length + activeIndex - itemIndex) * itemHeight;
      }
    }

    if (itemIndex > activeIndex) {
      return (itemIndex - activeIndex) * itemHeight;
    }

    if (itemIndex < activeIndex) {
      if ((activeIndex - itemIndex) * itemHeight >= shuffleThreshold) {
        return (data.length - (activeIndex - itemIndex)) * itemHeight;
      }
      return -(activeIndex - itemIndex) * itemHeight;
    }
  };

  const handleClick = (direction) => {
    setActiveIndex((prevIndex) => {
      if (direction === "next") {
        if (prevIndex + 1 > data?.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      }

      if (prevIndex - 1 < 0) {
        return data?.length - 1;
      }

      return prevIndex - 1;
    });
  };

  const selectOption = (question, answer) => {
    setSelectedOptionLabel(answer)
    setSummary([...summary, { question, answer }])
    setActiveIndex(activeIndex => activeIndex + 1)
  }

  const submitHandler = async () => {
    try {

      const result = await axios.post('https://carousel-task-851ad-default-rtdb.europe-west1.firebasedatabase.app/carousel.json', { summary })
      console.log("api result:", result)

    } catch (error) {
      console.log("api error:", error)
    }
  }

  useEffect(() => {
    setQuestion(data[activeIndex].introline)
    setSelectedOptionLabel('')
  }, [activeIndex])

  return (
    <div className="container">
      <section className="outer-container">
        <div className="carousel-wrapper">
          {/* <button
            type="button"
            className="carousel-button prev"
            onClick={() => handleClick("prev")}
          >
            Previous
          </button> */}

          <div className="carousel">
            <div className="slides">
              <div className="carousel-inner">
                {data?.map((item, i) => (
                  <button
                    type="button"
                    onClick={() => (
                      setActiveIndex(i), setQuestion(item.introline)
                    )}
                    className={`carousel-item ${activeIndex === i && 'activeItem'}`}
                    // className={cn("carousel-item", {
                    //   active: activeIndex === i,
                    //   visible:
                    //     Math.abs(determinePlacement(i)) <= visibleStyleThreshold
                    // })}
                    key={item.id}
                  // style={{
                  //   transform: `translateY(${determinePlacement(i)}px)`
                  // }}
                  >
                    {/* {item.introline} */}
                  </button>
                ))}
              </div>
              {/* <div className="carousel-inner">
                {data?.map((item, i) => (
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={cn("carousel-item", {
                      active: activeIndex === i,
                      visible:
                        Math.abs(determinePlacement(i)) <= visibleStyleThreshold
                    })}
                    key={item.id}
                    style={{
                      transform: `translateY(${determinePlacement(i)}px)`
                    }}
                  >
                    {item.introline}
                  </button>
                ))}
              </div> */}
              <div style={{ marginLeft: 50 }}>
                <h2>{question}</h2>
              </div>
            </div>
          </div>
          {
            activeIndex === data.length - 1 &&
            <div className="submit">
              <button onClick={() => submitHandler()}>Submit</button>
            </div>
          }
          {/* <button
            type="button"
            className="carousel-button next"
            onClick={() => handleClick("next")}
          >
            Next
          </button> */}
        </div>
        <div className="content">
          {/* <img
            src={data[activeIndex]?.content?.image}
            alt={data[activeIndex]?.content?.introline}
          />
          <p>{data[activeIndex]?.content?.copy}</p> */}
          {activeIndex !== data.length - 1 ? data[activeIndex]?.hoverContent?.map(item => (
            <div className="options">
              <img src={item.image} onMouseEnter={() => setShowOptionLabel(item.label)} onMouseLeave={() => setShowOptionLabel(selectedOptionLabel)} onClick={() => selectOption(data[activeIndex].introline, item.label)} />
              {(showOptionLabel === item.label || selectedOptionLabel === item.label) && <span>{item.label}</span>}
            </div>
          )) :
            <ul>
              {summary.map(item => (
                <li>
                  <div>
                    <h3>Question:</h3>
                    <span>{item.question}</span>
                  </div>
                  <div>
                    <h3>Answer:</h3>
                    <span>{item.answer}</span>
                  </div>
                </li>
              ))}
            </ul>
          }
        </div>
      </section>
    </div>
  );
};

App.propTypes = {
  data: PropTypes.array.isRequired,
  leadingText: PropTypes.string.isRequired
};

export default App;
