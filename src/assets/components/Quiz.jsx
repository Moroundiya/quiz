import React, { createRef, useContext, useEffect, useRef, useState } from 'react'
import { QuizContext } from '../../App'
import { escape, unescape } from 'yizhi-html-escape'
import watch from '../images/watch.png'
import Countdown from "react-countdown";
// import Countdown360 from 'react-countdown360'

export const Quiz = () => {
    const { setPage, questions, questionNumber, setQuestionNumber, questionsAndAnswers, setScore, score, playAudio } = useContext(QuizContext)
    const [loading, setLoading] = useState(true)
    const [submitBtn, setSubmitBtn] = useState(false)
    const [showPrev, setShowPrev] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    const [time, setTime] = useState(false)


    const reflist = [...questionsAndAnswers[questionNumber].shuffleAnswers];
    const elementsRef = useRef(reflist.map(() => createRef()));
    // const elementArray = [elementsRef]
    // const elementsRefString = JSON.stringify(elementsRef);

    // let optionArray = [option1, option2, option3, option4]


    const Completionist = () => <span className='color text-2xl mt-1' >00:00</span>;

    const renderer = ({ minutes, seconds, completed }) => {

        if (seconds < 46) {
            minutes = '0' + minutes
        }

        if (seconds < 10) {
            seconds = '0' + seconds
        } else {
            seconds = seconds
            minutes = minutes
        }

        if (isSelected) {
            return (
                <Completionist />
            )
        }

        if (completed) {
            // Render a complete state
            setIsSelected(true)
            alert("Your time is up for this particular question, you can't pick any answer again kindly move to the next question.")
            // return (
            // <Completionist />
            // )

        } else {
            // Render a countdown
            return (
                <span className='color text-2xl mt-1'>
                    {minutes}:{seconds}
                </span>
            );

        }
    };

    useEffect(() => {

        // console.log('myRefs is ' + myRefs)
        // const showRef = JSON.stringify(myRefs)
        console.log('refLists is ' + reflist)
        // console.log('elementArray is ' + JSON.stringify(elementsRef.current))
        // console.log('ElementRefString is ' + elementsRef.current[0])
        // console.log(typeof elementsRef)
        // console.dir(elementsRef.current)



        setTimeout(() => {
            setLoading(false)
        }, 1000);

        // console.log('import questions is ' + JSON.stringify(questionsAndAnswers))

        if (questionNumber < 1) {
            setShowPrev(false)
        } else {
            setShowPrev(true)
        }

        if (questionNumber == questionsAndAnswers.length - 1) {
            setSubmitBtn(true)
            setShowPrev(false)
        }

        console.log('score is ' + score)

    }, [questionNumber, questionsAndAnswers, score])


    const highlightAnswer = () => {

    }
    const checkAnswer = (e, val) => {
        // setIsSelected(true)
        if (e.currentTarget.dataset.id === val[questionNumber].correctAnswer) {
            console.log('Correct')
            // setCorrect(true)
            setScore(score + 1)
            e.currentTarget.classList.add('correct')
        } else {
            // console.log('Wrong')
            e.currentTarget.classList.add('wrong')

            elementsRef.current.map((ele) => {

                if (ele.current.dataset.id === questionsAndAnswers[questionNumber].correctAnswer) {
                    ele.current.classList.add('correct')
                }

            })

            console.log(val[questionNumber].correctAnswer)
            // optionArray[questionsAndAnswers[questionNumber].correctAnswer].current.classList.add('correct')
            // e.currentTarget.classList.add('correct')
            // val[questionNumber].correctAnswer.classList.add('correct')

            // setCorrect(false)
        }

        // val[questionNumber].correctAnswer.current.classList.add('correct')

        setIsSelected(true)



    }

    const stopAudio = () => {
        playAudio.pause();
        playAudio.currentTime = 0;
    }


    return (
        <>
            {
                loading ?
                    <div className='bg-quiz-bg bg-top sm:bg-center bg-cover bg-no-repeat pt-8 pb-20 w-full min-h-full px-3.5 md:py-20 font-jost flex flex-col justify-center items-center'>
                        <div className='animate-pulse flex justify-center items-center flex-col'>
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-7 h-7 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                            <p className='text-white mt-3 text-sm'>Loading Quiz...</p>
                        </div>
                    </div>
                    :
                    <div className='bg-quiz-bg bg-top sm:bg-center bg-cover bg-no-repeat pt-8 pb-20 w-full min-h-screen px-3.5 md:py-20 font-jost relative flex flex-col items-center'>
                        <p className='absolute bottom-2 text-center w-full text-white opacity-40 text-sm left-0'>Designed by Moroundiya 😎</p>
                        <div className='w-full flex lg:w-3/5 justify-between items-center'>
                            <h1 className='text-3xl font-paci font-regular color h-auto py-2 pe-1 animate__animated animate__zoomIn'>iQuiz</h1>
                            <div className='flex justify-center items-center space-x-2'>
                                <img src={watch} className='w-[23px] h-[26px]' alt="" />
                                <Countdown date={Date.now() + 45000} renderer={renderer} key={questionNumber} />
                                {/* <Countdown360 seconds={10} onComplete={completetime} smooth={true} /> */}

                            </div>
                        </div>
                        <div className='w-full md:w-4/5 lg:w-3/5 2xl:w-3/6 mt-10 md:mt-24 h-auto bg-white rounded-xl md:rounded-3xl overflow-hidden'>
                            <div className='bg-[#F7F8FA] px-5 py-10 h-auto flex flex-col xl:px-16 xl:py-16 justify-center items-center relative' key={questionNumber}>
                                <div className='bg-color text-sm text-white inline-block px-4 py-1 xl:text-lg rounded-3xl absolute -bottom-3 font-semibold'>
                                    <h1>QUESTION <span>{questionNumber + 1}</span>/<span>{questions.length}</span></h1>
                                </div>
                                <h1 className={`text-xl lg:text-3xl uppercase text-center font-bold animate__animated animate__fadeInDown`}>
                                    {unescape(questionsAndAnswers[questionNumber]?.question)}
                                </h1>

                                <div className='flex gap-2 mt-1 animate__animated animate__fadeInUp'>
                                    <p className='text-black text-[11.5px] xl:text-[15px] opacity-40 mt-1'>Category: <span className='font-bold'>{unescape(questionsAndAnswers[questionNumber]?.category)}</span></p>
                                    <span className='opacity-40'>|</span>
                                    <p className='text-black text-[11.5px] xl:text-[15px] opacity-40 mt-1'>Difficulty: <span className='font-bold capitalize'>{questionsAndAnswers[questionNumber]?.difficulty}</span></p>
                                </div>
                            </div>
                            <div className='bg-white h-1/2 py-10 px-3 xl:px-8'>
                                <div className="flex flex-col space-y-3 rounded dark:border-gray-700" key={questionNumber}>
                                    {questionsAndAnswers[questionNumber].shuffleAnswers.map((ans, i) => {
                                        return (
                                            <button key={i} disabled={isSelected} ref={elementsRef.current[i]} onClick={(e) => { checkAnswer(e, questionsAndAnswers), highlightAnswer() }} data-id={unescape(ans)} className={`w-full py-2 cursor-pointer ps-2.5 text-sm xl:text-[17px] text-left rounded-md font-medium text-gray-900 bg-gray-100 border-gray-300 animate__animated animate__fadeInRight animate_${i}ms`}>
                                                {unescape(ans)}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={`bg-[#F7F8FA] h-auto flex w-full ${showPrev ? 'justify-between' : 'justify-end'} items-center py-5 px-3`}>
                                <button type="button" onClick={() => setQuestionNumber(questionNumber - 1)} className={`text-gray-900 bg-white border border-gray-300 focus:outline-none ${showPrev ? 'flex' : 'hidden'} justify-center items-center hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-3 py-1.5 uppercase me-2`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='me-1' width="16" height="16" viewBox="0 0 256 256"><path fill="black" d="M228 128a12 12 0 0 1-12 12H69l51.52 51.51a12 12 0 0 1-17 17l-72-72a12 12 0 0 1 0-17l72-72a12 12 0 0 1 17 17L69 116h147a12 12 0 0 1 12 12" /></svg>
                                    PREV
                                </button>
                                {
                                    submitBtn ?
                                        <button type="button" onClick={() => {
                                            setTimeout(() => {
                                                setPage('score')
                                            }, 1000),
                                                stopAudio()
                                        }} className="text-white bg-color rounded-full text-sm px-3 flex item-center justify-center py-1.5 text-center me-2 font-semibold">
                                            SUBMIT
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" className='ms-1' viewBox="0 0 256 256"><path fill="white" d="m224.49 136.49l-72 72a12 12 0 0 1-17-17L187 140H40a12 12 0 0 1 0-24h147l-51.49-51.52a12 12 0 0 1 17-17l72 72a12 12 0 0 1-.02 17.01" /></svg>
                                        </button> :
                                        <button type="button" onClick={() => { setQuestionNumber(questionNumber + 1), setIsSelected(false) }} className="text-white bg-color rounded-full text-sm px-3 flex item-center justify-center py-1.5 text-center me-2 font-semibold">
                                            NEXT
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" className='ms-1' viewBox="0 0 256 256"><path fill="white" d="m224.49 136.49l-72 72a12 12 0 0 1-17-17L187 140H40a12 12 0 0 1 0-24h147l-51.49-51.52a12 12 0 0 1 17-17l72 72a12 12 0 0 1-.02 17.01" /></svg>
                                        </button>
                                }
                            </div>
                        </div>
                    </div >
            }
        </>
    )
}