import axios from "../../axios.js";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import UserWords from "../../components/userWordBlock/UserWords";
import Exitblock from "../../components/ExitBlock/ExitBlock";
import UserWordsList from "../../components/UserWordsList/UserWordsList";
import NoneWord from "../../components/NoneWords/NoneWords";
import NoneDictionary from "../../components/NoneDictionary/NoneDictionary";
import AddDictionaryMenu from "../../components/addDictionaryMenu/AddDictionaryMenu";
import AddWordMenu from "../../components/AddWordMenu/AddWordMenu";
import DeleteSelectedWords from "../../components/DeleteSelectedWords/DeleteSelectedWords.jsx";
import './style.css';



const content = () => {
  const [isExit, setIsExit] = useState(false);
  const [isWord, setIsWord] = useState(false);
  const [addButtonDictionary, setAddButtonDictionary] = useState(false);
  const [addButtonWord, setAddButtonWord] = useState(false);
  const [isDictionarySelected, setIsDictionarySelected] = useState(false);


  const { userId } = useParams();
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const getToken = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const [dictionaries, setDictionaries] = useState([]);
  const [dictionaryId, setDictionaryIdSave] = useState('');

  const [words, setWords] = useState([]);
  const [wordToTranslate, setWordtoTranslate] = useState('')
  const [transcription, setTranscriptions] = useState('')
  const [translatedWord, setTranslatedWord] = useState('')

  const [newDictionary, setNewDictionary] = useState('');
  const [idDictionary, setDictionaryId] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const [checkboxOn, setCheckbox] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);



  useEffect(() => {
    getDictionaries();
  }, []);

  const handleClickViewCheckBox = () => {
    setCheckbox(!checkboxOn);
  }
  const handleChangeDictionary = (event) => {
    setNewDictionary(event.target.value);
  }

  const handleChangeWordToTranslate = (event) => {
    setWordtoTranslate(event.target.value);
  }
  const handleChangeTranscription = (event) => {
    setTranscriptions(event.target.value);
  }
  const handleChangeTranslatedWord = (event) => {
    setTranslatedWord(event.target.value);
  }


  async function getIdDictionary(index) {
    try {
      const dictionaryId = dictionaries[index]._id;
      setDictionaryIdSave(dictionaryId);
      setDictionaryId(dictionaries[index].name);
      setSelectedItem(index);
      setIsDictionarySelected(true);
      const response = await axios.get(`/users/${userId}/dictionaries/${dictionaryId}`, getToken)
      const wordsId = response.data.words;
      setWords(wordsId);
    }
    catch (err) {
      console.log(err);
    }
  }
  async function deleteIdDictionary(index) {
    try {
      const dictionaryId = dictionaries[index]._id;
      const response = await axios.delete(`/users/${userId}/dictionaries/${dictionaryId}`, getToken);
      getDictionaries();
      setSelectedItem(null);
      setDictionaryId(null);
      setIsDictionarySelected(false);
      const wordsId = response.data.words;
      setWords(wordsId);

    }
    catch (err) {
      console.log(err);
    }
  }
  async function createDictionary() {
    try {
      console.log(dictionaries.length);
      if (dictionaries.length > 4) {
        alert('Максимальное количество словарей 5');
        throw new Error('Максимальное количество словарей 5');
      }
      const saveDictionary = {
        user: userId.trim().toLowerCase(),
        name: newDictionary.trim().toLowerCase(),
      }

      await axios.post(`/users/${userId}/dictionaries`, saveDictionary, getToken);
      alert('словарь создан')
      getDictionaries();
      setNewDictionary('');

    } catch (err) {
      console.log(err);
      alert(err.response.data.errors);
    }
  }
  async function getDictionaries() {
    try {
      const response = await axios.get(`/users/${userId}/dictionaries`, getToken);
      const myDictionary = response.data.dictionaries;
      setDictionaries(myDictionary);

    } catch (err) {
      console.log(err);
    }
  }
  async function getWords() {
    try {
      const response = await axios.get(`/users/${userId}/dictionaries/${dictionaryId}/words`, getToken);
      const wordsSave = response.data;
      setWords(wordsSave);
    }
    catch (err) {
      console.log(err);
    }
  }
  async function createWord() {
    try {
      const data = {
        wordToTranslate: wordToTranslate.trim().toLowerCase(),
        transcription: transcription.trim().toLowerCase(),
        translatedWord: translatedWord.trim().toLowerCase(),
      }
      await axios.post(`/users/${userId}/dictionaries/${dictionaryId}/words`, data, getToken);
      alert('Слово добавлено в словарь');
      getWords();
      setWordtoTranslate('');
      setTranscriptions('');
      setTranslatedWord('');
    }
    catch (err) {
      console.log(err);
      alert(err.response.data.errors);
    }
  }
  async function getOneWord(wordId) {
    try {
      if (selectedCheckbox.includes(wordId)) {
        setSelectedCheckbox(selectedCheckbox.filter((word) => word !== wordId));
      } else {
        setSelectedCheckbox([wordId, ...selectedCheckbox]);
      }
      await axios.get(`/users/${userId}/dictionaries/${dictionaryId}/words/${wordId}`, getToken);
    } catch (err) {
      console.log(err);
    }
  }
  async function deleteWords() {
    try {
      await Promise.all(selectedCheckbox.map(async (wordId) => {
        await axios.delete(`/users/${userId}/dictionaries/${dictionaryId}/words/${wordId}`, getToken)
      })
      );
      getWords();
      setSelectedCheckbox([]);
      setCheckbox(false);
    } catch (err) {
      console.log(err);
    }
  }

  function isExitClick() {
    setIsExit(!isExit);
  }

  function addButtonClick() {
    setAddButtonDictionary(!addButtonDictionary);
  }

  function addWordButtonClick() {
    setAddButtonWord(!addButtonWord);
  }

  return (
    <>
      <div className='container'>
        <div className='row align-items-center min-vh-100'>
          <div className="main-navbar col-xs-3 order-2 order-xs-2 col-sm-2 order-sm-1 col-md-2 order-md-1 col-lg-2 order-lg-1 col-xl-2 order-xl-1 col-xxl-2 order-xxl-1">
            <div className="row">
              <div className="col-12">
                {isExit ? <Exitblock func={isExitClick} username={username} /> :
                  <div className="main-name d-flex align-items-center justify-content-center mt-1">
                    <div className="d-flex align-items-center justify-content-center">
                      {/* Смена Никнейма на текущий  */}
                      <div className="col-9"><span>{username}</span></div>
                      <div className="arrow-active col-2 mt-1" onClick={isExitClick}><img src="/img/arrow.svg" alt="" /></div>
                    </div>
                  </div>}
                <div className="row">
                  <div className="d-flex align-center-items justify-content-center mt-5">
                    <input className="input-search-box" placeholder="Найти слово..."></input>
                    <button className="button-finder"><img src="/img/finder.svg" alt="find" /></button>
                  </div>
                  <div className="d-flex flex-column align-items-center justify-content-center mt-4">
                    <div className="col ">
                      <button className="button-create-dictionary" onClick={addButtonClick}>Создать словарь</button>
                    </div>
                  </div>
                  <div className="mt-4">
                    {/* Тут будет map для перебора текущий словарей */}
                    {dictionaries.map((item, index) => (
                      <UserWords
                        key={index}
                        text={item.name}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        deleteIdDictionary={deleteIdDictionary}
                        index={index}
                        onClick={() => getIdDictionary(index)}
                      />
                    ))}
                  </div>
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <button className={`button-add-word mb-2 mt-2 ${!isDictionarySelected ? 'disabled' : ''}`} onClick={addWordButtonClick} disabled={!isDictionarySelected}>
                      Добавить слово
                    </button>
                    <button className={`button-delete-word ${!isDictionarySelected ? 'disabled' : ''}`} onClick={handleClickViewCheckBox} disabled={!isDictionarySelected}>
                      Удалить слово
                    </button>
                    {checkboxOn && <DeleteSelectedWords
                      checkboxOn={checkboxOn}
                      deleteWords={deleteWords}
                      onClose={handleClickViewCheckBox}
                    />}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content col-xs-9 order-1 order-xs-1 col-sm-10 order-sm-2 col-md-10 order-md-2 col-lg-10 order-lg-2 col-xl-10 order-xl-2 col-xxl-10 order-xxl-2 text-center">
            <div className="row">
              <div className="col">
                {/* Так же нужно добавить блок noneDictionary когда словарей нет или они не выбраны  */}
                {/* Вместо имени тут будет отображаться текущий выбранный словарь */}
                <h1 className="mt-2">{idDictionary}</h1>
                <div className="words-list-menu d-flex justify-content-center align-items-center mt-4 ">
                  <div className="world-list-text col">П/Н</div>
                  <div className="world-list-text col">Слово на иностранном языке</div>
                  <div className="world-list-text col">Транскрипция</div>
                  <div className="world-list-text col">Слово на русском языке</div>
                </div>
                {dictionaries.length > 0 ? (
                <div className="word-list-content col">
                  {/* Тут так-же будет map для перебора всех текущих слов */}
                  
                  {Array.isArray(words) && words.map((word, wordIndex) => (
                    <UserWordsList
                      key={wordIndex}
                      serialNumber={wordIndex + 1}
                      textOne={word.wordToTranslate}
                      textTwo={word.transcription}
                      textThree={word.translatedWord}
                      showCheckbox={checkboxOn}
                      selectedCheckbox={selectedCheckbox}
                      getOneWord={() => getOneWord(word._id)} // Передача _id слова
                      _id={word._id} // Передача _id слова
                    />
                  ))}
                </div>) : <NoneDictionary/>}
              </div>
            </div>
          </div>
        </div>
        {addButtonDictionary && (
          <AddDictionaryMenu
            onClose={addButtonClick}
            handleChangeDictionary={handleChangeDictionary}
            newDictionary={newDictionary}
            onClick={createDictionary}
          />
        )}
        {addButtonWord && (
          <AddWordMenu
            onClose={addWordButtonClick}
            handleChangeWordToTranslate={handleChangeWordToTranslate}
            handleChangeTranscription={handleChangeTranscription}
            handleChangeTranslatedWord={handleChangeTranslatedWord}
            onClick={createWord}
          />
        )}
      </div>
    </>
  )
}

export default content; 