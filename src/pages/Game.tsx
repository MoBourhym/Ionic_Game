import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/react';
import { arrowBack, refresh, trophy, happy, sad } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Game.css';

// Import images
import handRock from '../../public/hand-rock.png';
import handPaper from '../../public/hand-paper.png';
import handScissors from '../../public/hand-scissors.png';
import thinking from '../../public/thinking.jpg';

const Game: React.FC = () => {
  const history = useHistory();
  const choices = ['rock', 'paper', 'scissors'];
  
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [computerChoice, setComputerChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [roundHistory, setRoundHistory] = useState<Array<{
    player: string;
    computer: string;
    result: string;
  }>>([]);

  const goToHome = () => {
    history.push('/home');
  };

  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setRoundHistory([]);
  };

  const makeChoice = (choice: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setPlayerChoice(choice);
    setComputerChoice(null);
    setResult(null);
    
    // Simulate computer thinking
    setTimeout(() => {
      const compChoice = choices[Math.floor(Math.random() * 3)];
      setComputerChoice(compChoice);
      const roundResult = determineWinner(choice, compChoice);
      setRoundHistory(prev => [...prev, {
        player: choice,
        computer: compChoice,
        result: roundResult
      }].slice(-5)); // Keep only last 5 rounds
      setIsAnimating(false);
    }, 1000);
  };
  
  const determineWinner = (player: string, computer: string) => {
    if (player === computer) {
      setResult('draw');
      return 'draw';
    } else if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      setResult('win');
      setPlayerScore(prevScore => prevScore + 1);
      return 'win';
    } else {
      setResult('lose');
      setComputerScore(prevScore => prevScore + 1);
      return 'lose';
    }
  };
  
  const getResultMessage = () => {
    if (result === 'draw') {
      return "It's a draw!";
    } else if (result === 'win') {
      return "You win!";
    } else if (result === 'lose') {
      return "Computer wins!";
    }
    return "";
  };

  const getChoiceImage = (choice: string | null) => {
    if (!choice) return thinking;
    
    switch (choice) {
      case 'rock':
        return handRock;
      case 'paper':
        return handPaper;
      case 'scissors':
        return handScissors;
      default:
        return thinking;
    }
  };

  const getResultIcon = () => {
    if (result === 'win') return happy;
    if (result === 'lose') return sad;
    return trophy;
  };

  return (
    <IonPage>
      <IonHeader className="game-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={goToHome}>
              <IonIcon icon={arrowBack} size="large" />
            </IonButton>
          </IonButtons>
          <IonTitle className="game-title">Rock Paper Scissors</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={resetGame}>
              <IonIcon icon={refresh} size="large" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding ion-text-center">
        <div className="score-container">
          <IonCard className="score-card player-score">
            <IonCardHeader>
              <IonCardTitle>You</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="score-value">{playerScore}</div>
            </IonCardContent>
          </IonCard>
          
          <IonCard className="score-card computer-score">
            <IonCardHeader>
              <IonCardTitle>Computer</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="score-value">{computerScore}</div>
            </IonCardContent>
          </IonCard>
        </div>
        
        <div className="game-area">
          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <div className="choice player">
                  <h3 className="choice-title">Your Choice</h3>
                  <div className={`choice-display ${isAnimating ? 'animated' : ''}`}>
                    <IonImg 
                      src={getChoiceImage(playerChoice)} 
                      className={`choice-image ${playerChoice || 'thinking'}`}
                    />
                  </div>
                </div>
              </IonCol>
              <IonCol size="6">
                <div className="choice computer">
                  <h3 className="choice-title">Computer's Choice</h3>
                  <div className={`choice-display ${isAnimating ? 'animated' : ''}`}>
                    <IonImg 
                      src={getChoiceImage(computerChoice)} 
                      className={`choice-image ${computerChoice || 'thinking shake'}`}
                    />
                  </div>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
          
          {result && (
            <IonCard className={`result-card ${result}`}>
              <IonCardHeader>
                <IonIcon icon={getResultIcon()} size="large" />
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <h2 className="result-text">{getResultMessage()}</h2>
                </IonText>
              </IonCardContent>
            </IonCard>
          )}
          
          <div className="controls">
            <IonButton 
              className="choice-button rock"
              expand="block" 
              onClick={() => makeChoice('rock')}
              disabled={isAnimating}
            >
              <IonImg src={handRock} className="button-icon" />
              Rock
            </IonButton>
            <IonButton 
              className="choice-button paper"
              expand="block" 
              onClick={() => makeChoice('paper')}
              disabled={isAnimating}
            >
              <IonImg src={handPaper} className="button-icon" />
              Paper
            </IonButton>
            <IonButton 
              className="choice-button scissors"
              expand="block" 
              onClick={() => makeChoice('scissors')}
              disabled={isAnimating}
            >
              <IonImg src={handScissors} className="button-icon" />
              Scissors
            </IonButton>
          </div>
        </div>

        {roundHistory.length > 0 && (
          <IonCard className="history-card">
            <IonCardHeader>
              <IonCardTitle>Recent Games</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="history-list">
                {roundHistory.map((round, index) => (
                  <div key={index} className={`history-item ${round.result}`}>
                    <span>You: {round.player}</span>
                    <span>vs</span>
                    <span>Comp: {round.computer}</span>
                    <span className="result-badge">
                      {round.result === 'win' ? '✓' : round.result === 'lose' ? '✗' : '='}
                    </span>
                  </div>
                ))}
              </div>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Game;