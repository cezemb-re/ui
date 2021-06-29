import { ReactElement } from 'react';
import Image from './image';

export interface Props {
  size?: 'tiny' | 'small' | 'medium' | 'large';
  type?: 'project' | 'profile';
  name?: string;
  image?: string;
  badgeName?: string;
  badgeImage?: string;
}

export default function Avatar({
  size = 'medium',
  type = 'profile',
  name,
  image,
  badgeName,
  badgeImage,
}: Props): ReactElement {
  return (
    <div className={`cezembre-ui-avatar ${size} ${type}`}>
      <span className="main">
        {image && image.length ? (
          <Image src={image} width="100%" height="100%" alt={name} />
        ) : (
          name?.substr(0, 1)
        )}
      </span>

      {badgeName || badgeImage ? (
        <span className="badge">
          {badgeImage ? (
            <Image
              src={badgeImage}
              width="100%"
              height="100%"
              alt={badgeName}
            />
          ) : (
            badgeName?.substr(0, 1)
          )}
        </span>
      ) : null}
    </div>
  );
}
