
import { FaCopy, FaExchangeAlt, FaVolumeUp } from 'react-icons/fa';
import './css/styles.css';
// language-api
import languages from './Api/Api';

import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

function App() {
  const [inputText, setInputText] = useState("Hello, How are You")
  const [translatedText, setTranslatedText] = useState("")
  const [sourceLang, setSourceLang] = useState("en")
  const [targetLang, setTargetLang] = useState("bn")
  const [copyMessage, setCopyMessage] = useState(""); // State for copy message


  useEffect(() => {
    translate();

  }, [])

  const translate = async () => {
    if (sourceLang === targetLang) {
      window.alert("Source and target languages must be different.");
      return;
    }

    try {
      console.log(`Translating from ${sourceLang} to ${targetLang}`);
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${sourceLang}|${targetLang}`
      );
      const data = await response.json(); // await the response.json() call
      console.log(data);
      if (data.responseStatus === 200) {
        setTranslatedText(data.responseData.translatedText);
      } else {
        window.alert("Error Translating Text: " + data.responseDetails);
      }
    } catch (error) {
      window.alert("Error Translating Text: " + error);
    }
  }

  // text-limit-functionaliy
  const limitTranslate = debounce(translate, 500)

  // initilaize-translate
  const handleTranslate = () => {
    limitTranslate()
  }

  //funtion to switch source language to target language
  const switchLanguage = () => {
    const tempLang = sourceLang;
    const tempText = inputText;
    setSourceLang(targetLang);
    setTargetLang(tempLang);
    setInputText(translatedText);
    setTranslatedText(tempText);
  }

  //clipboard copy function
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage("Copied successfully!"); // Show message
      setTimeout(() => setCopyMessage(""), 3000); // Hide message after 3 seconds
    } catch (error) {
      window.alert("Failed to copy text: " + error);
    }
  };

  //text to sound function
  const handleListen = (text, language) => {
    try {
      // Check if browser supports Speech Synthesis API
      if (!window.speechSynthesis) {
        throw new Error("Your browser doesn't support Text-to-Speech.");
      }
  
      const utterance = new SpeechSynthesisUtterance(text);
  
      // Set language property correctly (replace with actual language if needed)
      utterance.lang = language || 'en-US';  // Default to US English if none provided
  
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Speech error:", error);
      // Display a user-friendly message based on the error type, e.g.,
      window.alert("Text-to-Speech error: " + error.message);
    }
  };
  
  return (
    <>
    <div className='app__body'>
      <div className='app__container'>

        {/* app-left */}
        <div className='app__container--left'>
          {/* left-header-part */}
          <div className='app__header'>

            <button className={`btn btn__detected ${sourceLang === "en" ? "selected" : ""}`} value="en" onClick={(e) => setSourceLang(e.target.value)}>Detected Language</button>

            <button className={`btn btn__language ${sourceLang === "en" ? "selected" : ""}`} value="en" onClick={(e) => setSourceLang(e.target.value)}>English</button>

            <button className={`btn btn__language ${sourceLang === "bn" ? "selected" : ""}`} value="bn" onClick={(e) => setSourceLang(e.target.value)}>Bengali</button>

            <select name='languages' className='left__language--switch' value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
             {languages.map((language) => {
              return (
                <option key={language.code} value={language.code}>
                  {language.name}
                </option>
              )
             })}
            </select>
          </div>
          {/* left-content-part */}
          <div>
            <textarea maxLength={500} value={inputText} onChange={(e) => setInputText(e.target.value)} className='text-area' />
              <div className='word-count'>{inputText.length}/500</div>
          </div>
          {/* left-footer-part */}
          <div className='app__footer'>
            <div className='copy__sound--icon'>
              <button className='btn__icon' onClick={() => handleCopy(inputText)}><FaCopy className='icon' /></button>
              
              <button className='btn__icon' onClick={() => handleListen(inputText, sourceLang)}><FaVolumeUp className='icon' /></button>
            </div>
            <button className='btn btn__detected' onClick={handleTranslate}>Translate</button>
          </div>
        </div>

        {/* app-right */}
        <div className='app__container--right'>
          {/* right-header-part */}
        <div className='app__header'>

        <button className={`btn btn__language ${targetLang === "en" ? "selected" : ""}`} value="en" onClick={(e) => setTargetLang(e.target.value)}>English</button>

            <button className={`btn btn__language ${targetLang === "bn" ? "selected" : ""}`} value="bn" onClick={(e) => setTargetLang(e.target.value)}>Bengali</button>

            <select name='languages' className='left__language--switch' value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
              {languages.map((language) => {
                return (
                  <option key={language.code} value={language.code}>{language.name}</option>
                )
              })}
            </select>
            <button className='btn__icon' onClick={switchLanguage}><FaExchangeAlt className='icon' /></button>
        </div>
          {/* right-content-part */}
          <div>
            <textarea maxLength={500} value={translatedText} className='text-area' />
              <div className='word-count'>{translatedText.length}/500</div>
          </div>
          {/* right-footer-part */}
        <div className='app__footer'>
        <div className='copy__sound--icon'>
              <button className='btn__icon' onClick={() => handleCopy(translatedText)}><FaCopy className='icon' /></button>
              <button className='btn__icon' onClick={() => handleListen(translatedText, targetLang)}><FaVolumeUp className='icon' /></button>
            </div>
        </div>
        </div>

      </div>
      {copyMessage && <p className="copy-message">{copyMessage}</p>}
    </div>
    </>
  );
}

export default App;
