
import { FaCopy, FaExchangeAlt, FaVolumeUp } from 'react-icons/fa';
import './css/styles.css';

function App() {
  return (
    <>
    <div className='app__body'>
      <div className='app__container'>

        {/* app-left */}
        <div className='app__container--left'>
          {/* left-header-part */}
          <div className='app__header'>
            <button className='btn btn__detected'>Detected Language</button>
            <button className='btn btn__language'>English</button>
            <button className='btn btn__language'>Bengali</button>
            <select name='languages' className='left__language--switch'>
              <option value="en">English</option>
              <option value="bn">Bengalis</option>
            </select>
          </div>
          {/* left-content-part */}
          <div className='content__area'></div>
          {/* left-footer-part */}
          <div className='app__footer'>
            <div className='copy__sound--icon'>
              <button className='btn__icon'><FaCopy className='icon' /></button>
              <button className='btn__icon'><FaVolumeUp className='icon' /></button>
            </div>
            <button className='btn btn__detected'>Translate</button>
          </div>
        </div>

        {/* app-right */}
        <div className='app__container--right'>
          {/* right-header-part */}
        <div className='app__header'>
        <button className='btn btn__language'>English</button>
            <button className='btn btn__language'>Bengali</button>
            <select name='languages' className='left__language--switch'>
              <option value="en">English</option>
              <option value="bn">Bengalis</option>
            </select>
            <button className='btn__icon'><FaExchangeAlt className='icon' /></button>
        </div>
          {/* right-content-part */}
        <div className='content__area'></div>
          {/* right-footer-part */}
        <div className='app__footer'>
        <div className='copy__sound--icon'>
              <button className='btn__icon'><FaCopy className='icon' /></button>
              <button className='btn__icon'><FaVolumeUp className='icon' /></button>
            </div>
        </div>
        </div>

      </div>
    </div>
    </>
  );
}

export default App;
