import React from 'react';
import { 
  IonContent, 
  IonPage, 
  IonButton, 
  IonText,
  IonImg
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Home.css';

// Import images
import logo from '../../public/logo.png';
import handRock from '../../public/hand-rock.png';
import handPaper from '../../public/hand-paper.png';
import handScissors from '../../public/hand-scissors.png';

const Home: React.FC = () => {
  const history = useHistory();

  const startGame = () => {
    history.push('/game');
  };

  return (
    <IonPage>
      <IonContent className="ion-padding ion-text-center">
        <div className="logo-container">
          <IonImg src={logo} className="logo bounce" />
        </div>
        
        <h1 className="title">Rock Paper Scissors</h1>
        <IonText color="medium" className="subtitle">
          The ultimate showdown!
        </IonText>
        
        <div className="hands-preview">
          <img src={handRock} alt="Rock" className="hand-preview rock" />
          <img src={handPaper} alt="Paper" className="hand-preview paper" />
          <img src={handScissors} alt="Scissors" className="hand-preview scissors" />
        </div>
        
        <IonButton 
          className="start-button"
          size="large" 
          expand="block" 
          onClick={startGame}
        >
          START GAME
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;