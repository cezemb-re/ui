import {
  useCallback,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  ReactElement,
  ChangeEvent,
  FC,
  ReactNode,
} from 'react';
import { FieldComponentProps } from '@cezembre/forms';
import Icon, { IconName } from '../general/icon';

export type InputType = 'text' | 'password' | 'email' | 'search' | 'url' | 'number' | 'hidden';

export type AutoComplete =
  | 'off'
  | 'on'
  | 'name'
  | 'honorific-prefix'
  | 'given-name'
  | 'additional-name'
  | 'family-name'
  | 'honorific-suffix'
  | 'nickname'
  | 'email'
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'one-time-code'
  | 'organization-title'
  | 'organization'
  | 'street-address'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'address-level4'
  | 'address-level3'
  | 'address-level2'
  | 'address-level1'
  | 'country'
  | 'country-name'
  | 'postal-code'
  | 'cc-name'
  | 'cc-additional-name'
  | 'cc-family-name'
  | 'cc-number'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-csc'
  | 'cc-type'
  | 'transaction-currency'
  | 'transaction-amount'
  | 'language'
  | 'bday'
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'sex'
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-area-code'
  | 'tel-local'
  | 'tel-extension'
  | 'impp'
  | 'url'
  | 'photo';

export type Theme = 'default' | 'black';

export type Adapter<Value = string> = (value: string) => Value;
export type Resolver<Value = string> = (value?: Value) => string | number;

export interface SuggestionProps<Suggestion = string> {
  suggestion: Suggestion;
}

function DefaultSuggestion({ suggestion }: SuggestionProps<ReactNode>): ReactElement {
  return (
    <div className="friday-ui-input-suggestion">
      <span>{suggestion}</span>
    </div>
  );
}

export interface Props<Value = string, Suggestion = Value> extends FieldComponentProps<Value> {
  adapter?: Adapter<Value>;
  resolver?: Resolver<Value>;
  format?: Resolver<Value>;
  type?: InputType | string;
  theme?: Theme;
  label?: string;
  placeholder?: string;
  instructions?: string;
  autoComplete?: AutoComplete | string;
  spellCheck?: boolean;
  suggestions?: Suggestion[];
  SuggestionItem?: FC<SuggestionProps<Suggestion>>;
  suggestionsKeyExtractor?: (suggestion: Suggestion) => string;
  suggestionsHeader?: ReactNode;
  suggestionsFooter?: ReactNode;
  onSelectSuggestion?: (suggestion: Suggestion) => void;
  leftComponent?: ReactNode | IconName;
  rightComponent?: ReactNode | IconName;
  autoCorrect?: boolean;
  autoCapitalize?: string;
}

export default function Input<Value = string, Suggestion = Value>({
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
  type = 'text',
  theme = 'default',
  adapter,
  resolver,
  label,
  placeholder,
  instructions,
  autoComplete = 'on',
  spellCheck = true,
  suggestions = [],
  SuggestionItem,
  suggestionsKeyExtractor,
  suggestionsHeader,
  suggestionsFooter,
  onSelectSuggestion,
  leftComponent,
  rightComponent,
  autoCorrect = true,
  autoCapitalize = 'off',
}: Props<Value, Suggestion>): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const [classNames, setClassNames] = useState<string[]>(['cezembre-ui-fields-input', theme]);
  const [suggestionsActive, setSuggestionsActive] = useState<boolean>(false);

  useEffect(() => {
    if (autoComplete === 'off' && window.MutationObserver && inputRef.current) {
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
    const nextClassNames = ['cezembre-ui-fields-input', theme];

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
    isActive,
    hasChanged,
    error,
    visited,
    warning,
    submitted,
    suggestionsActive,
    suggestions.length,
    theme,
  ]);

  const [selectedSuggestion, setSelectedSuggestion] = useState<number | undefined>(undefined);

  const change = useCallback(
    (event: ChangeEvent<{ value: string }>) => {
      if (adapter) {
        onChange(adapter(event.target.value));
      } else {
        onChange(event.target.value as unknown as Value);
      }
      setSelectedSuggestion(undefined);
    },
    [adapter, onChange],
  );

  const selectSuggestion = useCallback(
    (suggestion) => {
      if (onSelectSuggestion) {
        onSelectSuggestion(suggestion);
      } else {
        onChange(suggestion);
      }
    },
    [onChange, onSelectSuggestion],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowDown') {
        if (suggestions && suggestions.length) {
          event.preventDefault();
          setSelectedSuggestion((sPrediction: number | undefined) =>
            sPrediction !== undefined && sPrediction < suggestions.length - 1 ? sPrediction + 1 : 0,
          );
        }
      } else if (event.key === 'ArrowUp') {
        if (suggestions && suggestions.length) {
          event.preventDefault();
          setSelectedSuggestion((sPrediction: number | undefined) =>
            sPrediction !== undefined && sPrediction > 0 ? sPrediction - 1 : suggestions.length - 1,
          );
        }
      } else if (event.key === 'Enter') {
        if (suggestions && suggestions.length) {
          event.preventDefault();
          if (selectedSuggestion !== undefined && suggestions.length > selectedSuggestion) {
            selectSuggestion(suggestions[selectedSuggestion]);
            if (inputRef.current) {
              inputRef.current.blur();
            }
          }
        }
      }
    },
    [selectSuggestion, selectedSuggestion, suggestions],
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

      <div className="container">
        {leftComponent ? <div className="left-component">{leftComponent}</div> : null}

        <input
          ref={inputRef}
          name={name}
          value={
            resolver
              ? resolver(value)
              : typeof value === 'string' || typeof value === 'number'
              ? value
              : ''
          }
          type={type || 'text'}
          placeholder={placeholder || ''}
          autoComplete={autoComplete || 'off'}
          onFocus={focus}
          onChange={change}
          onBlur={blur}
          onKeyDown={onKeyDown}
          spellCheck={spellCheck}
          autoCorrect={autoCorrect ? 'on' : 'off'}
          autoCapitalize={autoCapitalize}
        />

        {rightComponent ? <div className="right-component">{rightComponent}</div> : null}

        <div className="suggestions">
          {suggestionsHeader}
          {suggestions
            ? suggestions.map((suggestion, index: number) => (
                <button
                  type="button"
                  key={suggestionsKeyExtractor ? suggestionsKeyExtractor(suggestion) : index}
                  className={`suggestion${selectedSuggestion === index ? ' selected' : ''}`}
                  onClick={() => selectSuggestion(suggestion)}>
                  {SuggestionItem ? (
                    <SuggestionItem suggestion={suggestion} />
                  ) : (
                    <DefaultSuggestion suggestion={suggestion} />
                  )}
                </button>
              ))
            : null}
          {suggestionsFooter}
        </div>
      </div>

      {instructions ? <p className="instructions">{instructions}</p> : null}

      {(visited || submitted) && !isActive && error ? (
        <div className="error">
          <Icon name="alert-triangle" size={15} />
          <span>{error}</span>
        </div>
      ) : null}

      {warning ? (
        <div className="warning">
          <Icon name="alert-triangle" size={15} />
          <span>{warning}</span>
        </div>
      ) : null}
    </div>
  );
}
