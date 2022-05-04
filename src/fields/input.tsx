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
  useMemo,
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

export type InputShape = 'square' | 'round';

export type InputTheme = 'default' | 'darker' | 'lighter' | 'dark';

export type Adapter<V = string> = (value: string) => V;
export type Resolver<V = string> = (value?: V) => string | number;

export interface Suggestion<V = string> {
  value: V;
}

export interface SuggestionsNamespace<V = string, S extends Suggestion<V> = Suggestion<V>> {
  namespace: string;
  suggestions?: S[];
}

export interface SuggestionProps<V = string, S extends Suggestion<V> = Suggestion<V>> {
  suggestion: S;
}

function DefaultSuggestion<V = string, S extends Suggestion<V> = Suggestion<V>>({
  suggestion,
}: SuggestionProps<V, S>): ReactElement | null {
  if (
    suggestion?.value &&
    (typeof suggestion.value === 'string' || typeof suggestion.value === 'number')
  ) {
    return <span className="friday-ui-input-suggestion">{suggestion.value}</span>;
  }
  return null;
}

export interface Props<V = string, S extends Suggestion<V> = Suggestion<V>>
  extends FieldComponentProps<V> {
  adapter?: Adapter<V>;
  resolver?: Resolver<V>;
  format?: Resolver<V>;
  type?: InputType | string;
  shape?: InputShape;
  theme?: InputTheme;
  label?: string;
  placeholder?: string;
  instructions?: string;
  autoComplete?: AutoComplete | string;
  spellCheck?: boolean;
  suggestions?: S[] | SuggestionsNamespace<V, S>[];
  SuggestionItem?: FC<SuggestionProps<V, S>>;
  suggestionsKeyExtractor?: (suggestion: S) => string;
  suggestionsHeader?: ReactNode;
  suggestionsFooter?: ReactNode;
  onSelectSuggestion?: (suggestion: S) => void;
  leftComponent?: ReactNode | IconName;
  rightComponent?: ReactNode | IconName;
  autoCorrect?: boolean;
  autoCapitalize?: string;
}

export default function Input<V = string, S extends Suggestion<V> = Suggestion<V>>({
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
  shape = 'square',
  theme = 'default',
  adapter,
  resolver,
  format,
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
}: Props<V, S>): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);

  const [suggestionsActive, setSuggestionsActive] = useState<boolean>(false);

  const className = useMemo<string>(() => {
    let res = `cezembre-ui-input ${shape} ${theme}`;

    if (visited) {
      res += ' visited';
    }
    if (isActive) {
      res += 'active';
    }
    if (suggestions?.length && suggestionsActive) {
      res += 'suggestions-active';
    }
    if ((visited || submitted) && !isActive && error) {
      res += 'error';
    }
    if (warning) {
      res += 'warning';
    }
    return res;
  }, [
    error,
    isActive,
    shape,
    submitted,
    suggestions.length,
    suggestionsActive,
    theme,
    visited,
    warning,
  ]);

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

  const [suggestionsLength, setSuggestionsLength] = useState<number>(0);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | undefined>(undefined);

  useEffect(() => {
    let length = 0;
    if (suggestions?.length) {
      suggestions.forEach((suggestion) => {
        if (typeof suggestion === 'object' && 'namespace' in suggestion) {
          length += suggestion.suggestions?.length || 0;
        } else {
          length += 1;
        }
      });
    }
    setSuggestionsLength(length);
  }, [suggestions]);

  const change = useCallback(
    (event: ChangeEvent<{ value: string }>) => {
      if (adapter) {
        onChange(adapter(event.target.value));
      } else {
        onChange(event.target.value as unknown as V);
      }
      setSelectedSuggestion(undefined);
    },
    [adapter, onChange],
  );

  const selectSuggestion = useCallback(
    (suggestion: S) => {
      if (onSelectSuggestion) {
        onSelectSuggestion(suggestion);
      } else {
        onChange(suggestion.value);
      }
    },
    [onChange, onSelectSuggestion],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (suggestions && suggestionsActive && suggestionsLength) {
        if (event.key === 'ArrowDown') {
          setSelectedSuggestion((sPrediction: number | undefined) =>
            sPrediction !== undefined && sPrediction < suggestionsLength - 1 ? sPrediction + 1 : 0,
          );
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          setSelectedSuggestion((sPrediction: number | undefined) =>
            sPrediction !== undefined && sPrediction > 0 ? sPrediction - 1 : suggestionsLength - 1,
          );
        } else if (event.key === 'Enter') {
          event.preventDefault();
          if (selectedSuggestion !== undefined && suggestionsLength > selectedSuggestion) {
            let index = 0;
            suggestions.forEach((suggestion) => {
              if (typeof suggestion === 'object' && 'namespace' in suggestion) {
                suggestion.suggestions?.forEach((_suggestion) => {
                  if (index === selectedSuggestion) {
                    selectSuggestion(_suggestion);
                  }
                  index += 1;
                });
              } else {
                if (index === selectedSuggestion) {
                  selectSuggestion(suggestion);
                }
                index += 1;
              }
            });
            if (inputRef.current) {
              inputRef.current.blur();
            }
          }
        }
      }
    },
    [selectSuggestion, selectedSuggestion, suggestions, suggestionsActive, suggestionsLength],
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

  let nextedIndex = -1;

  return (
    <div className={className}>
      {label ? <label htmlFor={name}>{label}</label> : null}

      <div className="container">
        {leftComponent ? <div className="left-component">{leftComponent}</div> : null}

        <input
          ref={inputRef}
          name={name}
          value={
            // eslint-disable-next-line no-nested-ternary
            !isActive && format
              ? format(value)
              : // eslint-disable-next-line no-nested-ternary
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
          {suggestions?.map((suggestion, index) =>
            typeof suggestion === 'object' && 'namespace' in suggestion ? (
              <div className="namespace">
                <span className="label">{suggestion.namespace}</span>
                <div className="suggestions">
                  {suggestion.suggestions?.map((_suggestion) => {
                    nextedIndex += 1;
                    return (
                      <button
                        type="button"
                        key={
                          suggestionsKeyExtractor
                            ? suggestionsKeyExtractor(_suggestion)
                            : nextedIndex
                        }
                        className={`suggestion${
                          selectedSuggestion === nextedIndex ? ' selected' : ''
                        }`}
                        onClick={() => selectSuggestion(_suggestion)}>
                        {SuggestionItem ? (
                          <SuggestionItem suggestion={_suggestion} />
                        ) : (
                          <DefaultSuggestion<V, S> suggestion={_suggestion} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <button
                type="button"
                key={suggestionsKeyExtractor ? suggestionsKeyExtractor(suggestion) : index}
                className={`suggestion${selectedSuggestion === index ? ' selected' : ''}`}
                onClick={() => selectSuggestion(suggestion)}>
                {SuggestionItem ? (
                  <SuggestionItem suggestion={suggestion} />
                ) : (
                  <DefaultSuggestion<V, S> suggestion={suggestion} />
                )}
              </button>
            ),
          )}
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
