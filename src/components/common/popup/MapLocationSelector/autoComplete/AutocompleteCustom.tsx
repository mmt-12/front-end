import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { useAutocompleteSuggestions } from '@/hooks/useAutocompleteSuggestions'
import InputField from '@/components/common/InputField'
import { css } from '@emotion/react'
import type { Theme } from 'node_modules/@emotion/react/dist/declarations/src'
import { fixedWithMargin } from '@/styles/fixed'
import { MapPoint, RoundArrowDown } from '@solar-icons/react'
import { theme } from '@/styles/theme'
import { RoundArrowUp } from '@solar-icons/react/ssr'

interface Props {
  onPlaceSelect: (_place: google.maps.places.Place | null) => void
}

export const AutocompleteCustom = ({ onPlaceSelect }: Props) => {
  const places = useMapsLibrary('places')

  const [inputValue, setInputValue] = useState<string>('')
  const { suggestions, resetSession } = useAutocompleteSuggestions(inputValue)
  const [isHideSuggestions, setIsHideSuggestions] = useState(false)
  const toggleHide = useCallback(() => {
    setIsHideSuggestions(prev => !prev)
  }, [])
  const ToggleButton = useMemo(
    () => (isHideSuggestions ? RoundArrowDown : RoundArrowUp),
    [isHideSuggestions],
  )

  const handleInput = useCallback((value: string) => {
    setInputValue(value)
  }, [])

  const handleSuggestionClick = useCallback(
    async (suggestion: google.maps.places.AutocompleteSuggestion) => {
      if (!places) return
      if (!suggestion.placePrediction) return

      const place = suggestion.placePrediction.toPlace()

      await place.fetchFields({
        fields: [
          'viewport',
          'location',
          'svgIconMaskURI',
          'iconBackgroundColor',
        ],
      })

      setInputValue('')

      // calling fetchFields invalidates the session-token, so we now have to call
      // resetSession() so a new one gets created for further search
      resetSession()

      onPlaceSelect(place)
    },
    [places, onPlaceSelect, resetSession],
  )

  useEffect(() => {
    console.log(suggestions[0]?.placePrediction)
  }, [suggestions])

  return (
    <div css={fixedWithMargin(0)}>
      <div
        style={{
          position: 'relative',
        }}
      >
        <InputField onChange={handleInput} />
        {suggestions.length && (
          <ToggleButton
            onClick={toggleHide}
            color={theme.stone[500]}
            size={32}
            css={toggleButtonStyle}
          />
        )}
      </div>

      {suggestions.length > 0 && !isHideSuggestions && (
        <div css={listStyle}>
          {suggestions.map((suggestion, index) => {
            return (
              <div
                key={index}
                css={listItemStyle}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <MapPoint
                  weight='Bold'
                  color={theme.stone[400]}
                  size={24}
                  style={{ flexShrink: 0 }}
                />
                <span>{suggestion.placePrediction?.text.text}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

const listStyle = (theme: Theme) =>
  css({
    margin: '0px 16px 16px 16px',
    padding: 4,
    backgroundColor: theme.white,
    borderRadius: 16,
    transition: 'height 0.2s ease-in-out',
  })

const listItemStyle = css({
  margin: 20,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontSize: 16,
  span: {
    paddingTop: '4px',
  },
})

const toggleButtonStyle = css({
  position: 'absolute',
  top: 6,
  right: 24,
})
