import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getActivitiesThunk } from '../../dataflow/thunks/activities-thunk'
import styled from 'styled-components';

//Components
import Header from '../../components/header/index';
import TrailsWhatIs from '../../components/trails/whatIsWhatIs';
import Footer from '../../components/footer/index';

const mapDispatchToProps = dispatch => ({
  getActivities: (trailId) => dispatch(getActivitiesThunk(trailId))
});

const mapStateToProps = state => ({
  activities: state.activities
})

// Styles
const Container = styled.div`
  margin: auto;
  width: 90vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Acitivities = (props) => {
  const { trailId } = useParams();
  const [nextQuestion, setNextQuestion] = useState(0);
  const [isAnswer, setIsAnswer] = useState('disco');

  useEffect(() => {
    props.getActivities(trailId)
  }, []);

  let listLetter = ['disco', 'chuva', 'rua'];

  const handleNextQuestion = () => {
    setNextQuestion(nextQuestion + 1);
    setIsAnswer(listLetter[nextQuestion + 1])
  };

  return (
    <Container>
      <Header />
      <TrailsWhatIs
        renderQuestion={nextQuestion}
        isAnswer={isAnswer}
      />
      <Footer
        // handleCleanAnswer={handleCleanAnswer}
        handleNextQuestion={handleNextQuestion}
      />
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Acitivities);