import './index.scss';
import Icon, { IconName } from './general/icon';
import Loader from './general/loader';
import Check from './general/check';
import Button from './general/button';
import Avatar from './general/avatar';
import Overlay from './general/overlay';
import { ModalsContext, useModals, Modal, ModalComponentProps, ModalsState } from './general/modal';
import SelectionModal from './modals/selection';
import CheckBox from './fields/checkbox';
import DatePicker from './fields/datePicker';
import TimePicker from './fields/timePicker';
import DateTimePicker from './fields/dateTimePicker';
import Input from './fields/input';
import Select from './fields/select';
import Switch from './fields/switch';
import Textarea from './fields/textarea';
import Wysiwyg from './fields/wysiwyg';
import Place from './fields/place';
import Model from './data/model';
import Table, { Column, Selection, ItemAction } from './data/table';
import Cell, { Type as CellType } from './data/cell';
import UploadImage from './uploads/image';

/**
 * Genral
 */
export { Icon, Loader, Check, Button, Avatar, ModalsContext, useModals, Overlay };

export type { IconName, Modal, ModalComponentProps, ModalsState };

/**
 * Modals
 */
export { SelectionModal };

/**
 * Fields
 */
export {
  CheckBox,
  DateTimePicker,
  DatePicker,
  TimePicker,
  Switch,
  Input,
  Textarea,
  Select,
  Wysiwyg,
  Place,
};

/**
 * Data
 */
export { Table, Cell };

export type { Column, Model, Selection, ItemAction, CellType };

/**
 * Upload
 */
export { UploadImage };
