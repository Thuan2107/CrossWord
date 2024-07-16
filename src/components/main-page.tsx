import React, { useState, useEffect } from 'react';

interface DataItem {
    answer: string;
    isShow: boolean;
}

const MainPage = () => {
    const [dataList, setDataList] = useState<DataItem[]>([
        { answer: '**chiaSe', isShow: false },
        { answer: '****tuOngtac', isShow: false },
        { answer: '******Congdong', isShow: false },
        { answer: '****stIcker', isShow: false },
        { answer: '*****bAiviet', isShow: false },
        { answer: '**binhLuan', isShow: false },
        { answer: '*xuhuoNg', isShow: false },
        { answer: '****kiEnthuc', isShow: false },
        { answer: '******Thaydoi', isShow: false },
        { answer: '*folloW', isShow: false },
        { answer: '****thOngtin', isShow: false },
        { answer: '****maRketing', isShow: false },
        { answer: '******Ketban', isShow: false },

    ]);

    const onClickShowAnswer = (index: number) => {
        setDataList(prevDataList => {
            const newDataList = [...prevDataList];
            newDataList[index].isShow = !newDataList[index].isShow;
            return newDataList;
        });
    }

    return (
        <div className='main-page'>
            <p className='title'>Trò chơi giải mã ô chữ</p>
            <div className='cross-word-wrapper'>
            {
                dataList.map((word, index) => (
                    <div key={index} className='word-line'>
                        <div>Câu số {index + 1}:</div>

                        <WordBoxGroup word={word} onClickShowAnswer={() => onClickShowAnswer(index)} />
                    </div>
                ))
            }
            </div>
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
            <div className='button-show' onClick={onClickShowAnswer}>
                {word.isShow ? "An dap an" : "Hien dap an"}
            </div>
        </>
    );
}

export default MainPage;
