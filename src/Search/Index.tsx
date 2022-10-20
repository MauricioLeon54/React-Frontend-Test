import React, { useEffect, useState } from 'react'
import * as Utils from './Utils'
import './css/index.css'

export default function Search () {
  // First we set the variables that we will use
  const [optionsSearch, setOptionsSearch] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [selectedOption, setSelectedOption] = useState(false)

  // The idea is not to use static values, so load some values ​​from some public API
  // So when the component is mounted we make a request and store everything in a variable

  // Something important that I must make known is that my original idea was to make requests every time
  // the value of the input changed, but I did not find any public API to which I could send parameters
  // so that it returns the data already filtered and well, just update the state of the options arrangement,
  // anyways this still has its merits


  useEffect(() => {
    Utils.Request.Get('https://pokeapi.co/api/v2/pokemon/?limit=800',
      (response: { results: React.SetStateAction<never[]> }) => setOptionsSearch(response.results),
      () => {
        alert('Ocurrió un error, No se pueden obtener los Pokémones')
      })
  }, [])

  const handleChangeSearchValue = (e: any) => {
    setSelectedOption(false)
    setSearchValue(e.target.value)
  }
  const handleClickToNewSelection = (option: any) => {
    setSearchValue(option.name)
    setSelectedOption(true)
  }

  // This function is the one that helps to filter given the search value of the input
  // If search made requests to an API, this would not work at all, and would have to be refactored

  const filterData = (value: String) => {
    const cleanString = value.trim().toLowerCase()
    // To filter I do something very basic and that is to take advantage of the filter property of the arrays
    // And well, I just convert everything to lowercase, remove accents and see if the input value is included
    return optionsSearch.filter((option: any) => option.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(cleanString))
  }

  return (
    <>
      <div>
        <div className='row'>
          <div className='col-12'>
            <div>
              <label>
                Escribe el nombre de algún Pokémon
              </label>
            </div>
            <input
              className='input-search'
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={handleChangeSearchValue}
            />
          </div>
          <div className='col-12 horizontal-center'>
            <ContainerOptions
              options={!selectedOption ? filterData(searchValue) : []}
              handleSelection={handleClickToNewSelection}
              showOptions={searchValue !== ''}
              lettersHighlight={Array.from(searchValue)}
              showHighlightLetter={false}
            />
          </div>
        </div>
      </div>
    </>
  )
}

type Option = {
  name: String;
  url: String;
}

type PropsContainerOptions = {
  handleSelection: Function;
  options: Array<Option>;
  showOptions: Boolean;
  lettersHighlight: Array<String>;
  showHighlightLetter: Boolean;
}

// I could have avoided this and put it directly, but it's a good idea to fragment or modulate this part and, well, put it separately
const ContainerOptions = ({ handleSelection, options, showOptions, lettersHighlight, showHighlightLetter } : PropsContainerOptions) => (
  <div className='container-option-panel'>
    {(options.length > 0 && showOptions) && (
      <ul className='container-option-items'>
        {options.map((option: Option, i: Number) => (
          <li key={String(i)}>
            <button className='container-option-item' onClick={() => handleSelection(option)}>
              <div>
                <div>
                  <div className='label-option'>
                    {/* Here if desired you can highlight the letters that match with respect to the value of the input
                    this can be displayed or not just by changing the value of the "showHighlightLetter" prop */}

                    {showHighlightLetter ?
                      Array.from(option.name).map((letter, i: Number) => (lettersHighlight.filter(letterHighlight => letterHighlight === letter).length > 0) ? (<strong key={String(i)} className='text-highlight'>{letter}</strong>) : (<span key={String(i)}>{letter}</span>))
                      : (<span className='text-white'>{option.name}</span>)
                    }
                  </div>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
)
