import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

//Components
import Header from '../../components/header';
import Button from '../../components/buttons/containerButton';
import CorrectAnswer from '../../components/activities/correctAnswer';
import SplashScreen from '../../pages/activities/splashScreen';
import WrongAnswer from '../../components/activities/wrongAnswer';
import Tutorial from '../../components/modal/tutorialModal';

//Images
import paleLeaves from '../../images/whatIsWhatIs/pale_leaves.svg';
import iconBack from '../../images/icons/iconBack.svg';
import logo from '../../images/logo/whatIsWhatIs.svg';
import iconDelete from '../../images/whatIsWhatIs/iconDelete.svg';

// Styles
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #f3f3f3;

  @media (min-width: 1024px) {
    justify-content: center;
  }
`;

const Content = styled.div`
  padding-top: ${props => props.isModal && '2rem'};
  flex: 1;
  display: flex;
  align-items: ${props => !props.isModal && 'center'};
  z-index: 1;

  span {
    font-size: 2.5rem;
    font-weight: 700;
    color: #36A39A;
    line-height: 0;
    :last-child {
      padding-top: ${props => props.isModal ? '2.5rem' : '1rem'}
    }
  }
`;
const Title = styled.h1`
  width: 20rem;
  font-size: 1.5rem;
  font-weight: 900;
  line-height: 2rem;
  color: #373737;
  text-align: center;
  
  @media (max-width: 320px) { width: 18rem; }
`;

const IconLeaves = styled.img`
  position: absolute;
  top: ${props => props.top && '-20rem'};
  bottom: -14rem;
  right: -18.5rem;
  width: 36rem;
  z-index: ${props => props.zIndex && '-1'};

  @media (max-width: 360px) { width: 33rem; }
`;

const ContainerAnswer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  overflow: hidden;
  z-index: 1;

  @media (min-width: 1024px) {
    height: 60%;
  }
`;

const BoxAnswer = styled.div`
  padding: 0 2.6875rem;
  max-width: 425px;
  height: 100%;
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-direction: column;
`;

const ContentAnswer = styled.div`
  padding-top: ${props => props.padding && '2rem'};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 300px;
`;

const AnswerOption = styled.button`
  margin: 2% 3% 2% 3%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.25rem;
  font-size: 1.375rem;
  font-weight: bold;
  color: #fff;
  background: ${props => props.isSelected ? '#D5D5D5' : '#36A39A'};
  border-radius: 12px;
  box-shadow: ${props => props.isSelected ? '0 5px 0 #9F9F9F' : '0 5px 0 #148077'};
  
  @media (max-width: 360px) { margin: 2%; }
  @media (max-width: 320px) { margin: 2% 1% 3% 1%; }
`;

const IconDelete = styled.img`
  margin: 2% 3% 2% 3%;
 
  @media (max-width: 360px) { margin: 2%; }
  @media (max-width: 320px) { margin: 2% 1% 3% 1%; }
`;

const TextIndividualLetter = styled.p`
  margin: 0 .6%;
  margin-bottom: 1rem;
  width: 2rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 900;
  color: #36A39A;
  border-bottom: 1px solid #707070;

  :first-child{
    text-transform: capitalize;
  }
`;

