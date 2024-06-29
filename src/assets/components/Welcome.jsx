import React, { useContext, useState, useEffect } from 'react'
import { QuizContext } from '../../App'
import axios from 'axios';
// import audio from '../audio/background-music-instrumental-207886.mp3';
import { escape, unescape } from 'yizhi-html-escape'

export const Welcome = () => {

    const { page, setPage, setQuestions, questions, questionNumber, setQuestionNumber,
        questionsAndAnswers, setQuestionsAndAnswers, questionsLoad,
        setQuestionsLoad, name, setName, playAudio } = useContext(QuizContext)
    const [category, setCategory] = useState('')
    const [level, setLevel] = useState('')
    const [limit, setLimit] = useState('')

    const getQuiz = async (e) => {
        e.preventDefault();
        try {
            await axios.get(`https://opentdb.com/api.php?amount=${limit}&category=${category}&difficulty=${level}`)
                .then(res => {
                    setQuestions(res.data.results)
                    setQuestionsAndAnswers(
                        res.data.results.map(eachQuestion => {
                            return {
                                question: eachQuestion.question,
                                shuffleAnswers: shuffleArray([...eachQuestion.incorrect_answers, eachQuestion.correct_answer]),
                                correctAnswer: eachQuestion.correct_answer,
                                category: eachQuestion.category,
                                difficulty: eachQuestion.difficulty,
                                selectedAnswer: ''
                            }
                        })
                    )
                })

            setPage('quiz')
            setQuestionsLoad(true)
            playAudio.play();

        }
        catch (err) {
            // console.log(err)
            alert(err.message)
        }

    }



   

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {

            // Generate random number 
            var j = Math.floor(Math.random() * (i + 1));

            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    }
    useEffect(() => {
        // console.log('Questions and Answer is ' + JSON.stringify(questionsAndAnswers))
    }, [questions, questionsAndAnswers])


    return (
        <>
            <div className='bg-quiz-bg bg-top sm:bg-center bg-cover bg-no-repeat py-8 w-full min-h-full px-3.5 md:py-20 font-jost relative overflow-hidden flex flex-col items-center'>
                <p className='absolute bottom-2 text-center w-full text-white opacity-40 text-sm left-0'>Designed by Moroundiya 😎</p>
                <div className='w-full flex lg:w-3/5 justify-center items-center'>
                    <h1 className='text-4xl font-paci font-regular color h-auto py-2 pe-1 animate__animated animate__zoomIn'>iQuiz</h1>
                </div>

                <div className='mt-10 w-full'>
                    <form className="w-full mx-auto lg:w-[350px]" onSubmit={(e) => { getQuiz(e) }}>
                        <div className='mb-5 animate__animated animate__fadeInRight animate_50ms'>
                            <label for="name" className="block mb-2 text-sm  font-medium text-white">Name</label>
                            <input type="text" id="name" onInput={(e) => { setName(e.target.value) }} className="bg-gray-50 border capitalize border-orange-500 text-black text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder="Enter your name" required />
                        </div>
                        <div className='mb-5 animate__animated animate__fadeInRight animate_200ms'>
                            <label for="categories" className="block mb-2 text-sm font-medium  text-white">Select Category</label>
                            <select onChange={(e) => setCategory(e.target.value)} id="categories" className="bg-gray-50 border border-orange-500  text-black text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500">
                                <option value="any" selected>Any Category</option>
                                <option value="9">General Knowledge</option>
                                <option value="10">Entertainment: Books</option>
                                <option value="11">Entertainment: Film</option>
                                <option value="12">Entertainment: Music</option>
                                <option value="13">Entertainment: Musicals &amp; Theatres</option>
                                <option value="14">Entertainment: Television</option>   
                                <option value="15">Entertainment: Video Games</option>
                                <option value="16">Entertainment: Board Games</option>
                                <option value="17">Science &amp; Nature</option>
                                <option value="18">Science: Computers</option>
                                <option value="19">Science: Mathematics</option>
                                <option value="20">Mythology</option>
                                <option value="21">Sports</option>
                                <option value="22">Geography</option>
                                <option value="23">History</option>
                                <option value="24">Politics</option>
                                <option value="25">Art</option>
                                <option value="26">Celebrities</option>
                                <option value="27">Animals</option>
                                <option value="28">Vehicles</option>
                                <option value="29">Entertainment: Comics</option>
                                <option value="30">Science: Gadgets</option>
                                <option value="32">Entertainment: Cartoon &amp; Animations</option>
                            </select>
                        </div>
                        <div className='mb-5 animate__animated animate__fadeInRight animate_350ms'>
                            <label for="difficuties" className="block mb-2 text-sm font-medium  text-white">Select Difficuties</label>
                            <select id="difficuties" onChange={(e) => setLevel(e.target.value)} className="bg-gray-50 border border-orange-500  text-black text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500">
                                <option value="any" selected>Any Difficulty</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                        <div className='mb-5 animate__animated animate__fadeInRight animate_500ms'>
                            <label for="number-input" className="block mb-2 text-sm font-medium  text-white">Enter Number of Questions</label>
                            <input type="number" id="number-input" onInput={(e) => setLimit(e.target.value)} aria-describedby="helper-text-explanation" className="bg-gray-50 border  border-orange-500 text-black text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" min={10} max={20} placeholder="10 - 20" required />
                        </div>

                        <div className='mt-10 flex flex-col justify-center items-center animate__animated animate__zoomIn'>
                            <button type="submit" className="text-white bg-color rounded-full text-md px-4 inline-flex item-center justify-center py-2 text-center me-2 font-semibold">
                                START QUIZ
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}
