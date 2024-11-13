import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { useSnackbar } from "react-simple-snackbar";
import { Row, Col } from "reactstrap";
import "./VerticalCarousel.css";
import Summary from "./components/Summary";
import Options from "./components/Options";

const App = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [question, setQuestion] = useState(data[0].introline);
  const [summary, setSummary] = useState([]);
  const [animate, setAnimate] = useState(true);

  const loadingRef = useRef(null);
  const [openSnackbar] = useSnackbar();

  const selectOption = (question, answer) => {
    setAnimate(false);
    setTimeout(() => {
      setAnimate(true);
    }, 100);
    setActiveIndex((activeIndex) => activeIndex + 1);
    const questionExist = summary.find((obj) => obj.question === question);
    if (questionExist) {
      const index = summary.findIndex((obj) => obj.question === question);
      questionExist.answer = answer;
      summary.splice(index, 1, questionExist);
    } else {
      setSummary([...summary, { question, answer }]);
    }
  };

  const submitHandler = async () => {
    loadingRef.current.continuousStart();
    try {
      const result = await axios.post(
        "https://carousel-task-851ad-default-rtdb.europe-west1.firebasedatabase.app/carousel.json",
        { summary }
      );
      if (result) {
        loadingRef.current.complete();
        openSnackbar("Successfully Submitted!");
        setActiveIndex(0);
        setSummary([]);
      }
    } catch (error) {
      loadingRef.current.complete();
      openSnackbar("Something Went Wrong!");
      console.log("api error:", error);
    }
  };

  const buttonClickHandler = (i, introline) => {
    setAnimate(false);
    setTimeout(() => {
      setAnimate(true);
    }, 100);
    setActiveIndex(i);
    setQuestion(introline);
  };

  useEffect(() => {
    setQuestion(data[activeIndex].introline);
  }, [activeIndex]);

  return (
    <div className="container">
      <LoadingBar color="#f11946" ref={loadingRef} />
      <section className="outer-container">
        <Row>
          <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
            <div className="carousel-wrapper">
              <div className="carousel">
                <div className="slides">
                  <div className="">
                    {data?.map((item, i) => (
                      <button
                        type="button"
                        onClick={() => buttonClickHandler(i, item.introline)}
                        className={`carousel-item ${
                          activeIndex === i && "activeItem"
                        }`}
                        key={item.id}
                      ></button>
                    ))}
                  </div>
                  {animate && (
                    <div style={{ marginLeft: 50 }}>
                      <h2 className="questionAnimation">{question}</h2>
                    </div>
                  )}
                </div>
              </div>
              {activeIndex === data.length - 1 && (
                <div className="submit" getBy>
                  <button onClick={() => submitHandler()}>Submit</button>
                </div>
              )}
            </div>
          </Col>
          <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
            <div className="content">
              {activeIndex !== data.length - 1 ? (
                data[activeIndex]?.hoverContent?.map((item) => (
                  <Options
                    item={item}
                    selectOption={selectOption}
                    data={data}
                    activeIndex={activeIndex}
                    summary={summary}
                  />
                ))
              ) : (
                <Summary summary={summary} />
              )}
            </div>
          </Col>
        </Row>
      </section>
    </div>
  );
};

App.propTypes = {
  data: PropTypes.array.isRequired,
  leadingText: PropTypes.string.isRequired,
};

export default App;
