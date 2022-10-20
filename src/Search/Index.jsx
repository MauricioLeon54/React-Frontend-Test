import { useEffect, useState } from 'react'
import * as Utils from './Utils'
import './css/index.css'

export default function Search () {
  const [optionsSearch, setOptionsSearch] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [selectedOption, setSelectedOption] = useState(false)

  useEffect(() => {
    Utils.Request.Get('https://pokeapi.co/api/v2/pokemon/?limit=800',
      response => setOptionsSearch(response.results),
      () => {
        alert('Ocurrió un error, No se pueden obtener los Pokémones')
      })
  }, [])

  const handleChangeSearchValue = e => {
    setSelectedOption(false)
    setSearchValue(e.target.value)
  }
  const handleClickToNewSelection = option => {
    setSearchValue(option.name)
    setSelectedOption(true)
  }

  const filterData = value => {
    const cleanString = value.trim().toLowerCase()
    return optionsSearch.filter((option) => option.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(cleanString))
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
              options={!selectedOption && filterData(searchValue)}
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

const ContainerOptions = ({ handleSelection, options, showOptions, lettersHighlight, showHighlightLetter }) => (
  <div className='container-option-panel'>
    {(options.length > 0 && showOptions) && (
      <ul className='container-option-items'>
        {options.map((option, i) => (
          <li key={i}>
            <button className='container-option-item' onClick={() => handleSelection(option)}>
              <div>
                <div>
                  <div className='label-option'>
                    {showHighlightLetter ?
                    Array.from(option.name).map((letter, i) => (lettersHighlight.filter(letterHighlight => letterHighlight === letter).length > 0) ? (<strong key={i} className='text-highlight'>{letter}</strong>) : (<span key={i}>{letter}</span>))
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

