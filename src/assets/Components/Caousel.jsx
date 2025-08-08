import { useState } from 'react';
import '../../App.css'

const images = [
  {
    src: 'imgs\header-1.png',
    caption: 'Desde Santiago, rescatamos vidas.',
  },
  {
    src: 'imgs\header-1.png',
    caption: 'Cada adopción crea un nuevo hogar.',
  },
  {
    src: 'imgs\header-1.png',
    caption: 'Un hogar más para quienes más lo necesitan.',
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="carousel">
      <div className="slides-container" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((img, i) => (
          <div key={i} className="slide">
            <img src={img.src} alt={img.caption} />
            <p>{img.caption}</p>
          </div>
        ))}
      </div>

      <div className="indicators">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`dot ${i === current ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}