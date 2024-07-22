
import React, { useEffect } from 'react';
import showGift from '../images/sound-gift.mp4'
import Confetti from 'react-confetti';


interface DialogProps {
  isOpen: boolean;
  title: string;
  image: string;
  onClose: () => void;
}

const ShowGift: React.FC<DialogProps> = ({ isOpen, title, image, onClose }) => {

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };

  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay-gift " onClick={onClose}>
      <div className="dialog-gift" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <p style={{fontWeight: '900', fontSize: '20px'}}>{title}</p>
          <div className="box">
            <div className="box-body">
              <img className="img" src={image} />
              <div className="box-lid">
                
                <div className="box-bowtie"></div>
                
              </div>
            </div>
          </div>
        </div>
        <div className="dialog-content">

        </div>
      </div>
      <video className='clock' autoPlay style={{opacity: '0'}}>
          <source src={showGift} type="video/mp4" />
      </video>
      <Confetti />
    </div>
  );
};

export default ShowGift;
