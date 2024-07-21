import React, { useState, useEffect, useRef } from 'react';
import Dialog from './dialog-show-image';
import question1 from '../images/chiase.gif'
import question2 from '../images/tuongtac.gif'
import question3 from '../images/congdong.gif'
import question4 from '../images/sticker.gif'
import question5 from '../images/baiviet.gif'
import question6 from '../images/binhluan.gif'
import question7 from '../images/xuhuong.gif'
import question8 from '../images/kienthuc.gif'
import question9 from '../images/thaydoi.gif'
import question10 from '../images/follow.gif'
import question11 from '../images/thongtin.gif'
import question12 from '../images/marketing.gif'
import question13 from '../images/ketban.gif'
import rules from '../images/rules.png'
import rulesSound from '../images/rules.mp4'
import clockVideo from '../images/clock-30s.mp4'
import olympia30s from '../images/tangtoc30s.mp4'


interface DataItem {
    answer: string;
    isShow: boolean;
    question: string
}

const MainPage = () => {
    const [dataList, setDataList] = useState<DataItem[]>([
        { answer: '**chiaSe', isShow: false, question: question1 },
        { answer: '****tuOngtac', isShow: false, question: question2 },
        { answer: '******Congdong', isShow: false, question: question3 },
        { answer: '****stIcker', isShow: false, question: question4 },
        { answer: '*****bAiviet', isShow: false, question: question5 },
        { answer: '**binhLuan', isShow: false, question: question6 },
        { answer: '*xuhuoNg', isShow: false, question: question7 },
        { answer: '****kiEnthuc', isShow: false, question: question8 },
        { answer: '******Thaydoi', isShow: false, question: question9 },
        { answer: '*folloW', isShow: false, question: question10 },
        { answer: '****thOngtin', isShow: false, question: question11 },
        { answer: '****maRketing', isShow: false, question: question12 },
        { answer: '******Ketban', isShow: false, question: question13 },
        { answer: '', isShow: false, question: rules },

    ]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isRules, setIsRules] = useState(false);

    
    

    const openDialog = (index: number) => {
        setIsDialogOpen(true);
        setIsRules(index == 13 ? true : false)
        setCurrentIndex(index)
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const onClickShowAnswer = (index: number) => {
        console.log("clickanswer", index)
        setDataList(prevDataList => {
            const newDataList = [...prevDataList];
            newDataList[index].isShow = true;
            return newDataList;
        });
    }

    return (
        <div className='main-page'>
            <div className='rules' onClick={() => openDialog(13)}>Thể lệ</div>
            <p className='title'>Trò chơi giải mã ô chữ</p>
            <div className='cross-word-wrapper'>
            {
                dataList.map((word, index) => (
                    index < 13 &&
                    <div key={index} className='word-line'>
                        <div style={{display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'space-between'}}>
                            <div 
                                style={{flex: '2'}}
                                className="question-number"
                                onClick={() => onClickShowAnswer(index)}>{index + 1}</div>
                            <div style={{flex: '8'}}  className='word-line'>
                                <WordBoxGroup word={word} onClickShowAnswer={() => onClickShowAnswer(index)} />
                            </div>
                            <div 
                                style={{flex: '2'}}
                                className="button-show-question"
                                onClick={() => openDialog(index)}
                               >?</div>
                        </div>
                       
                    </div>
                ))
            }
            </div>
            <Dialog isOpen={isDialogOpen} title={isRules ? '' : `Câu ${currentIndex + 1}`} onClose={closeDialog}>
                <img src={dataList[currentIndex].question} style={{width: '100%', height: 'auto'}}  />
                {!isRules 
                ? <div>
                    <video className='clock' autoPlay>
                        <source src={clockVideo} type="video/mp4" />
                    </video>
                    
                    <video className='clock' autoPlay style={{opacity: '0'}}>
                        <source src={olympia30s} type="video/mp4" />
                    </video>
                 </div>
                 : <video className='clock' autoPlay style={{opacity: '0'}}>
                        <source src={rulesSound} type="video/mp4" />
                    </video>
                }
            </Dialog>


        </div>
    );
}

interface WordBoxProps {
    character: string;
    isFlipped: boolean;
    delay: number;
}

const WordBox: React.FC<WordBoxProps> = ({ character, isFlipped, delay }) => {
    const isVisible = character !== '*';
    const isUppercase = character === character.toUpperCase();
    return (
        <div
            className={`word-box ${isFlipped ? 'flipped' : ''} ${isVisible ? '' : 'invisible'} ${isUppercase ? 'uppercase-red' : ''}`}
            style={{ transitionDelay: `${delay}s` }}
        >
            <div className='front'>?</div>
            <div className='back'>{character}</div>
        </div>
    );
}

interface WordBoxGroupProps {
    word: DataItem;
    onClickShowAnswer: () => void;
}

const WordBoxGroup: React.FC<WordBoxGroupProps> = ({ word, onClickShowAnswer }) => {
    const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);

    useEffect(() => {
        // Lật từng WordBox sau mỗi 0.5s khi isShow thay đổi
        if (word.isShow) {
            const lastIndex = word.answer.lastIndexOf('*');
            if (lastIndex !== -1) {
                const startFlipIndex = lastIndex + 1; // Bắt đầu lật từ vị trí sau dấu * cuối cùng
                const timeoutIds: NodeJS.Timeout[] = [];
                word.answer.slice(startFlipIndex).split('').forEach((_, index) => {
                    const timeoutId = setTimeout(() => {
                        setFlippedIndexes(prevIndexes => [...prevIndexes, startFlipIndex + index]);
                    }, 500 + index * 500); // Lật từng ô sau mỗi 0.5s
                    timeoutIds.push(timeoutId);
                });

                return () => {
                    timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
                };
            }
        }
    }, [word.isShow, word.answer]);

    return (
        <>
            {
                word.answer.split('').map((character, index) => (
                    <WordBox
                        key={index}
                        character={character}
                        isFlipped={flippedIndexes.includes(index)}
                        delay={index * 0.5} // Adjust delay here
                    />
                ))
            }
            {/* <div className='button-show' onClick={onClickShowAnswer}>
                {word.isShow ? "An dap an" : "Hien dap an"}
            </div> */}
        </>
    );
}

export default MainPage;
