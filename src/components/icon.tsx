import React, { ReactElement } from 'react';
import {
  Dashboard,
  Alert,
  AppleStore,
  Arrow,
  Bouquet,
  Delivery,
  Marker,
  Mastercard,
  Plus,
  Search,
  Shop,
  Time,
  User,
  Visa,
  Download,
  Cart,
  Check,
  Chevron,
  Camera,
  Sides,
  Bin,
  Edit,
  Refresh,
  Phone,
  Info,
  Message,
  Calendar,
} from '../icons';

export enum IconName {
  DASHBOARD = 'dashboard',
  ALERT = 'alert',
  APPLE_STORE = 'apple-store',
  ARROW = 'arrow',
  BOUQUET = 'bouquet',
  DELIVERY = 'delivery',
  MARKER = 'marker',
  MASTERCARD = 'mastercard',
  PLUS = 'plus',
  SEARCH = 'search',
  SHOP = 'shop',
  TIME = 'time',
  USER = 'user',
  VISA = 'visa',
  DOWNLOAD = 'download',
  CART = 'cart',
  CHECK = 'check',
  CHEVRON = 'chevron',
  CAMERA = 'camera',
  SIDES = 'sides',
  BIN = 'bin',
  EDIT = 'edit',
  REFRESH = 'refresh',
  PHONE = 'phone',
  INFO = 'info',
  MESSAGE = 'message',
  CALENDAR = 'calendar',
}

export interface Props {
  name?: IconName;
  size?: number;
  color?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  color5?: string;
  rotate?: number;
}

export default function Icon({
  name = IconName.ALERT,
  size = 20,
  color = undefined,
  color2 = undefined,
  color3 = undefined,
  rotate = 0,
}: Props): ReactElement<SVGElement> {
  let Svg: ReactElement<SVGElement> | null;

  switch (name) {
    case IconName.DASHBOARD:
      Svg = <Dashboard size={size} color={color} />;
      break;
    case IconName.ALERT:
      Svg = <Alert size={size} color={color} />;
      break;
    case IconName.APPLE_STORE:
      Svg = (
        <AppleStore size={size} color={color} color2={color2} color3={color3} />
      );
      break;
    case IconName.ARROW:
      Svg = <Arrow size={size} color={color} />;
      break;
    case IconName.BOUQUET:
      Svg = <Bouquet size={size} color={color} />;
      break;
    case IconName.DELIVERY:
      Svg = <Delivery size={size} color={color} />;
      break;
    case IconName.MARKER:
      Svg = <Marker size={size} color={color} />;
      break;
    case IconName.MASTERCARD:
      Svg = <Mastercard size={size} color={color} color2={color2} />;
      break;
    case IconName.PLUS:
      Svg = <Plus size={size} color={color} />;
      break;
    case IconName.SEARCH:
      Svg = <Search size={size} color={color} />;
      break;
    case IconName.SHOP:
      Svg = <Shop size={size} color={color} />;
      break;
    case IconName.TIME:
      Svg = <Time size={size} color={color} />;
      break;
    case IconName.USER:
      Svg = <User size={size} color={color} />;
      break;
    case IconName.VISA:
      Svg = <Visa size={size} color={color} color2={color2} />;
      break;
    case IconName.DOWNLOAD:
      Svg = <Download size={size} color={color} />;
      break;
    case IconName.CART:
      Svg = <Cart size={size} color={color} />;
      break;
    case IconName.PHONE:
      Svg = <Phone size={size} color={color} />;
      break;
    case IconName.INFO:
      Svg = <Info size={size} color={color} />;
      break;
    case IconName.CHECK:
      Svg = <Check size={size} color={color} />;
      break;
    case IconName.CHEVRON:
      Svg = <Chevron size={size} color={color} />;
      break;
    case IconName.CAMERA:
      Svg = <Camera size={size} color={color} />;
      break;
    case IconName.SIDES:
      Svg = <Sides size={size} color={color} />;
      break;
    case IconName.BIN:
      Svg = <Bin size={size} color={color} />;
      break;
    case IconName.EDIT:
      Svg = <Edit size={size} color={color} />;
      break;
    case IconName.REFRESH:
      Svg = <Refresh size={size} color={color} />;
      break;
    case IconName.MESSAGE:
      Svg = <Message size={size} color={color} />;
      break;
    case IconName.CALENDAR:
      Svg = <Calendar size={size} color={color} />;
      break;
    default:
      Svg = null;
      break;
  }

  return (
    <i
      className={`cezembre-ui-icon ${name}`}
      style={{
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {Svg}
    </i>
  );
}
