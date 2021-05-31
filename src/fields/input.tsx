import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  MouseEvent,
  ReactElement,
  ChangeEvent,
  FC,
  ReactNode,
} from 'react';
import { FieldComponentProps } from '@cezembre/forms';

export enum Type {
  TEXT = 'text',
  PASSWORD = 'password',
  EMAIL = 'email',
  SEARCH = 'search',
  URL = 'url',
  NUMBER = 'number',
  HIDDEN = 'hidden',
}

export enum AutoComplete {
  OFF = 'off',
  ON = 'on',
  NAME = 'name',
  HONORIFIC_PREFIX = 'honorific-prefix',
  GIVEN_NAME = 'given-name',
  ADDITIONAL_NAME = 'additional-name',
  FAMILY_NAME = 'family-name',
  HONORIFIC_SUFFIX = 'honorific-suffix',
  NICKNAME = 'nickname',
  EMAIL = 'email',
  USERNAME = 'username',
  NEW_PASSWORD = 'new-password',
  CURRENT_PASSWORD = 'current-password',
  ONE_TIME_CODE = 'one-time-code',
  ORGANIZATION_TITLE = 'organization-title',
  ORGANIZATION = 'organization',
  STREET_ADDRESS = 'street-address',
  ADDRESS_LINE_1 = 'address-line1',
  ADDRESS_LINE_2 = 'address-line2',
  ADDRESS_LINE_3 = 'address-line3',
  ADDRESS_LEVEL_4 = 'address-level4',
  ADDRESS_LEVEL_3 = 'address-level3',
  ADDRESS_LEVEL_2 = 'address-level2',
  ADDRESS_LEVEL_1 = 'address-level1',
  COUNTRY = 'country',
  COUNTRY_NAME = 'country-name',
  POSTAL_CODE = 'postal-code',
  CC_NAME = 'cc-name',
  CC_ADDITIONAL_NAME = 'cc-additional-name',
  CC_FAMILY_NAME = 'cc-family-name',
  CC_NUMBER = 'cc-number',
  CC_EXP = 'cc-exp',
  CC_EXP_MONTH = 'cc-exp-month',
  CC_EXP_YEAR = 'cc-exp-year',
  CC_CSC = 'cc-csc',
  CC_TYPE = 'cc-type',
  TRANSACTION_CURRENCY = 'transaction-currency',
  TRANSACTION_AMOUNT = 'transaction-amount',
  LANGUAGE = 'language',
  BDAY = 'bday',
  BDAY_DAY = 'bday-day',
  BDAY_MONTH = 'bday-month',
  BDAY_YEAR = 'bday-year',
  SEX = 'sex',
  TEL = 'tel',
  TEL_COUNTRY_CODE = 'tel-country-code',
  TEL_NATIONAL = 'tel-national',
  TEL_AREA_CODE = 'tel-area-code',
  TEL_LOCAL = 'tel-local',
  TEL_EXTENSION = 'tel-extension',
  IMPP = 'impp',
  URL = 'url',
  PHOTO = 'photo',
}

export type Adapter<Value = any> = (value: string | number) => Value;
export type Resolver<Value = any> = (value: Value) => string | number;

export interface SuggestionProps {
  suggestion: ReactNode;
}

function Suggestion({ suggestion }: SuggestionProps): React.ReactElement {
  return (
    <div className="cezembre-ui-fields-input-suggestion">
      <span>{suggestion}</span>
    </div>
  );
}

export type InputStyle = 'field' | 'inline';

export interface Props<Value = string, Suggestion = any>
  extends FieldComponentProps<Value> {
  adapter?: Adapter<Value>;
  resolver?: Resolver<Value>;
  type?: Type | string | null;
  inputStyle?: InputStyle;
  label?: string | null;
  placeholder?: string | null;
  instructions?: string | null;
  autoComplete?: AutoComplete | string | null;
  spellCheck?: boolean;
  suggestions?: Suggestion[];
  SuggestionItem?: FC<Suggestion>;
  suggestionsKeyExtractor?: (suggestion: Suggestion) => string;
  suggestionsHeader?: ReactNode | null;
  suggestionsFooter?: ReactNode | null;
  onSelectSuggestion?: ((suggestion: Suggestion) => void) | null;
  leftIcon?: ReactNode | string;
  autoCorrect?: boolean;
  autoCapitalize?: string;
}

