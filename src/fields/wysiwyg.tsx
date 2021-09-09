import { useState, useEffect, useRef, useCallback, ReactElement, KeyboardEvent } from 'react';
import {
  Editor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
  RichUtils,
  RawDraftContentState,
  DraftBlockType,
  DraftInlineStyleType,
  getDefaultKeyBinding,
  DraftHandleValue,
} from 'draft-js';
import _ from 'lodash';
import { FieldComponentProps } from '@cezembre/forms';
import SelectionModal from '../modals/selection';

export enum Type {
  FIELD = 'field',
  PARAGRAPH = 'paragraph',
}

export type BlockType = 'custom' | DraftBlockType;

export type InlineStyle = 'CUSTOM' | DraftInlineStyleType;

export interface Props extends FieldComponentProps<RawDraftContentState | string> {
  label?: string;
  placeholder?: string;
  type?: Type;
  debounce?: number;
  onDelete?: () => void;
}

export default function Wysiwyg({
  name,
  initialValue,
  onFocus,
  onChange,
  onBlur,
  isActive,
  warning,
  error,
  label,
  onDelete,
  placeholder = 'Votre texte ici ...',
  type = Type.FIELD,
  debounce = 1000,
}: Props): ReactElement {
  const key = useRef<string>(Math.random().toString(36).substr(2, 10));
  const editor = useRef<Editor | null>(null);

  const getInitialEditorState = useCallback((): EditorState => {
    if (!initialValue) {
      return EditorState.createEmpty();
    }

    let contentState: ContentState;
    if (typeof initialValue === 'string') {
      contentState = ContentState.createFromText(initialValue);
    } else {
      contentState = convertFromRaw(initialValue);
    }

    return EditorState.createWithContent(contentState);
  }, [initialValue]);

  const [editorState, setEditorState] = useState<EditorState>(getInitialEditorState());

  const dispatchChange = useCallback(
    (state: EditorState) => {
      onChange(convertToRaw(state.getCurrentContent()));
    },
    [onChange],
  );

  const debouncedDispatchChange = useRef(_.debounce(dispatchChange, debounce));

  const changeEditorState = useCallback(
    (state: EditorState) => {
      setEditorState(state);
      if (editorState.getCurrentContent() !== state.getCurrentContent()) {
        debouncedDispatchChange.current(state);
      }
    },
    [editorState],
  );

  const [bold, setBold] = useState<boolean>(false);
  const [italic, setItalic] = useState<boolean>(false);
  const [underline, setUnderline] = useState<boolean>(false);

  useEffect(() => {
    // Inline styles
    const inlineStyle = editorState.getCurrentInlineStyle();
    setBold(inlineStyle.has('BOLD'));
    setItalic(inlineStyle.has('ITALIC'));
    setUnderline(inlineStyle.has('UNDERLINE'));
  }, [editorState]);

  const toggleInlineStyle = useCallback(
    (event, inlineStyle: InlineStyle) => {
      event.preventDefault();
      changeEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    },
    [changeEditorState, editorState],
  );

  const [currentBlockType, setCurrentBlockType] = useState<BlockType>('unstyled');

  useEffect(() => {
    // Inline styles
    setCurrentBlockType(RichUtils.getCurrentBlockType(editorState));
  }, [editorState]);

  const switchBlockType = useCallback(
    (event, blockType: BlockType) => {
      event.preventDefault();
      changeEditorState(RichUtils.toggleBlockType(editorState, blockType));
    },
    [changeEditorState, editorState],
  );

  const [classNames, setClassNames] = useState<string[]>(['cezembre-ui-fields-wysiwyg', type]);

  useEffect(() => {
    const nextClassNames = ['cezembre-ui-fields-wysiwyg', type];

    if (isActive) {
      nextClassNames.push('active');
    }

    setClassNames(nextClassNames);
  }, [isActive, type]);

  const focus = useCallback(
    (e) => {
      e.preventDefault();
      if (!isActive) {
        editor.current?.focus();
      }
    },
    [isActive],
  );

  const filterSelection = useCallback((anchor: Node): boolean => {
    let node: Node | null = anchor;
    do {
      if (
        'getAttribute' in node &&
        (node as Element).getAttribute &&
        (node as Element).getAttribute('class')?.substr(0, 26) === 'cezembre-ui-fields-wysiwyg' &&
        (node as Element).getAttribute('data-key') === key.current
      ) {
        return true;
      }
      node = node.parentNode;
    } while (node != null);
    return false;
  }, []);

  const keyBindingFn = useCallback(
    (event: KeyboardEvent): string | null => {
      if (event.nativeEvent.code === 'Backspace' && !editorState.getCurrentContent().hasText()) {
        return 'delete';
      }
      return getDefaultKeyBinding(event);
    },
    [editorState],
  );

  const handleKeyCommand = useCallback(
    (command: string): DraftHandleValue => {
      if (command === 'delete' && onDelete) {
        onDelete();
        return 'handled';
      }
      return 'not-handled';
    },
    [onDelete],
  );

  return (
    <div className={classNames.join(' ')} data-key={key.current}>
      {label ? <label htmlFor={name}>{label}</label> : null}

      <div
        className={`container${isActive ? ' active' : ''}`}
        onClick={focus}
        role="button"
        tabIndex={0}
        onKeyUp={() => undefined}>
        <Editor
          editorKey={name}
          ref={editor}
          editorState={editorState}
          onChange={changeEditorState}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          keyBindingFn={keyBindingFn}
          handleKeyCommand={handleKeyCommand}
        />

        <SelectionModal filter={filterSelection}>
          <div className="contextual-menu">
            <div className="sections">
              <div className="section">
                <button
                  type="button"
                  className={`bold${bold ? ' active' : ''}`}
                  onClick={(event) => toggleInlineStyle(event, 'BOLD')}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseUp={(e) => e.preventDefault()}>
                  G
                </button>

                <button
                  type="button"
                  className={`italic${italic ? ' active' : ''}`}
                  onClick={(event) => toggleInlineStyle(event, 'ITALIC')}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseUp={(e) => e.preventDefault()}>
                  I
                </button>

                <button
                  type="button"
                  className={`underline${underline ? ' active' : ''}`}
                  onClick={(event) => toggleInlineStyle(event, 'UNDERLINE')}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseUp={(e) => e.preventDefault()}>
                  S
                </button>
              </div>

              <div className="section">
                <button
                  type="button"
                  className={`header-one${currentBlockType === 'header-one' ? ' active' : ''}`}
                  onClick={(event) => switchBlockType(event, 'header-one')}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseUp={(e) => e.preventDefault()}>
                  T
                </button>

                <button
                  type="button"
                  className={`header-two${currentBlockType === 'header-two' ? ' active' : ''}`}
                  onClick={(event) => switchBlockType(event, 'header-two')}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseUp={(e) => e.preventDefault()}>
                  T
                </button>

                <button
                  type="button"
                  className={`blockquote${currentBlockType === 'blockquote' ? ' active' : ''}`}
                  onClick={(event) => switchBlockType(event, 'blockquote')}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseUp={(e) => e.preventDefault()}>
                  &quot;
                </button>
              </div>
            </div>
          </div>
        </SelectionModal>
      </div>

      {error ? <p className="error">{error}</p> : null}

      {warning ? <p className="warning">{warning}</p> : null}
    </div>
  );
}
