import { useEffect, useReducer, useState } from 'react'

import Main from './components/Main'
import Header from './components/Header'
import Error from './components/Error'
import Loader from './components/Loader'
import StartScreen from './components/StartScreen'
import Question from './components/Question'
import NextButton from './components/NextButton'
import Progress from './components/Progress'
import FinishedScreen from './components/FinishedScreen'
import Footer from './components/Footer'
import Timer from './components/Timer'
import './index.css'

const SECS_PER_QUESTION = 30
const initialState = {
  questions: [],
  status: 'loading', //'loading', 'error', 'ready', 'active', 'finished'
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null
}
function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }
    case 'dataFailed':
      return {
        ...state,
        status: 'error'
      }
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION
      }
    case 'finished':
      return {
        ...state,
        answer: null,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore
      }
    case 'restart':
      return {
        ...state,
        index: 0,
        points: 0,
        highscore: 0,
        status: 'ready'
      }
    case 'newAnswer':
      const curQuestion = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points:
          curQuestion.correctOption === action.payload
            ? state.points + curQuestion.points
            : state.points
      }
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null }
    case 'tick':
      const isTimeout = state.secondsRemaining === 0
      return {
        ...state,
        secondsRemaining: isTimeout
          ? state.questions.length * SECS_PER_QUESTION
          : state.secondsRemaining - 1,
        status: isTimeout ? 'finished' : state.status
      }
    default:
      break
  }
}

export default function ReactQuiz() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining
  } = state
  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce((prev, current) => {
    return prev + current.points
  }, 0)

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const res = await fetch(`http://localhost:9000/questions`)
        if (!res.ok)
          throw new Error('Something went wrong with fetching questions')
        const data = await res.json()

        dispatch({ type: 'dataReceived', payload: data.slice(0, 2) })
      } catch (err) {
        console.log(err.message)
        dispatch({ type: 'dataFailed' })
      }
    }
    fetchQuestion()
  }, [])

  return (
    <>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <NextButton
              answer={answer}
              dispatch={dispatch}
              index={index}
              numQuestions={numQuestions}
            />
          </>
        )}

        <Footer>
          {status === 'active' && (
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
          )}
          {status === 'finished' && (
            <FinishedScreen
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              dispatch={dispatch}
              highscore={highscore}
            />
          )}
        </Footer>
      </Main>
    </>
  )
}