const WhatIsWhatIs = ({ useActivitie, registerAction }) => {
  const [answer, setAnswer] = useState([]);
  const [letterOption, setLetterOption] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState([]);
  const [activitie, setActivitive] = useState(null);
  const [isModalAnswer, setIsModalAnswer] = useState(undefined);
  const [modalCorrectAnswer, setModalCorrectAnswer] = useState(false)
  const [modalWrongAnswer, setModalWrongAnswer] = useState(undefined);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [amountTrial, setAmountTrial] = useState(3);
  const [isTutorial, setIsTutorial] = useState(undefined);


  const handleAnswerSize = () => {
    let answerSplit = [];
    useActivitie?.answers[0]?.answer.split('').forEach((a, i) => {
      answerSplit.push('');
    });

    return answerSplit || [];
  }

  const handleShuffleLetter = () => {
    const answer = useActivitie?.answers[0]?.answer;
    const answerLength = answer.length;
    const qtdAmount = (answerLength <= 7 && 9 - answerLength) || (answerLength <= 8 && 14 - answerLength);
    const alphabetLetters = choosingAlphabetLetters(qtdAmount);
    const letterOption = answer + alphabetLetters;
    const lettersArray = letterOption.split('');

    let shuffleLetter = random(lettersArray).split('');
    shuffleLetter = shuffleLetter.map(a => (a));

    return shuffleLetter;
  }

  useEffect(() => {
    setLetterOption(handleShuffleLetter());
    setAnswer(handleAnswerSize());
    setActivitive(useActivitie);
    if(useActivitie.trailId === 0) {
      setIsTutorial(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useActivitie]);

  useEffect(() => {
    if (modalWrongAnswer) {
      registerAction({
        activityId: useActivitie.id,
        trailId: useActivitie.trailId,
        success: false,
        timestamp: Date.now()
      })
    }

    if (modalCorrectAnswer) {
      registerAction({
        activityId: useActivitie.id,
        trailId: useActivitie.trailId,
        success: true,
        timestamp: Date.now()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalCorrectAnswer, modalWrongAnswer])

  useEffect(() => {
    let timer1 = setTimeout(() => setIsLoading(false), 2000);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const handleIsModalAnswer = () => {
    setIsModalAnswer(true);
  }

  const handleClenAnswer = () => {
    setAnswer([]);
    setSelectedLetter([]);
  }

  const handleWrongAnswer = () => {
    setModalWrongAnswer(false);
  }

  const handleCloseTutorial = () => {
    setIsTutorial(false);
  }

  const handleClick = (event) => {
    event.stopPropagation();
    const correctAnser = useActivitie?.answers[0].answer;
    const selectedAnswer = answer.map(item => (item)).join("");

    if (selectedAnswer === correctAnser) {
      setModalCorrectAnswer(true)
      handleClenAnswer();
    } else {
      setSelectedLetter([]);
      setLetterOption(handleShuffleLetter());
      setAnswer(handleAnswerSize());
      setModalWrongAnswer(true);
      setAmountTrial(amountTrial - 1);
    }
  };

  const choosingAlphabetLetters = (quantity) => {
    let result = [];
    let characters = 'abcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;

    for (let i = 0; i < quantity; i++) {
      result.push(characters.charAt(Math.floor(Math.random() *
        charactersLength)));
    }

    return result.join('');
  };

  const random = (text) => {
    let temp = [];
    let originalLength = text.length;

    for (var i = 0; i < originalLength; i++) {
      temp.push(text.splice(Math.floor(Math.random() * text.length), 1));
    }

    return temp.join('');
  };


  const handleSelectedLetter = (event, index, letter) => {
    event.stopPropagation();
    const isSetterSelected = selectedLetter.find(i => index === i);
    let itemSelected = selectedLetter;
    let newAnswer = answer || [];

    if (!isSetterSelected) {
      if (selectedLetter.length <= answer.length - 1) {
        let empty = newAnswer.findIndex(i => i === '');
        newAnswer[empty] = letter;

        itemSelected = selectedLetter.concat(index);
      }
    }

    setSelectedLetter(itemSelected);
    setAnswer(newAnswer);
  };

  const handleEraseLetter = () => {
    let newAnswer = answer;
    let removeLastItem = selectedLetter;
    let empty = newAnswer.findIndex(i => i === '') - 1;

    if (empty === -2) {
      newAnswer[newAnswer.length - 1] = '';
    } else {
      newAnswer[empty] = '';
    }

    removeLastItem.pop();

    setAnswer([...newAnswer]);
    setSelectedLetter([...removeLastItem]);
  };

  const showModalAnswer = () => {
    setModalWrongAnswer(false);
    setModalCorrectAnswer(false);
    setShowAnswer(true);
  }

  const renderSquareAnswer = (letter) => {
    return (
      <TextIndividualLetter>
        {letter}
      </TextIndividualLetter>
    )
  }

  const renderIndividualLetters = () => {
    return letterOption.map((item, index) => {
      const letterSelected = selectedLetter.filter(i => index === i).length;

      return (
        <AnswerOption
          isSelected={letterSelected}
          onClick={(e) => handleSelectedLetter(e, index, item)}
        >
          {item}
        </AnswerOption>
      )
    });
  };

  const renderModalAnswerOption = () => (
    <ContainerAnswer>
      <figure>
        <IconLeaves top left zIndex src={paleLeaves} />
      </figure>
      <BoxAnswer>
        <ContentAnswer>
          {answer.map(i => renderSquareAnswer(i))}
        </ContentAnswer>
        <ContentAnswer padding>
          {renderIndividualLetters()}
          <IconDelete src={iconDelete} onClick={handleEraseLetter} />
        </ContentAnswer>
      </BoxAnswer>
      <Button
        handleClick={handleClick}
      >
        Confirmar Resposta
      </Button>
    </ContainerAnswer>
  )

  const renderScreen = () => {
    return (
      <>
        <Header iconBack={iconBack} title={activitie?.name} />
        <Content isModal={isModalAnswer}>
          <Title><span>"</span>{activitie?.question}</Title><span>"</span>
        </Content>
        <Button
          handleClick={handleIsModalAnswer}
        >
          responder
        </Button>
        {isModalAnswer && renderModalAnswerOption()}
      </>
    )
  }

  return (
    isLoading ? <SplashScreen activitieLogo={logo} /> : (
      <Container>
        {(
          !modalWrongAnswer
          && !modalCorrectAnswer
          && !showAnswer)
          && renderScreen()
        }
        {modalWrongAnswer && <WrongAnswer chances={amountTrial} handleClick={handleWrongAnswer} handleShowAnswer={showModalAnswer} />}
        {modalCorrectAnswer && <CorrectAnswer answer={useActivitie.answers[0]} toScore amountTrial={amountTrial} idActivitie={activitie.id}/>}
        {showAnswer && <CorrectAnswer answer={useActivitie.answers[0]} amountTrial={amountTrial} idActivitie={activitie.id}/>}
        {isTutorial && <Tutorial screen={activitie?.name} handleCloseTutorial={handleCloseTutorial} /> }
      </Container>
    )
  );
}

export default WhatIsWhatIs;
