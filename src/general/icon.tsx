import { ReactElement } from 'react';
import IconProps from '../icons/props';
import Alert from '../icons/alert';
import AppleStore from '../icons/appleStore';
import Arrow from '../icons/arrow';
import Bin from '../icons/bin';
import Bouquet from '../icons/bouquet';
import Calendar from '../icons/calendar';
import Camera from '../icons/camera';
import Cart from '../icons/cart';
import Check from '../icons/check';
import Chevron from '../icons/chevron';
import Cross from '../icons/cross';
import Dashboard from '../icons/dashboard';
import Delivery from '../icons/delivery';
import Download from '../icons/download';
import Edit from '../icons/edit';
import Info from '../icons/info';
import Marker from '../icons/marker';
import Mastercard from '../icons/mastercard';
import Message from '../icons/message';
import Minus from '../icons/minus';
import Phone from '../icons/phone';
import Plus from '../icons/plus';
import Refresh from '../icons/refresh';
import Search from '../icons/search';
import Shop from '../icons/shop';
import Sides from '../icons/sides';
import Time from '../icons/time';
import User from '../icons/user';
import Visa from '../icons/visa';

export type IconName =
  | 'alert'
  | 'apple_store'
  | 'arrow'
  | 'bin'
  | 'bouquet'
  | 'calendar'
  | 'camera'
  | 'cart'
  | 'check'
  | 'chevron'
  | 'cross'
  | 'dashboard'
  | 'delivery'
  | 'download'
  | 'edit'
  | 'info'
  | 'marker'
  | 'mastercard'
  | 'message'
  | 'minus'
  | 'phone'
  | 'plus'
  | 'refresh'
  | 'search'
  | 'shop'
  | 'sides'
  | 'time'
  | 'user'
  | 'visa';

export interface Props extends IconProps {
  name?: IconName;
}

export default function Icon({
  name = 'alert',
  size = 15,
  color,
}: Props): ReactElement<SVGElement> {
  switch (name) {
    default:
    case 'alert':
      return <Alert size={size} color={color} />;
    case 'apple_store':
      return <AppleStore size={size} color={color} />;
    case 'arrow':
      return <Arrow size={size} color={color} />;
    case 'bin':
      return <Bin size={size} color={color} />;
    case 'bouquet':
      return <Bouquet size={size} color={color} />;
    case 'calendar':
      return <Calendar size={size} color={color} />;
    case 'camera':
      return <Camera size={size} color={color} />;
    case 'cart':
      return <Cart size={size} color={color} />;
    case 'check':
      return <Check size={size} color={color} />;
    case 'chevron':
      return <Chevron size={size} color={color} />;
    case 'cross':
      return <Cross size={size} color={color} />;
    case 'dashboard':
      return <Dashboard size={size} color={color} />;
    case 'delivery':
      return <Delivery size={size} color={color} />;
    case 'download':
      return <Download size={size} color={color} />;
    case 'edit':
      return <Edit size={size} color={color} />;
    case 'info':
      return <Info size={size} color={color} />;
    case 'marker':
      return <Marker size={size} color={color} />;
    case 'mastercard':
      return <Mastercard size={size} color={color} />;
    case 'message':
      return <Message size={size} color={color} />;
    case 'minus':
      return <Minus size={size} color={color} />;
    case 'phone':
      return <Phone size={size} color={color} />;
    case 'plus':
      return <Plus size={size} color={color} />;
    case 'refresh':
      return <Refresh size={size} color={color} />;
    case 'search':
      return <Search size={size} color={color} />;
    case 'shop':
      return <Shop size={size} color={color} />;
    case 'sides':
      return <Sides size={size} color={color} />;
    case 'time':
      return <Time size={size} color={color} />;
    case 'user':
      return <User size={size} color={color} />;
    case 'visa':
      return <Visa size={size} color={color} />;
  }
}