export default function Input<Value = string>({
  value,
  error,
  warning,
  isActive,
  hasChanged,
  visited,
  submitted,
  onFocus,
  name,
  onChange,
  onBlur,
  type = Type.TEXT,
  adapter = undefined,
  resolver = undefined,
  inputStyle = 'field',
  label = null,
  placeholder = null,
  instructions = null,
  autoComplete = AutoComplete.ON,
  spellCheck = true,
  suggestions = [],
  SuggestionItem = Suggestion,
  suggestionsKeyExtractor = (suggestion: string) => suggestion,
  suggestionsHeader = null,
  suggestionsFooter = null,
  onSelectSuggestion = null,
  leftIcon = null,
  autoCorrect = true,
  autoCapitalize = 'off',
}: Props<Value>): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const [classNames, setClassNames] = useState<string[]>([
    'cezembre-ui-fields-input',
    inputStyle as string,
  ]);
  const [suggestionsActive, setSuggestionsActive] = useState<boolean>(false);

  useEffect(() => {
    if (
      autoComplete === AutoComplete.OFF &&
      window.MutationObserver &&
      inputRef.current
    ) {
      const observerHack = new MutationObserver(() => {
        observerHack.disconnect();
        if (inputRef.current) {
          inputRef.current.autocomplete = 'off';
        }
      });
      observerHack.observe(inputRef.current, {
        attributes: true,
        attributeFilter: ['autocomplete'],
      });
    }
  }, [autoComplete]);

  useEffect(() => {
    const nextClassNames = ['cezembre-ui-fields-input', inputStyle as string];

    if (visited) {
      nextClassNames.push('visited');
    }

    if (isActive) {
      nextClassNames.push('active');
    }

    if (suggestions.length && suggestionsActive) {
      nextClassNames.push('suggestions-active');
    }

    if ((visited || submitted) && !isActive && error) {
      nextClassNames.push('error');
    }

    if (warning) {
      nextClassNames.push('warning');
    }

    setClassNames(nextClassNames);
  }, [
    inputStyle,
    isActive,
    hasChanged,
    error,
    visited,
    warning,
    submitted,
    suggestionsActive,
    suggestions.length,
  ]);

  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(
    null
  );

  const change = useCallback(
    (event: ChangeEvent<{ value: string }>) => {
      if (adapter) {
        onChange(adapter(event.target.value));
      } else {
        onChange((event.target.value as never) as Value);
      }
      setSelectedSuggestion(null);
    },
    [adapter, onChange]
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowDown') {
        if (suggestions && suggestions.length) {
          event.preventDefault();
          setSelectedSuggestion((sPrediction: number | null) =>
            sPrediction !== null && sPrediction < suggestions.length - 1
              ? sPrediction + 1
              : 0
          );
        }
      } else if (event.key === 'ArrowUp') {
        if (suggestions && suggestions.length) {
          event.preventDefault();
          setSelectedSuggestion((sPrediction: number | null) =>
            sPrediction !== null && sPrediction > 0
              ? sPrediction - 1
              : suggestions.length - 1
          );
        }
      } else if (event.key === 'Enter') {
        if (suggestions && suggestions.length) {
          event.preventDefault();
          if (
            selectedSuggestion !== null &&
            suggestions.length > selectedSuggestion
          ) {
            if (onSelectSuggestion) {
              onSelectSuggestion(suggestions[selectedSuggestion]);
            } else {
              change(suggestions[selectedSuggestion]);
            }
            if (inputRef.current) {
              inputRef.current.blur();
            }
          }
        }
      }
    },
    [change, onSelectSuggestion, selectedSuggestion, suggestions]
  );

  const selectSuggestion = useCallback(
    (event: MouseEvent<HTMLButtonElement>, suggestion) => {
      if (onSelectSuggestion) {
        onSelectSuggestion(suggestion);
      } else {
        onChange(suggestion);
      }
    },
    [onChange, onSelectSuggestion]
  );

  const focus = useCallback(() => {
    onFocus();
    setSuggestionsActive(true);
  }, [onFocus]);

  const blur = useCallback(() => {
    onBlur();
    // Warning : Hack here
    // Blur event gets called before the click one so we have
    // to delay the hiding of the suggestions in order to still
    // register the click event. 200ms seems to be a good threshold.
    // Suggestions should disappear with an outside click instead of blur
    setTimeout(() => setSuggestionsActive(false), 200);
  }, [onBlur]);

  return (
    <div className={classNames.join(' ')}>
      {label ? <label htmlFor={name}>{label}</label> : null}

      <div className={`container${isActive ? ' active' : ''}`}>
        {leftIcon ? <div className="left-icon">{leftIcon}</div> : null}

        <input
          ref={inputRef}
          name={name}
          value={
            // eslint-disable-next-line no-nested-ternary
            resolver
              ? resolver(value)
              : typeof value === 'string' || typeof value === 'number'
              ? value
              : ''
          }
          type={type || Type.TEXT}
          placeholder={placeholder || ''}
          autoComplete={autoComplete || AutoComplete.OFF}
          onFocus={focus}
          onChange={change}
          onBlur={blur}
          onKeyDown={onKeyDown}
          spellCheck={spellCheck}
          autoCorrect={autoCorrect ? 'on' : 'off'}
          autoCapitalize={autoCapitalize}
        />

        <div className="suggestions">
          {suggestionsHeader}
          {suggestions
            ? suggestions.map((suggestion, index: number) => (
                <button
                  type="button"
                  key={suggestionsKeyExtractor(suggestion)}
                  className={`suggestion${
                    selectedSuggestion === index ? ' selected' : ''
                  }`}
                  onClick={(event) => selectSuggestion(event, suggestion)}
                >
                  <SuggestionItem suggestion={suggestion} />
                </button>
              ))
            : null}
          {suggestionsFooter}
        </div>
      </div>

      {instructions ? <p className="instructions">{instructions}</p> : null}

      {(visited || submitted) && !isActive && error ? (
        <div className="error">
          <i data-feather="alert" />
          <span>{error}</span>
        </div>
      ) : null}

      {warning ? (
        <div className="warning">
          <i data-feather="alert" />
          <span>{warning}</span>
        </div>
      ) : null}
    </div>
  );
}
