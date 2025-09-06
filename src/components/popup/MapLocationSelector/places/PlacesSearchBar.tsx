import { useCallback, useEffect, useMemo, useState } from 'react'
import { css, type Theme } from '@emotion/react'
import { MapPoint, RoundArrowDown } from '@solar-icons/react'
import { RoundArrowUp } from '@solar-icons/react/ssr'
import { useMapsLibrary } from '@vis.gl/react-google-maps'

import InputField from '@/components/common/InputField'
import { useAutocompleteSuggestions } from '@/hooks/useAutocompleteSuggestions'
import { fixedWithMargin } from '@/styles/common'
import { theme } from '@/styles/theme'

interface Props {
  onPlaceSelect: (_place: google.maps.places.Place | null) => void
}

export const PlacesSearchBar = ({ onPlaceSelect }: Props) => {
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

  return (
    <div css={fixedWithMargin(0)}>
      <div
        style={{
          position: 'relative',
        }}
      >
        <InputField
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        {suggestions.length > 0 && (
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
