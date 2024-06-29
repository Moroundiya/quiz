import { createContext, useState } from 'react'
import { Quiz } from './assets/components/Quiz'
import { Welcome } from './assets/components/Welcome'
import { Score } from './assets/components/Score';
import 'animate.css';
import audio from './assets/audio/background-music-instrumental-207886.mp3'

export const QuizContext = createContext();
function App() {

  const [page, setPage] = useState('welcome')
  const [questions, setQuestions] = useState({})
  const [questionNumber, setQuestionNumber] = useState(0)
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([])
  const [questionsLoad, setQuestionsLoad] = useState(false)
  const [name, setName] = useState('')
  const [score, setScore] = useState(0)
  const [playAudio, setPlayAudio] =useState(new Audio(audio));


  // const [storeIncomplete, setStoreIncomplete] = useState([])
  // const [storeAnswer, setStoreAnswer] = useState('')





  return (
    <>
      <QuizContext.Provider value={{ page, setPage, setQuestions, questions, name, setName, questionNumber, setQuestionNumber, questionsAndAnswers, setQuestionsAndAnswers, questionsLoad, setQuestionsLoad, score, setScore, playAudio }}>
        {/* {welcomePage ? <Welcome /> : <Quiz />} */}
        {page === 'welcome' && <Welcome />}
        {page === 'quiz' && <Quiz />}
        {page === 'score' && <Score />}
      </QuizContext.Provider>
    </>

  )
}

export default App
