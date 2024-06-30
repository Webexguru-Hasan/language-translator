
import { FaCopy, FaExchangeAlt, FaVolumeUp } from 'react-icons/fa';
import './css/styles.css';
const copy = FaCopy
const volume = FaVolumeUp
const exchange = FaExchangeAlt
function App() {
  return (
    <>
    <div className='app__body'>
      <div className='app__container'>

        {/* app-left */}
        <div className='app__container--left'>
          {/* left-header-part */}
          <div className='left__header'>
            <button className='btn__detected'>Detected Language</button>
            <button className='btn__english'>English</button>
            <button className='btn__bengali'>Bengali</button>
            <select name='languages' className='left__language--switch'>
              <option value="language">English</option>
              <option value="language">Bengalis</option>
            </select>
          </div>
          {/* left-content-part */}
          <div className='content__area'></div>
          {/* left-footer-part */}
          <div className='left__footer'></div>
        </div>

        {/* app-right */}
        <div className='app__container--right'>
          {/* right-header-part */}
        <div className='right__header'></div>
          {/* right-content-part */}
        <div className='content__area'></div>
          {/* right-footer-part */}
        <div className='right__footer'></div>
        </div>

      </div>
    </div>
    </>
  );
}

export default App;
