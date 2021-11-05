import { ReactElement, ReactNode, useCallback } from 'react';
import { FieldComponentProps } from '@cezembre/forms';
import {
  Place,
  PlacePredictionType,
  usePlaceDetailsGetter,
  usePlacePredictions,
} from '@cezembre/fronts';
import Input, { Adapter, Resolver, Theme } from './input';
import poweredByGoogle from '../assets/poweredByGoogle.png';

type AutocompletePrediction = google.maps.places.AutocompletePrediction;
type GeocoderAddressComponent = google.maps.GeocoderAddressComponent;

type Value = Place | null | undefined;

const adapter: Adapter<Value> = (value: string | number): Value => {
  if (typeof value !== 'string' || !value.length) {
    return null;
  }
  return {
    value,
  };
};

const resolver: Resolver<Value> = (value: Value): string => {
  if (value && typeof value === 'object' && 'value' in value) {
    return value.value || '';
  }
  return '';
};

export interface PredictionProps {
  suggestion: AutocompletePrediction;
}

function Prediction({ suggestion }: PredictionProps): ReactElement {
  return (
    <p className="cezembre-ui-place-prediction">
      {suggestion.structured_formatting.main_text}
      <span className="secondary-text">, {suggestion.structured_formatting.secondary_text}</span>
    </p>
  );
}

function PredictionsFooter(): ReactElement {
  return (
    <div className="cezembre-ui-place-predictions-footer">
      <img src={poweredByGoogle as string} alt="Powered by Google" />
    </div>
  );
}

export interface Props extends FieldComponentProps<Value> {
  predictionTypes?: PlacePredictionType[];
  theme?: Theme;
  label?: string;
  placeholder?: string;
  instructions?: string;
  onSelectSuggestion?: (place: Place) => void;
  leftIcon?: ReactNode;
}

export default function PlaceField({
  value,
  initialValue,
  error,
  warning,
  isActive,
  hasChanged,
  isValid,
  visited,
  submitted,
  onFocus,
  name,
  onChange,
  onBlur,
  form,
  predictionTypes = ['geocode'],
  styleType = 'default',
  label,
  placeholder,
  instructions,
  onSelectSuggestion,
  leftIcon = null,
}: Props): ReactElement {
  const predictions: AutocompletePrediction[] = usePlacePredictions(
    resolver(value),
    predictionTypes,
  );
  const placeDetailsGetter = usePlaceDetailsGetter();

  const selectPrediction = useCallback(
    async (prediction: AutocompletePrediction) => {
      try {
        const placeDetails = await placeDetailsGetter(prediction.place_id);

        const nextValue: Place = {
          value: `${prediction.structured_formatting.main_text}, ${prediction.structured_formatting.secondary_text}`,
          google_id: prediction.place_id,
          types: prediction.types,
          is_address: prediction.types.includes('street_address'),
          name: placeDetails.name,
        };

        if (placeDetails.geometry) {
          nextValue.geo_location = {
            latitude: placeDetails.geometry.location.lat(),
            longitude: placeDetails.geometry.location.lng(),
          };
        }

        if (placeDetails.address_components && placeDetails.address_components.length) {
          placeDetails.address_components.forEach((component: GeocoderAddressComponent) => {
            if (component.types.includes('locality')) {
              nextValue.locality = component.long_name;
            } else if (component.types.includes('neighborhood')) {
              nextValue.neighborhood = component.long_name;
            }
          });
        }
        onChange(nextValue);
        if (onSelectSuggestion) {
          onSelectSuggestion(nextValue);
        }
      } catch (e) {
        console.error(e);
        // TODO : Handle error
      }
    },
    [onChange, onSelectSuggestion, placeDetailsGetter],
  );

  return (
    <div className="cezembre-ui-place">
      <Input<Value, AutocompletePrediction>
        name={name}
        value={value}
        onFocus={onFocus}
        onChange={onChange}
        onBlur={onBlur}
        form={form}
        label={label}
        placeholder={placeholder}
        autoComplete="off"
        adapter={adapter}
        resolver={resolver}
        suggestions={predictions}
        SuggestionItem={Prediction}
        suggestionsKeyExtractor={(suggestion: AutocompletePrediction) => suggestion.place_id}
        suggestionsFooter={<PredictionsFooter />}
        onSelectSuggestion={selectPrediction}
        leftIcon={leftIcon}
        styleType={styleType}
        instructions={instructions}
        error={error}
        warning={warning}
        initialValue={initialValue}
        isActive={isActive}
        hasChanged={hasChanged}
        isValid={isValid}
        visited={visited}
        submitted={submitted}
      />
    </div>
  );
}
