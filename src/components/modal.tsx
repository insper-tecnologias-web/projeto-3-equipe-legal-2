import { useEffect } from 'react';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isVisible, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isVisible) return null;

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target instanceof HTMLElement && e.target.id === 'modal-overlay')
      onClose();
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOutsideClick}
    >
      <div className="flex justify w-[95vw] items-center bg-white rounded-lg shadow-lg p-12 relative">
        <button
          className="absolute top-2 right-4 text-black text-3xl"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
