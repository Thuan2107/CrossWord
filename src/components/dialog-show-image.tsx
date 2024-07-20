
import React, { useEffect } from 'react';

interface DialogProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, title, children, onClose }) => {

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
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <p style={{fontWeight: '900', fontSize: '20px'}}>{title}</p>
          {/* <button className="dialog-close-button" onClick={onClose}>
            &times;
          </button> */}
        </div>
        <div className="dialog-content">{children}</div>
      </div>
    </div>
  );
};

export default Dialog;
