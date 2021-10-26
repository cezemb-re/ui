import { ReactElement } from 'react';
import { Img } from '@cezembre/fronts';

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
          <Img src={image} width="100%" aspectRatio="square" alt={name} />
        ) : (
          name?.substr(0, 1)
        )}
      </span>

      {badgeName || badgeImage ? (
        <span className="badge">
          {badgeImage ? (
            <Img src={badgeImage} width="100%" aspectRatio="square" alt={badgeName} />
          ) : (
            badgeName?.substr(0, 1)
          )}
        </span>
      ) : null}
    </div>
  );
}
